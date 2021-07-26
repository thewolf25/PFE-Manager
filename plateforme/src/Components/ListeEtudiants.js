import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../css/App.css";
import axios from "axios";
import { getUser } from "../utils/common.js";
import MaterialTable from "material-table";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
function ListeEtudiants() {
  let history = useHistory();
  const [liste, setListe] = useState([]);

  useEffect(() => {
    let user = getUser();
    if (user == null) history.push("/");
    else if (user.role != "admin") {
      history.push("/" + user.role);
    } else {
      console.log("Getting instructors list");
      getStudentsList();
    }
  }, []);
  const supprimer = (id) => {
    axios
      .post(
        "http://localhost:3251/admin/delete/" + id,
        {},
        { withCredentials: true }
      )
      .then((response) => {
        history.push("/admin");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getStudentsList = () => {
    axios
      .get("http://localhost:3251/getAllStudents")
      .then((response) => {
        console.log("mjdi");
        if (response.data != null) {
          setListe(response.data);
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
          <div className="card" style={{ width: "80%" }}>
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
              <h3 className="header">Liste des etudiants</h3>
            </div>
            <div className="card-body">
              <form id="frmLogin">
                <div className="form-group">
                  <div className="flexContainerTable">
                    <button
                      type="button"
                      className="btn addButtonTable"
                      id="btnSignIn"
                      style={{ fontSize: 12, width: 100, marginBottom: 20 }}
                      onClick={() => {
                        history.push("/ajouteretudiant");
                      }}
                    >
                      Ajouter
                    </button>
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
                        { title: "Nom", field: "username" },
                        { title: "Prénom", field: "prename" },
                        { title: "Email", field: "email" },
                      ]}
                      data={liste}
                      actions={[
                        {
                          icon: Edit,
                          tooltip: "Modifier",
                          onClick: (event, rowData) => {
                            history.push("/modifier/" + rowData._id);
                          },
                        },
                        (rowData) => ({
                          icon: Delete,
                          tooltip: "Supprimer",
                          onClick: (event, rowData) => {
                            supprimer(rowData._id);
                          },
                        }),
                      ]}
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

export default ListeEtudiants;
