"use client";
import { useState, createContext } from "react";
const axios = require("axios").default;
axios.defaults.baseURL = "http://localhost:1337/api";

export const AuthContext = createContext();

const AuthProvider = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [err, setErr] = useState("");
  const [auth, setAuth] = useState({
    admin: false,
    jwt: "",
    email: "",
    username: "",
  });

  const LogInAsGuest = () => {
    setIsLogin(true);
    setErr("");
  };

  const LogIn = async ({ identifier, password }) => {
    console.log(identifier, password);
    try {
      const response = await axios.post("/auth/local", {
        identifier: identifier,
        password: password,
      });
      const updateAuth = async (res) => {
        await setAuth({
          admin: true,
          jwt: res.data.jwt,
          email: res.data.user.email,
          username: res.data.user.username,
        });
      };
      await updateAuth(response);
      setIsLogin(true);
      setErr("");
    } catch (e) {
      setErr("Invalid Credentials!");
    }
    // setIsLogin(true);
    // console.log("RESPO", response);
  };

  const LogOut = async () => {
    await setAuth({
      admin: false,
      jwt: "",
      email: "",
      username: "",
    });
    setIsLogin(false);
    setErr("");
  };

  const value = {
    auth,
    err,
    LogIn,
    LogInAsGuest,
    LogOut,
    isLogin,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;
