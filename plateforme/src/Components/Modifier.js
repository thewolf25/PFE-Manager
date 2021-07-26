import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import "../css/App.css";

class Modifier extends Component {
  constructor(props) {
    super(props);
    axios
      .get(
        "http://localhost:3251/etudiant/edit/" + this.props.match.params.id,
        { withCredentials: true }
      )

      .then((response) => {
        this.setState({
          username: response.data.username,
          id: response.data._id,
          email: response.data.email,
          phone: response.data.phone,
        });
      });
    this.state = {
      username: "",
      email: "",
      phone: "",
      id: "",
      // Value: this.props.pfe,
    };
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.redirect = this.redirect.bind(this);
  }
  handleChangeUsername(event) {
    this.setState({ username: event.target.value });
  }
  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }
  handleChangePhone(event) {
    this.setState({ phone: event.target.value });
  }
  handleChangePassword(event) {
    this.setState({ id: event.target.value });
  }
  componentDidMount() {}

  handleSubmit = async (e) => {
    e.preventDefault();
    const username = this.state.username;
    const phone = this.state.phone;
    const email = this.state.email;
    const password = this.state.password;
    //back to back
    axios.post(
      "http://localhost:3251/etudiant/edit/" + this.props.match.params.id,
      {
        username,
        email,
        phone,
        password,
      },
      { withCredentials: true }
    );
  };

  redirect() {
    this.setState({
      redirect: true,
    });
  }
  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/admin" />;
    }
    return (
      <>
        {" "}
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
                  <h3 className="header">Ajouter etudiant</h3>
                </div>
                <div className="card-body">
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group" id="frmLogin">
                      <label className="form-label">Nom</label>
                      <input
                        className="form-control"
                        aria-label="name"
                        name="name"
                        id="txtUsername"
                        type="text"
                        value={this.state.username}
                        onChange={this.handleChangeUsername}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Prenom</label>
                      <input
                        className="form-control"
                        aria-label="prename"
                        name="prenom"
                        id="txtUsername"
                        type="text"
                        value={this.state.username}
                        onChange={this.handleChangeUsername}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input
                        className="form-control"
                        aria-label="email"
                        name="email"
                        id="txtUsername"
                        type="text"
                        value={this.state.email}
                        onChange={this.handleChangeEmail}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Mot de passe</label>
                      <input
                        className="form-control"
                        aria-label="password"
                        name="password"
                        id="txtPassword"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChangePassword}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input
                        className="form-control"
                        name="phone"
                        id="txtUsername"
                        type="text"
                        value={this.state.phone}
                        onChange={this.handleChangePhone}
                      />
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn" id="btnSignIn">
                        Modifier
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Modifier;
