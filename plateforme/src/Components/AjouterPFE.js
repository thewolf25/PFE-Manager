import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../css/App.css";
import axios from "axios";
import { getUser } from "../utils/common.js";

function AjouterPFE() {
  let history = useHistory();
  const [pfe, setSujet] = useState("");
  const [encadrantchoisi, setEncadrantChoisi] = useState("");
  const [entreprise, setEntreprise] = useState("");
  const [liste, setListe] = useState([]);
  const [disabled, setDisabled] = useState(false);

  let _u = getUser();

  let added_by_id = _u._id;
  let added_by_name = _u.username + " " + _u.prename;

  useEffect(() => {
    let user = getUser();
    if (user == null) history.push("/");
    else if (user.role != "etudiant") {
      history.push("/" + user.role);
    } else {
      getEnseignantsList();
    }
  }, []);
  axios
    .get("http://localhost:3251/template/pfe", { withCredentials: true })
    .then((response) => {
      if (response.data.days < 0) {
        setDisabled(true);
      }
    })
    .catch((response) => {});
  console.log(disabled);

  const getEnseignantsList = () => {
    axios
      .get("http://localhost:3251/getAllInstructors")
      .then((response) => {
        if (response.data != null) {
          setEncadrantChoisi(
            response.data[0].username + " " + response.data[0].prename
          );
          setListe(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function getlistE() {
    let optionItems = liste.map((e) => (
      <option key={e.username + " " + e.prename}>
        {e.username + " " + e.prename}
      </option>
    ));
    return optionItems;
  }

  const AddPFE = () => {
    console.log(encadrantchoisi);
    axios
      .post("http://localhost:3251/ajouterPFE", {
        pfe: pfe,
        encadrantchoisi: encadrantchoisi,
        entreprise: entreprise,
        added_by_id: added_by_id,
        added_by_name: added_by_name,
      })
      .then((response) => {
        console.log(response);
        history.push("/voiretatpfe", response.data);
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
              <h3 className="header">Ajouter PFE</h3>
            </div>
            <div className="card-body">
              <form id="frmLogin">
                <div className="form-group">
                  <div className="form-group">
                    <label className="form-label">Sujet PFE</label>
                    <textarea
                      className="form-control"
                      name="name"
                      id="txtUsername"
                      type="text"
                      onChange={(e) => {
                        setSujet(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Entreprise</label>
                    <input
                      className="form-control"
                      name="name"
                      id="txtUsername"
                      type="text"
                      onChange={(e) => {
                        setEntreprise(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Encadrant choisi</label>
                    <select
                      value={encadrantchoisi}
                      style={{ width: 540, marginTop: 10 }}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setEncadrantChoisi(e.target.value);
                      }}
                    >
                      {getlistE()}
                    </select>
                  </div>
                  <div className="form-group">
                    <button
                      type="button"
                      className="btn"
                      id="btnSignIn"
                      disabled={disabled}
                      onClick={() => {
                        AddPFE();
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

export default AjouterPFE;
