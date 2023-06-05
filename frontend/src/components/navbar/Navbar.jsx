import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { useUsercontext } from "../../context/userContext";
import { SearchResultsList } from "../search/SearchResultsList";
const Navbar = () => {
  const { currentUser } = useUsercontext();
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [data, setdata] = useState([]);
 

  const handleSearch = () => {
    fetch(`http://localhost:3000/user/search/${query}`)
      .then((res) => {
        if (res.status == 200) return res.json();
        else throw new Error(res);
      })
      .then((data) => {
        setSearch(true);
        setdata(data);
      })
      .catch((e) => console.log(JSON.stringify(e)));
  };

  return (
    <div className="navbarContainer">
      <div className="navbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">FaceBook</span>
        </Link>
      </div>
      <div className="navbarCenter">
        <div className="searchBar">
          <SearchIcon className="searchIcon" />
          <input
            type="text"
            placeholder="Search for friends post or video"
            className="searchInput"
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value =='') setSearch(false);   
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }}}
          />
          {search && <SearchResultsList result={data} />}
        </div>
      </div>
      <div className="navbarRight">
        <div className="navbarLinks">
          <Link to='/Home'  ><span className="navbarLink">Homepage</span></Link>    
          <span className="navbarLink">Timeline</span>
        </div>
        <div className="navbarIcons">
          <div className="navbarIconItem">
            <PersonIcon />
            <span className="navbarIconBadge">2</span>
          </div>
          <div className="navbarIconItem">
            <ChatBubbleIcon />
            <span className="navbarIconBadge">10</span>
          </div>
          <div className="navbarIconItem">
            <NotificationsIcon />
            <span className="navbarIconBadge">8</span>
          </div>
        </div>
        <Link to="/profile/userId">
          <img
            src={currentUser.profilePicture || "/assets/DefaultProfile.jpg"}
            alt=""
            className="navbarImg"
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
