
import { Link,useNavigate} from "react-router-dom";
import "./login.scss";
import { useState } from "react";
import { useUsercontext } from "../../context/userContext";

const Login = () => {
  const navigate = useNavigate();
  const [userData,setData] = useState({username:"noorul",password:"test123"});
  const {setCurrentUser}= useUsercontext();

  const handleLogin = (e)=>{

    e.preventDefault();
    const url = "http://localhost:3000/user/login";
    // server request
console.log(userData)
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    }).then((res) => {
        // if(res.status == 200){window.location.href = '/Home'}
        if(res.status == 200){
          // window.location.href = '/Home'
          return res.json();
        }else throw new Error(res)
        
      }).then((data) =>{
        setCurrentUser(data);
        navigate('/Home');
      })
      .catch((e) => console.log(JSON.stringify(e)));
  
  }
 
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" required 
             onChange={(e) => {
              setData((preState) => {
                return { ...preState, username: e.target.value };
              });
            }}/>
            <input type="password" placeholder="Password" required 
             onChange={(e) => {
              setData((preState) => {
                return { ...preState, password: e.target.value };
              });
            }}/>
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
