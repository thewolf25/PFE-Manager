import axios from "axios";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../css/App.css";
//Import axios from 'axios';
import { getUser, removeUserSession } from "../utils/common.js";

function Admin() {
  let history = useHistory();

  useEffect(() => {
    let user = getUser();
    if (user == null) history.push("/");
    //Admin kifeh ?
    else if (user.role != "admin") {
      history.push("/" + user.role);
    }
  }, []); //  Ininit mara bark wa9teli start

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
              <h3 className="header">Espace administratif</h3>
            </div>
            <div className="card-body">
              <form id="frmLogin">
                <div className="form-group">
                  <button
                    type="button"
                    className="btn"
                    id="btnSignIn"
                    onClick={() => {
                      history.push("/anneeuniversitaire");
                    }}
                  >
                    Annee Universitaire
                  </button>
                  <button
                    type="button"
                    className="btn"
                    id="btnSignIn"
                    onClick={() => {
                      history.push("/listeenseignants");
                    }}
                  >
                    Enseignants
                  </button>
                  <button
                    type="button"
                    className="btn"
                    id="btnSignIn"
                    onClick={() => {
                      history.push("/listeetudiants");
                    }}
                  >
                    Etudiants
                  </button>
                  <button
                    type="button"
                    className="btn"
                    id="btnSignIn"
                    onClick={() => {
                      history.push("/listepfes");
                    }}
                  >
                    Liste des PFE
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

export default Admin;
