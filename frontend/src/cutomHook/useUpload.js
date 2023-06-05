import { useState, useEffect } from 'react';

function useUpload(userId) {

  // const [user ,setUser] = useState({});
  // const [file, setFile] = useState("");

  // useEffect(()=>{
  //   fetch('http://localhost:3000/user/')
  //   .then((res)=>{
  //       if(res.status == 200) return res.json()
  //       else throw new Error(res)
  //   })
  //   .then((data)=>setUser(data))
  //   .catch((e)=>console.log(e))

  // },[])

  // const convertImg = (img) => {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(img);
  //     fileReader.onload = () => {
  //       resolve(fileReader.result);
  //     };
  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // };

  // const handleFileUpload = (e) => {

  //   e.preventDefault();
  //   const url = "http://localhost:3000/post/create/";
  //   const data = {
  //     img: file,
  //   };

  //   fetch(url, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => response.json())
  //     .then((result) => {
  //       setFile(result);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };
  // const handleFilecreat = (e) => {
  //   const file = e.target.files[0];
  //   convertImg(file).then((data) => {
  //     setFile(data);
  //   });
  // };

}
