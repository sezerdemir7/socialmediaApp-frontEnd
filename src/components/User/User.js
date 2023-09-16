import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import { makeStyles } from "@mui/styles";
import { GetWithAuth } from "../../services/HttpService";
import Post from "../Post/Post";
import UserActivity from "../UserActivity/UserActivity";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    
  },
  avatarAndPosts: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    margin: "10px",
  },
  postStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "50%",
    maxWidth: 800,
    minWidth: 350,
    margin: "auto",
    marginBottom: 20,
    marginTop: 20,
    textAlign: "left",
  },
  activityButton: {
    cursor: "pointer",
    color: "blue",
    textDecoration: "underline",
  },
});

function User() {
  const { userId } = useParams();
  const classes = useStyles();
  const [user, setUser] = useState();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(10);
  const [isUserActivityOpen, setUserActivityOpen] = useState(false);

  const toggleUserActivity = () => {
    setUserActivityOpen(!isUserActivityOpen);
  };

  const getUser = () => {
    GetWithAuth("/users/" + userId)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setUser(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    GetWithAuth("/posts/user/" + userId)
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

  return (
    <div className={classes.root}>
      <div className={classes.avatarAndPosts}>
        {user ? (
          <Avatar avatarId={user.avatarId} userId={userId} userName={user.userName} />
        ) : (
          ""
        )}
        <div className={classes.avatarAndPosts}>
        {localStorage.getItem("currentUser") == userId ? (
          <button style={{}} type="button" className="btn btn-danger"
         
          onClick={toggleUserActivity}
        >
          {isUserActivityOpen ? " Kapat" : " Haraketler"}
        </button>
        
        ) : (
          ""
        )}
        </div>

        {isUserActivityOpen && <UserActivity userId={userId} />}
        
        <div className={classes.postStyle}>
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
        </div>
      </div>
    </div>
  );
}

export default User;
