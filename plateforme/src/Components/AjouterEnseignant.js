import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../css/App.css";
import axios from "axios";
import { getUser, removeUserSession } from "../utils/common.js";
//Import MaterialTable from "material-table";
//Import Edit from '@material-ui/icons/Edit';
//Import Delete from '@material-ui/icons/Delete';
function AjouterEnseignant() {
  let history = useHistory();
  const [name, setName] = useState("");
  const [prename, setPrename] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [phone, setPhone] = useState("");
  let role = "enseignant";

  useEffect(() => {
    let user = getUser();
    if (user == null) history.push("/");
    else if (user.role != "admin") {
      history.push("/" + user.role);
    }
  }, []);

  const AddInstructor = () => {
    axios
      .post("http://localhost:3251/user/register", {
        name,
        prename,
        email,
        password,
        password2,
        phone,
        role,
      })
      .then((response) => {
        console.log(response);
        history.push("/listeenseignants");
      });
  };

  return (
    <div className="App">
      <div className="container">
        <div className="main sign-in">
          <div className="card" style={{ width: "606px" }}>
            <button
              type="button"
              className="btn"
              id="btnSignIn"
              style={{ fontSize: 12, width: 100, marginLeft: -22 }}
              onClick={() => {
                history.push("/listeenseignants");
              }}
            >
              Retour
            </button>
            <div className="logo"></div>
            <div className="card-head">
              <h3 className="header">Ajouter enseignant</h3>
            </div>
            <div className="card-body">
              <form id="frmLogin">
                <div className="form-group">
                  <div className="form-group">
                    <label className="form-label">Nom</label>
                    <input
                      className="form-control"
                      name="name"
                      id="txtUsername"
                      type="text"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Prenom</label>
                    <input
                      className="form-control"
                      name="prenom"
                      id="txtUsername"
                      type="text"
                      onChange={(e) => {
                        setPrename(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      className="form-control"
                      name="email"
                      id="txtUsername"
                      type="text"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Mot de passe</label>
                    <input
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
                    <label className="form-label">
                      Confirmation mot de passe
                    </label>
                    <input
                      className="form-control"
                      name="password"
                      id="txtPassword"
                      type="password"
                      onChange={(e) => {
                        setPassword2(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input
                      className="form-control"
                      name="phone"
                      id="txtUsername"
                      type="text"
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <button
                      type="button"
                      className="btn"
                      id="btnSignIn"
                      onClick={() => {
                        AddInstructor();
                      }}
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AjouterEnseignant;
