import React, { Component } from "react";
import fire from "../config/fire";
import firebase from "firebase";
import { Link, Redirect } from "react-router-dom";
import { userRef } from "../config/firebasepath";
import loadingSpinner from "../component/loadingSpinner";

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.googlesign = this.googlesign.bind(this);
    this.state = {
      email: "",
      password: ""
    };
  }

  googlesign(e) {
    e.preventDefault();
    var provider = new firebase.auth.GoogleAuthProvider();
    fire
      .auth()
      .signInWithPopup(provider)
      .then(function(u) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = u.credential.accessToken;
        // The signed-in user info.

        // ...
        userRef.child(u.user.uid).once("value", snap => {
          if (snap.val() === null) {
            userRef.child(u.user.uid).set({
              email: u.user.email,
              name: u.user.displayName,
              image: "",
              img_thumbnail: "",
              status: "i am using meetup"
            });
          }
        });
      })
      .then(() => this.props.history.push("/"))
      .catch(error => {
        console.log(error);
      });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  login = e => {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.history.push("/"))
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };

    if (this.props.user) {
      return <Redirect to={from} />;
    }

    return (
      <form className="container">
        <label>
          <h1>Login Page</h1>
        </label>
        <div className="form-group">
          <label>Email address</label>
          <input
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label">remember me</label>
        </div>
        <button onClick={this.login} type="submit" className="btn btn-primary">
          Login
        </button>
        <Link to="/register">Want to register</Link>
        <button
          onClick={this.googlesign}
          type="submit"
          className="btn btn-primary"
        >
          GoogleSignIn
        </button>
      </form>
    );
  }
}
export default Login;
