import { useState } from "react";
import "./SearchResultsList.css";
import { useUsercontext } from "../../context/userContext";

export const SearchResultsList = ({result}) => {
  const {currentUser} =useUsercontext();

  const handleFollow = (e,id)=>{
    if(e.target.innerText == 'Follow'){
    fetch(`http://localhost:3000/user/follow/${id}`, {
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
          if(result.modifiedCount >0)
          {console.log('followed')}
          else console.log(result)
        })
        .catch((error) => {
          console.error("Error:", error);
        });
     
    }
    else{
      fetch(`http://localhost:3000/user/unfollow/${id}`, {
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
          if(result.modifiedCount >0)
          {console.log('unfollowed')}
          else console.log(result)
        })
        .catch((error) => {
          console.error( error);
        });
    
    }

  }

  return (
    <div className="results-list">
      {result.map((p) => {
        return ( 
        <div className="search-result" key={p._id}>
          <div className="search-item">
            <img src={p.profilePicture || "/assets/DefaultProfile.jpg"} alt="" />
            <div className="search-text">
            <p className="username">{p.username}</p>
            <p className="city">{p.city}</p>
            </div>
            
          </div>
          <button className="followbtn"
          onClick={(e)=>{handleFollow(e,p._id)}}
          >{currentUser.following.includes(p._id)?'UnFollow':'Follow'}</button>
        </div>);
      })}
    </div>
  );
};
