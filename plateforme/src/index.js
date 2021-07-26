import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import "./index.css";
import Login from "./Components/Login";
import Admin from "./Components/Admin";
import ListeEnseignants from "./Components/ListeEnseignants";
import reportWebVitals from "./reportWebVitals";
import ListeEtudiants from "./Components/ListeEtudiants";
import AjouterEnseignant from "./Components/AjouterEnseignant";
import AjouterEtudiant from "./Components/AjouterEtudiant";
import EspaceEtudiant from "./Components/EspaceEtudiant";
import AjouterPFE from "./Components/AjouterPFE";
import VoirPFE from "./Components/VoirPFE";
import EspaceEnseignant from "./Components/EspaceEnseignant";
import MesEncadrements from "./Components/MesEncadrements";
import DemandesEncadrement from "./Components/DemandesEncadrement";
import VoirDemandePFE from "./Components/VoirDemandePFE";
import ListeTotalePFEs from "./Components/ListeTotalePFEs";
import NotFoundPage from "./Components/NotFoundPage";
import AnneeUniversitaire from "./Components/AnneeUniversitaire";
import Modifier from "./Components/Modifier";

//Affiche components
ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" render={(props) => <Login {...props} />} />
      <Route exact path="/admin" render={(props) => <Admin {...props} />} />
      <Route
        exact
        path="/listeenseignants"
        render={(props) => <ListeEnseignants {...props} />}
      />
      <Route
        exact
        path="/ajouterenseignant"
        render={(props) => <AjouterEnseignant {...props} />}
      />
      <Route
        exact
        path="/listeetudiants"
        render={(props) => <ListeEtudiants {...props} />}
      />
      <Route
        exact
        path="/ajouteretudiant"
        render={(props) => <AjouterEtudiant {...props} />}
      />
      <Route
        exact
        path="/etudiant"
        render={(props) => <EspaceEtudiant {...props} />}
      />
      <Route
        exact
        path="/ajouterpfe"
        render={(props) => <AjouterPFE {...props} />}
      />
      <Route
        exact
        path="/voiretatpfe"
        render={(props) => <VoirPFE {...props} />}
      />
      <Route
        exact
        path="/enseignant"
        render={(props) => <EspaceEnseignant {...props} />}
      />
      <Route
        exact
        path="/voirmespfe"
        render={(props) => <MesEncadrements {...props} />}
      />
      <Route
        exact
        path="/demandespfe"
        render={(props) => <DemandesEncadrement {...props} />}
      />
      <Route
        exact
        path="/listepfes"
        render={(props) => <ListeTotalePFEs {...props} />}
      />
      <Route
        exact
        path="/voirdemandepfe"
        render={(props) => <VoirDemandePFE {...props} />}
      />
      <Route
        exact
        path="/anneeuniversitaire"
        render={(props) => <AnneeUniversitaire {...props} />}
      />
      <Route
        exact
        path="/modifier/:id"
        render={(props) => <Modifier {...props} />}
      />
      <Route path="*" exact component={NotFoundPage} />
    </Switch>
  </Router>,
  // Document.getElementById('root')
  document.getElementById("root") || document.createElement("div") // For testing purposes
);

// If you want to start measuring performance in your app, pass a function
// To log results (for example: reportWebVitals(console.log))
// Or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
