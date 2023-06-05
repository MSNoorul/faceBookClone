import {
  Close,
  EmojiEmotions,
  PermMedia,
  VideoCameraFront,
} from "@mui/icons-material";
import React, { useState } from "react";
import "./share.scss";
import { useUsercontext } from "../../context/userContext";

const Share = ({render}) => {

  const [file, setFile] = useState("");
  const [dec, setdec] = useState("");
  const {currentUser} = useUsercontext();

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
    const url = "http://localhost:3000/post/create";
    const data = {
      userId:currentUser._id,
      dec: dec,
      img: file,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) =>{
        if(response.status == 200) return response.json()
        else throw new Error(response)
      })
      .then((result) => {
        console.log(result);
        render();
        setFile("");
        setdec("");
      })
      .catch((e) => {
        console.log(JSON.stringify(e));
      });
  };
  const handleFilecreat = (e) => {
    const file = e.target.files[0];
    convertImg(file).then((data) => {
      setFile(data);
    });
  };

  const removeImage = () => {
    setFile("");
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <form onSubmit={handleFileUpload}>
          <div className="shareTop">
            <img
              src={currentUser.profilePicture || "/assets/DefaultProfile.jpg"}
              alt=""
              className="shareProfileImg"
            />
            <input
              type="text"
              name="dec"
              placeholder="What's on your mind Amber ?"
              className="shareInput"
              onChange={(e) => setdec(e.target.value)}
            />
          </div>

          <hr className="shareHr" />
          {file && (
            <div className="shareImgContainer">
              <img src={file} alt="" className="shareImg" />
              <Close className="shareCancelImg" onClick={removeImage} />
            </div>
          )}

          <div className="shareBottom">
            <div className="shareOptions">
              <div className="shareOption">
                <VideoCameraFront
                  className="shareIcon"
                  style={{ color: "#bb0000f2" }}
                />
                <span className="shareOptionText">Short</span>
              </div>
              <label htmlFor="file" className="shareOption">
                <PermMedia
                  className="shareIcon"
                  style={{ color: "#2e0196f1" }}
                />
                <span className="shareOptionText">Photo</span>
                <input
                  type="file"
                  id="file"
                  accept=".png,.jpeg,.jpg"
                  style={{ display: "none" }}
                  onChange={handleFilecreat}
                />
              </label>
              <div className="shareOption">
                <EmojiEmotions
                  className="shareIcon"
                  style={{ color: "#bfc600ec" }}
                />
                <span className="shareOptionText">Feelings</span>
              </div>
              <button type="submit"
              className="shareButton">Share</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Share;
