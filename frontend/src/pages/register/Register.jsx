import { Link } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import { useUsercontext } from "../../context/userContext";

const Register = () => {
  const [userData, setData] = useState({});

  const handleRegister = (e) => {
    e.preventDefault();
    const url = "http://localhost:3000/user/register";
    // server request

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if(res.status == 200){window.location.href = '/login'}
      })
     
  };
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Lama Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>

          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setData((preState) => {
                  return { ...preState, username: e.target.value };
                });
              }}
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setData((preState) => {
                  return { ...preState, email: e.target.value };
                });
              }}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setData((preState) => {
                  return { ...preState, password: e.target.value };
                });
              }}
            />
            <input type="text" placeholder="Repeat Password" />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
