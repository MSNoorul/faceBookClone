import React, { useEffect, useState } from "react";
import "./online.scss";

const Online = ({userId}) => {
  const [user , setUser] = useState({});

  useEffect(() => {
    
    fetch(`http://localhost:3000/user/${userId}`)
      .then((res) => {
        if (res.status == 200) return res.json();
        else throw new Error(res);
      })
      .then((data) => setUser(data))
      .catch((e) => console.log(e));
  }, [user]);
  return (
    <div className="online">
      <li className="rightbarFriend">
        <div className="rightbarProfileImgContainer">
          <img
            src={user.profilePicture}
            alt=""
            className="rightbarProfileImg"
          />
          <span className="rightbarOnline"></span>
        </div>
        <span className="rightbarUsername">{user.username}</span>
      </li>
    </div>
  );
};

export default Online;
