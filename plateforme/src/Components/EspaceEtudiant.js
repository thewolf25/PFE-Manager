import axios from "axios";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../css/App.css";
//Import axios from 'axios';
import { getUser, removeUserSession } from "../utils/common.js";

function EspaceEtudiant() {
  let history = useHistory();

  useEffect(() => {
    let user = getUser();
    if (user == null) history.push("/");
    else if (user.role != "etudiant") {
      history.push("/" + user.role);
    }
  }, []);

  const DisconnectUser = () => {
    removeUserSession();
    axios
      .post(
        "http://localhost:3251/user/login/logout",
        {},
        { withCredentials: true }
      )
      .then((res) => {});

    history.push("/");
  };

  return (
    <div className="App">
      <div className="container">
        <div className="main sign-in">
          <div className="card">
            <button
              type="button"
              className="btn"
              id="btnSignIn"
              style={{ fontSize: 12, width: 100, marginLeft: -22 }}
              onClick={() => {
                DisconnectUser();
              }}
            >
              Déconnexion
            </button>
            <div className="logo"></div>
            <div className="card-head">
              <h3 className="header">Espace étudiant</h3>
            </div>
            <div className="card-body">
              <form id="frmLogin">
                <div className="form-group">
                  <button
                    type="button"
                    className="btn"
                    id="btnSignIn"
                    onClick={() => {
                      history.push("/ajouterpfe");
                    }}
                  >
                    Ajouter PFE
                  </button>
                  <button
                    type="button"
                    className="btn"
                    id="btnSignIn"
                    onClick={() => {
                      history.push("/voiretatpfe");
                    }}
                  >
                    Voir l'état de mon PFE
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

export default EspaceEtudiant;
