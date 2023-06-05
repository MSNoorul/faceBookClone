import { createContext,useContext, useState } from "react";

const AuthContext = createContext();

export const useUsercontext = ()=>{
  return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    "_id": "64774010e04c54475252e89c",
    "username": "noorul",
    "email": "noorul@gmail.com",
});

  return (
    <AuthContext.Provider value={{ currentUser,setCurrentUser}}>
      {children}
    </AuthContext.Provider>
  );
};