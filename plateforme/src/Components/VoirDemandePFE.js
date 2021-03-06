import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../css/App.css";
import axios from "axios";
import { getUser, removeUserSession } from "../utils/common.js";
//Import MaterialTable from "material-table";
//Import Edit from '@material-ui/icons/Edit';
//Import Delete from '@material-ui/icons/Delete';
const VoirDemandePFE = (props) => {
  let history = useHistory();
  const [_pfe, setSujet] = useState("");
  const [_encadrantchoisi, setEncadrantChoisi] = useState("");
  const [_entreprise, setEntreprise] = useState("");
  const [dID, setDID] = useState("");
  const [etat, setEtat] = useState();
  let _accepted_by_id = null;
  let _refused = false;
  let _u = getUser();

  let _added_by_id = _u._id;
  let _added_by_name = _u.username + " " + _u.prename;

  useEffect(() => {
    let user = getUser();
    if (user == null) history.push("/");
    else if (user.role != "enseignant") {
      history.push("/" + user.role);
    } else {
      console.log(props.location.state);
      if (props.location.state) {
        const {
          _id,
          pfe,
          entreprise,
          encadrantchoisi,
          added_by_id,
          added_by_name,
          accepted_by_id,
          refused,
        } = props.location.state;
        setDID(_id);
        _accepted_by_id = accepted_by_id;
        _refused = refused;
        if (pfe) {
          setSujet(pfe);
          setEncadrantChoisi(encadrantchoisi);
          setEntreprise(entreprise);
        }
      }
    }
  }, []);

  const getPFEData = () => {
    // Voir liste encadreéé
    axios
      .post("http://localhost:3251/getPFE", {
        uid: _added_by_id,
      })
      .then((response) => {
        console.log(response);
        setSujet(response.data.pfe);
        setEntreprise(response.data.entreprise);
        setEncadrantChoisi(response.data.encadrantchoisi);
        _refused = response.data.refused;
        _accepted_by_id = response.data.accepted_by_id;
      });
  };

  const AccepterDemandePFE = () => {
    let user = getUser();
    axios
      .post("http://localhost:3251/accepterDemandePFE", {
        _id: dID,
        encID: user._id,
      })
      .then((response) => {
        console.log(response);
        history.push("/demandespfe");
      });
  };

  const RefuserDemandePFE = () => {
    let user = getUser();
    axios
      .post("http://localhost:3251/refuserDemandePFE", {
        _id: dID,
      })
      .then((response) => {
        console.log(response);
        history.push("/demandespfe");
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
                history.push("/etudiant");
              }}
            >
              Retour
            </button>
            <div className="logo"></div>
            <div className="card-head">
              <h3 className="header">
                Demande encadrement : (
                {_accepted_by_id != ("" || null)
                  ? "Accepté"
                  : _refused == true
                  ? "Réfusé"
                  : "En attente"}
                )
              </h3>
            </div>
            <div className="card-body">
              <form id="frmLogin">
                <div className="form-group">
                  <div className="form-group">
                    <label className="form-label">Sujet PFE</label>
                    <textarea
                      value={_pfe}
                      className="form-control"
                      name="name"
                      id="txtUsername"
                      type="text"
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Entreprise</label>
                    <input
                      value={_entreprise}
                      className="form-control"
                      name="name"
                      id="txtUsername"
                      type="text"
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Encadrant choisi</label>
                    <input
                      value={_encadrantchoisi}
                      className="form-control"
                      name="name"
                      id="txtUsername"
                      type="text"
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <button
                      type="button"
                      className="btn"
                      id="btnSignIn"
                      onClick={() => {
                        AccepterDemandePFE();
                      }}
                    >
                      Accepter
                    </button>
                  </div>
                  <div className="form-group">
                    <button
                      type="button"
                      className="btn"
                      id="btnSignIn"
                      onClick={() => {
                        RefuserDemandePFE();
                      }}
                    >
                      Refuser
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
};

export default VoirDemandePFE;
