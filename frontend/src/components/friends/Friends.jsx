import React, { useEffect, useState } from "react";
import "./friends.scss";
const Friends = ({ userId }) => {
  const [user , setUser] = useState({});
  useEffect(() => {
    fetch(`http://localhost:3000/user/${userId}`)
      .then((res) => {
        if (res.status == 200) return res.json();
        else throw new Error(res);
      })
      .then((data) => setUser(data))
      .catch((e) => console.log(e));
  }, []);
  return (
    <div>
      <li className="sidebarFriend">
        <img src={user.profilePicture} alt="" className="sidebarFriendImg" />
        <span className="sidebarFriendName">{user.username}</span>
      </li>
    </div>
  );
};

export default Friends;
