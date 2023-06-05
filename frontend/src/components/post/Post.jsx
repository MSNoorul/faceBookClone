import React, { useEffect, useState } from "react";
import "./post.scss";
import { IconButton } from "@mui/material";
import {
  ChatBubbleOutline,
  MoreVert,
  Favorite,
  ThumbDown,
  ThumbUpAltOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useUsercontext } from "../../context/userContext";

const Post = ({ post }) => {
  const [user , setUser] = useState({});
  const [like,setlike] =useState(post.likes.length|| 0);
  const {currentUser} = useUsercontext();

  useEffect(() => {
    fetch(`http://localhost:3000/user/${post.userId}`)
      .then((res) => {
        if (res.status == 200) return res.json();
        else throw new Error(res);
      })
      .then((data) => setUser(data))
      .catch((e) => console.log(e));
  }, [post]);

 const handleLikes = (name)=>{
    fetch(`http://localhost:3000/post/${name}/${post._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id:currentUser._id}),
    })
      .then((response) =>{
        if(response.status == 200) return response.json()
        else throw new Error(response)
      })
      .then((result) => {
        console.log(result)
        if(result.modifiedCount >0 && name =="like")
        {setlike((n)=>n+1)}
        else if(result.modifiedCount >0 && name =="dislike")
        {setlike((n)=>{
          if(n-1<0) return 0
          else return n-1
        })}
        else console.log(result)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  
  

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to="/profile/userId">
              <img
                src={user.profilePicture}
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{post.updatedAt}</span>
          </div>
          <div className="postTopRight">
            <IconButton>
              <MoreVert className="postVertButton" />
            </IconButton>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.dec}</span>
          <img src={post.img} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft" >
            <Favorite  className="bottomLeftIcon" style={{ color: "red" }}  
            onClick={()=>{handleLikes("like")}}/>
            <ThumbDown className="bottomLeftIcon" style={{ color: "#011631" }} 
            onClick={()=>{handleLikes("dislike")}}/>
            <span className="postLikeCounter">{like}</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">
              {post.comment} · comments · share
            </span>
          </div>
        </div>

        <hr className="footerHr" />
        <div className="postBottomFooter">
          <div className="postBottomFooterItem">
            <ThumbUpAltOutlined className="footerIcon" />
            <span className="footerText">Like</span>
          </div>
          <div className="postBottomFooterItem">
            <ChatBubbleOutline className="footerIcon" />
            <span className="footerText">Comment</span>
          </div>
          <div className="postBottomFooterItem">
            <ShareOutlined className="footerIcon" />
            <span className="footerText">Share</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
