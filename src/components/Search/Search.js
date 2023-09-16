import React, { useState } from "react";
import { GetWithAuth } from "../../services/HttpService";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: "none",
        boxShadow: "none",
        color: "white",
    }
}))

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(false);
  
  const clases = useStyles();

  const handleSearch = (e) => {
    e.preventDefault();

    GetWithAuth("/search/user/" + searchTerm)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Arama sırasında bir hata oluştu.");
        }
        return response.json();
      })
      .then((result) => {
        
        setSearchResults(result);
        setError(null);
      })
      .catch((error) => {
        console.error("Hata:", error.message);
        setSearchResults([]);
        setError(error.message);
      });
  };

  const handleShowMore = () => {
    setShowMore(true);
  };

  return (
    <div>
      <form className="d-flex" style={{ margin: "20px auto", maxWidth: "500px" }} onSubmit={handleSearch}>
        <input
          className="form-control me-2"
          style={{ borderColor: "black", borderWidth: "3px" }}
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-outline-primary" type="submit">
          Search
        </button>
      </form>

      {error && <div className="alert alert-danger">{error}</div>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "10px" }}>
        {searchResults.slice(0, showMore ? searchResults.length : 4).map((user) => (
          <Card key={user.id} sx={{ maxWidth: 200, margin: "10px" }}>
            <CardHeader
              avatar={
                <Link className={clases.link} to={{ pathname: '/users/' + user.id }}>
                <Avatar sx={{ background:'linear-gradient(45deg,#2196f3 30%,#21CBF3 90%)' }} aria-label="recipe">
                  {user.userName.charAt(0).toUpperCase()}
                </Avatar>
                </Link>
              }
              title={user.userName.toUpperCase()}
            />
            <CardMedia
              component="img"
              height="194"
              image={`/avatars/avatar${user.avatarId}.png`}
              alt="avatar"
            />
          </Card>
        ))}
      </div>
      {!showMore && searchResults.length > 4 && (
        <button className="btn btn-primary" onClick={handleShowMore}>
          Daha Fazla Göster
        </button>
      )}
    </div>
  );
}

export default Search;
