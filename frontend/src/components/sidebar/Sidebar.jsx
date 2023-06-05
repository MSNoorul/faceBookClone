import React, { useContext } from "react";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatIcon from "@mui/icons-material/Chat";
import VideocamIcon from "@mui/icons-material/Videocam";
import GroupsIcon from "@mui/icons-material/Groups";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import EventIcon from "@mui/icons-material/Event";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import "./sidebar.scss";
import MenuLink from "../menuLink/MenuLink";
import { DarkModeContext } from "./../../context/darkModeContext";
import { useUsercontext } from "../../context/userContext";
import Friends from "../friends/Friends";

const Sidebar = () => {
  const {currentUser} = useUsercontext();
  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <MenuLink Icon={<RssFeedIcon />} text="Feed" />
        <MenuLink Icon={<ChatIcon />} text="Chats" />
        <MenuLink Icon={<VideocamIcon />} text="Videos" />
        <MenuLink Icon={<GroupsIcon />} text="Friends" />
        <MenuLink Icon={<BookmarkIcon />} text="Bookmarks" />
        {/* <MenuLink Icon={<ShoppingCartIcon />} text="Marketplace" /> */}
        <MenuLink Icon={<EventIcon />} text="Events" />
        <span onClick={() => dispatch({ type: "TOGGLE" })}>
          <MenuLink Icon={<Brightness4Icon />} text="Theme" />
        </span>
        <MenuLink Icon={<ExitToAppOutlinedIcon />} text={`logout ( ${currentUser.username} )`}/>

        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />

        <h4 style={{
          fontSize: '18px',
          fontWeight: 900
        }}> Followers</h4>

        <ul className="sidebarFriendList">
          {currentUser.followers.map((u) => (
            <Friends key={u} userId={u} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
