import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { Component } from "react";
import fire from "./config/fire";
import "bootstrap/dist/css/bootstrap.min.css";
import ChatScreen from "./ChatScreen";
import Login from "./login/Login";
import Register from "./login/Register";
import PrivateRoute from "./login/withAuthProtection";
import EditDetails from "./EditDetails";
import About from "./component/About";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
      uid: null
    };
  }

  componentDidMount = () => {
    this.authListener();
  };

  authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      //console.log(user);
      if (user) {
        this.setState({ currentUser: user, uid: user.uid });

        //  localStorage.setItem("user", user.uid);
      } else {
        this.setState({ currentUser: null, uid: null });
        // localStorage.removeItem("user");
      }
    });
  };

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route
              exact
              path="/login"
              render={props => {
                return (
                  <Login
                    user={this.state.currentUser}
                    uid={this.state.uid}
                    {...props}
                  />
                );
              }}
            />
            <Route
              exact
              path="/register"
              uid={this.state.uid}
              component={Register}
            />

            <PrivateRoute
              exact
              path="/"
              currentUser={this.state.currentUser}
              uid={this.state.uid}
              component={ChatScreen}
            />
            <PrivateRoute
              exact
              path="/edit"
              currentUser={this.state.currentUser}
              component={EditDetails}
            />
            <PrivateRoute
              exact
              path="/about"
              currentUser={this.state.currentUser}
              component={About}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}
