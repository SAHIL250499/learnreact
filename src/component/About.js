import React, { Component } from "react";
import fire from "../config/fire";
import { userRef } from "../config/firebasepath";

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    userRef.child(fire.auth().currentUser.uid).on("value", snap => {
      this.setState({
        user: snap.val()
      });
    });
  }

  logout = () => {
    fire.auth().signOut();
    this.props.history.push("/login");
  };

  edit = () => {
    this.props.history.push("/edit");
  };

  render() {
    return (
      <>
        <div className="container">
          <img
            src={
              this.state.user.image ||
              "https://img.icons8.com/color/480/000000/morty-smith.png"
            }
          />
          <h1 className="text-center">{this.state.user.name}</h1>
          <h3>{this.state.user.status}</h3>

          <button className="btn btn-primary btn-sm" onClick={this.logout}>
            Logout
          </button>
          <button className="btn btn-primary btn-sm" onClick={this.edit}>
            EditDetails
          </button>
        </div>
      </>
    );
  }
}
