import React from "react";
//Import { useHistory } from 'react-router-dom';
import "../css/App.css";

function NotFoundPage() {
  return (
    <div className="App">
      <div className="container">
        <div className="main sign-in">
          <div className="card">
            <div className="logo"></div>
            <div className="card-head">
              <h3 className="header">Page Introuvable</h3>
            </div>
            <div className="card-body">
              <form id="frmLogin">
                <div className="form-group">
                  <h3>La page que vous demandez n'existe pas</h3>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
