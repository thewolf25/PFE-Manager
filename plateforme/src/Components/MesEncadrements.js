import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../css/App.css";
import axios from "axios";
import { getUser, removeUserSession } from "../utils/common.js";
import MaterialTable from "material-table";
//Import Edit from '@material-ui/icons/Edit';
//Import Delete from '@material-ui/icons/Delete';

function MesEncadrements() {
  let history = useHistory();
  const [liste, setListe] = useState([]);

  useEffect(() => {
    let user = getUser();
    if (user == null) history.push("/");
    else if (user.role != "enseignant") {
      history.push("/" + user.role);
    } else {
      console.log("Getting instructors list");
      getMesEncadrements(user);
    }
  }, []);

  const getMesEncadrements = (user) => {
    axios
      .post("http://localhost:3251/getMesEncadrements", {
        encadrant: user.username + " " + user.prename,
        accepted_by_id: user._id,
      })
      .then((response) => {
        if (response.data != null) {
          setListe(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <div className="container">
        <div className="main sign-in">
          <div className="card" style={{ width: "800px" }}>
            <button
              type="button"
              className="btn"
              id="btnSignIn"
              style={{ fontSize: 12, width: 100, marginLeft: -22 }}
              onClick={() => {
                history.push("/admin");
              }}
            >
              Retour
            </button>
            <div className="logo"></div>
            <div className="card-head">
              <h3 className="header">Liste des PFE encadrés</h3>
            </div>
            <div className="card-body">
              <form id="frmLogin">
                <div className="form-group">
                  <div className="flexContainerTable">
                    <MaterialTable
                      title=""
                      options={{
                        search: false,
                        paging: false,
                        filtering: false,
                        exportButton: false,
                        actionsColumnIndex: -1,
                      }}
                      columns={[
                        { title: "Etudiant", field: "added_by_name" },
                        { title: "Entreprise", field: "entreprise" },
                      ]}
                      data={liste}
                    />
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

export default MesEncadrements;
