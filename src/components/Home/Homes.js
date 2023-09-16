import React, { useState, useEffect, useRef } from "react";
import Post from "../Post/Post";
import { Container, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PostForm from "../Post/PostForm";
import { GetWithAuth } from "../../services/HttpService";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f5ff",
    height: "%100",
    margin:"20px",
  },
  postStyle: {
    backgroundColor: "#f0f5ff",
  },
}));

function Homes() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);
  const classes = useStyles();
  const [postRefresh, setPostRefresh] = useState(false);
  const [visiblePosts, setVisiblePosts] = useState(10);

  // Ref oluşturun ve sayfa altına geldiğinde kullanın
  const bottomRef = useRef();

  const setPostsRefresh = () => {
    setPostRefresh(true);
  };

  const refreshPosts = () => {
    GetWithAuth("/posts")
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then(
        (result) => {
          setIsLoaded(true);
          if (Array.isArray(result)) {
            result.sort((a, b) => new Date(b.date) - new Date(a.date));
            setPostList(result);
          } else {
            throw Error("Received data is not an array");
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
    setPostRefresh(false);
  };

  const loadMorePosts = () => {
    setVisiblePosts(visiblePosts + 10);
  };

  // Sayfa altına geldiğinde daha fazla gönderi yükle
  const handleScroll = () => {
    if (
      bottomRef.current &&
      bottomRef.current.getBoundingClientRect().top <= window.innerHeight
    ) {
      loadMorePosts();
    }
  };

  useEffect(() => {
    refreshPosts();
  }, [postRefresh]);

  useEffect(() => {
    GetWithAuth("/posts")
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then(
        (result) => {
          setIsLoaded(true);
          if (Array.isArray(result)) {
            result.sort((a, b) => new Date(b.date) - new Date(a.date));
            setPostList(result);
          } else {
            throw Error("Received data is not an array");
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  // Kaydırma  dinleyiciyi 
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className={classes.postStyle}>
        <Container fixed className={classes.container}>
          {localStorage.getItem("currentUser") == null ? (
            ""
          ) : (
            <PostForm
              userId={localStorage.getItem("currentUser")}
              userName={localStorage.getItem("userName")}
              setPostRefresh={setPostsRefresh}
            ></PostForm>
          )}

          {postList.slice(0, visiblePosts).map((post, index) => (
            <Post
              key={index}
              likes={post.postLikes}
              postId={post.id}
              userId={post.userId}
              userName={post.userName}
              title={post.title}
              text={post.text}
              date={post.date}
            ></Post>
          ))}

          <div ref={bottomRef} style={{ height: "20px" }}></div>
        </Container>
      </div>
    );
  }
}

export default Homes; 