import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import Stories from "../stories/Stories";
import "./feed.scss";
import { useUsercontext } from "../../context/userContext";

const Feed = () => {

  const [render,setRender] = useState(false);
  const [Posts, setPost] = useState([]);
  const {currentUser} = useUsercontext();
  const userId = currentUser._id;

  const RenderParent = () => {
    setRender(!render);
  }

  useEffect(() => {
    fetch(`http://localhost:3000/post/timeline/${userId}`)
      .then((res) => {
        if (res.status == 200) return res.json();
        else throw new Error(res);
      })
      .then((data) => {setPost(data);console.log(data)})
      .catch((e) => console.log(JSON.stringify(e)));
  }, [render]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Stories />
        <Share render = {RenderParent}/>
        {Posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
