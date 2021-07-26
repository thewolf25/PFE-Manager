import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../css/App.css";
import axios from "axios";
import { getUser } from "../utils/common.js";
import MaterialTable from "material-table";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";

function DemandesEncadrement() {
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
      .post("http://localhost:3251/getMesDemandesEncadrements", {
        encadrant: user.username + " " + user.prename,
      })
      .then((response) => {
        console.log(response.data);
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
              <h3 className="header">Liste des demandes d'encadrement</h3>
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
                      actions={[
                        {
                          icon: Edit,
                          tooltip: "Modifier",
                          onClick: (event, rowData) => {
                            history.push("/voirdemandepfe", rowData);
                          },
                        },
                        (rowData) => ({
                          icon: Delete,
                          tooltip: "Supprimer",
                          onClick: (event, rowData) => {},
                        }),
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

export default DemandesEncadrement;
