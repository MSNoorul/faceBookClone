import { DriveFolderUploadOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./editProfile.scss";
import { useUsercontext } from "../../context/userContext";

const EditProfile = () => {
  const { currentUser} = useUsercontext();

  const [userData, setData] = useState({});
  
  const convertImg = (img) => {

    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(img);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    const url = "http://localhost:3000/user/update/" + currentUser._id;
    
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if(res.status == 200) return res.json();
        else return new Error(res)
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };
  const handleFilecreat = (e ,name) => {
    const img = e.target.files[0];
    convertImg(img)
    .then((base64img) => {
      const data = {};
      data[name] =base64img
      setData((pre)=>{return {...pre,...data}});
    });
  };

  return (
    <div className="editProfile">
      <Navbar />
      <div className="editProfileWrapper">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <label htmlFor="coverPicture">
              <img
                src={userData.coverPicture||currentUser.coverPicture || "/assets/profilecover.jpg"}
                alt=""
                className="profileCoverImg"
              />
              <input type="file"
               name="coverPicture" 
               id="coverPicture" 
               style={{ display: "none" }}
               onChange={(e)=>{handleFilecreat(e,'coverPicture');}}/>
              </label>
              <label htmlFor="profilePicture">
              <img
                src={currentUser.profilePicture||userData.profilePicture || "/assets/DefaultProfile.jpg"}
                alt=""
                className="profileUserImg"
              />
              <input type="file"
               name="profilePicture" 
               id="profilePicture" 
               style={{ display: "none" }}
               onChange={(e)=>{handleFilecreat(e,'profilePicture');}}/>
              </label>
              
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{currentUser.username}</h4>
              <span className="profileInfoDesc">Hi Friends!</span>
            </div>
          </div>
          <div className="editprofileRightBottom">
            <div className="top">
              <h1>Edit User Profile</h1>
            </div>
            <div className="bottom">

              <div className="left">
                <img src={userData.profilePicture || "/assets/DefaultProfile.jpg"} alt="" />
              </div>

              <div className="right">

                <form   onSubmit={handleFileUpload}>
                  <div className="formInput">
                    <label htmlFor="file">
                      Image: <DriveFolderUploadOutlined className="icon" />
                    </label>
                    <input 
                    type="file"
                     id="file"
                     accept=".png ,.jpg,.jpeg"
                      style={{ display: "none" }} 
                      onChange={(e) => handleFilecreat(e,"profilePicture")}/>
                  </div>
                
                  <div className="formInput">
                    <label>Username</label>
                    <input type="text" placeholder="jane_doe" 
                    onChange={(e) => {setData((pre)=>{return {...pre,username:e.target.value}})}}/>
                  </div>
                  <div className="formInput">
                    <label>Email</label>
                    <input type="email" placeholder="jane_doe@gmail.com"
                    onChange={(e) => {setData((pre)=>{return {...pre,email:e.target.value}})}} />
                  </div>
                  <div className="formInput">
                    <label>Phone</label>
                    <input type="text" placeholder="+4 123 456 789" 
                    onChange={(e) => {setData((pre)=>{return {...pre,phone:e.target.value}})}}/>
                  </div>
                  <div className="formInput">
                    <label>city</label>
                    <input
                      type="text"
                      placeholder="Melwood str. 71 Liverpool"
                      onChange={(e) => {setData((pre)=>{return {...pre,city:e.target.value}})}}
                    />
                  </div>
                  <div className="formInput">
                    <label>Status</label>
                    <input
                      type="text"             
                      pattern="^(Married|single)$"
                      placeholder="married or single"
                      onChange={(e) => {setData((pre)=>{return {...pre,Status:e.target.value}})}}
                    />
                  </div>
                  <button type="submit" className="updateButton">
                    Update Profile
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
