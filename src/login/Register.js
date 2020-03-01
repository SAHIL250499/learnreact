import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import fire from "../config/fire";
import { userRef } from "../config/firebasepath";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      url: "https://img.icons8.com/color/480/000000/morty-smith.png"
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  signup = e => {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {
        userRef.child(u.user.uid).set({
          email: u.user.email,
          name: this.state.name,
          image: this.state.url,
          img_thumbnail: this.state.url,
          status: "i am using meetup"
        });
        this.props.history.push("/");
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <form className="container">
          <label>
            <h1>Register Page</h1>
          </label>
          <div className="form-group">
            <label>User Name</label>
            <input
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
              type="text"
              className="form-control"
              id="exampleusername"
            />
          </div>
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
          <button
            onClick={this.signup}
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
          <Link to="/login">Already Logged In</Link>
        </form>
      </div>
    );
  }
}
