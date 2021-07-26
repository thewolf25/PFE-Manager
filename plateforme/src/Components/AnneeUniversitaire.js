import React, { Component, useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import "../css/App.css";
import axios from "axios";
import { getUser, removeUserSession } from "../utils/common.js";
//Import MaterialTable from "material-table";
//Import Edit from '@material-ui/icons/Edit';
//Import Delete from '@material-ui/icons/Delete';

class AnneeUniversitaire extends Component {
  constructor(props) {
    super(props);

    this.onChangeDatedeb = this.onChangeDatedeb.bind(this);
    this.onChangeDatefin = this.onChangeDatefin.bind(this);
    this.onChangeDelai = this.onChangeDelai.bind(this);
    this.redirect = this.redirect.bind(this);

    this.state = {
      datedeb: "",
      datefin: "",
      delai: 0,
      value: "",
      redirect: false,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3251/admin/annee", { withCredentials: true })
      .then((response) => {
        this.setState({
          datedeb: response.data.datedeb,
          datefin: response.data.datefin,
          delai: response.data.delai,
          value: response.data.delai,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChangeDatedeb(e) {
    this.setState({
      datedeb: e.target.value,
    });
  }

  redirect() {
    this.setState({
      redirect: true,
    });
  }

  onChangeDatefin(e) {
    this.setState({
      datefin: e.target.value,
    });
  }

  onChangeDelai(e) {
    this.setState({
      delai: e.target.value,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const datedeb = this.state.datedeb;
    const datefin = this.state.datefin;
    const delai = this.state.delai;

    axios.post(
      "http://localhost:3251/admin/annee/",
      { datedeb, datefin, delai },
      { withCredentials: true }
    );
    alert("Modified");
  };

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/admin" />;
    }
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
                onClick={this.redirect}
              >
                Retour
              </button>
              <div className="logo"></div>
              <div className="card-head">
                <h3 className="header">Ajouter Une Annee Universitaire</h3>
              </div>
              <div className="card-body">
                <form id="frmLogin" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <div className="form-group">
                      <label className="form-label">Date Debut</label>
                      <input
                        className="form-control"
                        aria-label="name"
                        name="name"
                        id="txtUsername"
                        type="date"
                        value={this.state.datedeb}
                        onChange={this.onChangeDatefin}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Date Fin</label>
                      <input
                        className="form-control"
                        aria-label="prename"
                        name="prenom"
                        id="txtUsername"
                        type="date"
                        value={this.state.datefin}
                        onChange={this.onChangeDatefin}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        Delai du Depot des PFE
                      </label>
                      <input
                        className="form-control"
                        aria-label="email"
                        name="email"
                        id="txtUsername"
                        type="date"
                        onChange={this.onChangeDelai}
                        value={this.state.delai}
                      />
                    </div>

                    <div className="form-group">
                      <button type="submit" className="btn" id="btnSignIn">
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
}
export default AnneeUniversitaire;
