import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../css/App.css";
import axios from "axios";
import { setUserSession, getUser } from "../utils/common.js";

function Login() {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    let user = getUser();
    if (user != null) history.push("/" + user.role);
  }, []);

  const authenticateUser = () => {
    axios
      .post(
        "http://localhost:3251/user/login/auth",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.userJSON != null) {
          let userJson = response.data.userJSON;
          setUserSession(response.data.token, response.data.userJSON);
          console.log(userJson.role);
          history.push("/" + userJson.role);
        }
      })
      .catch((error) => {
        /*If (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");*/
        console.log(error);
      });
  };

  return (
    <div className="App">
      <div className="container">
        <div className="main sign-in">
          <div className="card">
            <div className="logo"></div>
            <div className="card-head">
              <h3 className="header">Accéder à votre interface</h3>
            </div>
            <div className="card-body">
              <form id="frmLogin">
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    aria-label="email"
                    className="form-control"
                    name="username"
                    id="txtUsername"
                    type="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Mot de passe</label>
                  <input
                    aria-label="Password"
                    className="form-control"
                    name="password"
                    id="txtPassword"
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <button
                    type="button"
                    className="btn"
                    id="btnSignIn"
                    onClick={() => {
                      authenticateUser();
                    }}
                  >
                    Connexion
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
