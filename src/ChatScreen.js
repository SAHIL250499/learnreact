import React, { Component } from "react";
import fire from "./config/fire";
import { userRef } from "./config/firebasepath";
import LoadingSpinner from "./component/loadingSpinner";
import UsersList from "./component/UsersList";

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      loading: true
    };
  }

  componentDidMount() {
    this.wait(1000);
    userRef.child(fire.auth().currentUser.uid).on("value", snap => {
      let data = snap.val();
      let userItems = { ...data };
      this.setState({
        user: userItems
      });
    });
  }

  sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

  wait = async milliseconds => {
    await this.sleep(milliseconds);
    this.setState({
      loading: false
    });
  };

  logout = () => {
    fire.auth().signOut();
    this.props.history.push("/login");
  };

  about = () => {
    this.props.history.push("/about");
  };

  render() {
    let userkeys = Object.keys(this.state.user);
    if (this.state.loading) return <LoadingSpinner />;
    return (
      <>
        <div className="container">
          <ul>
            {userkeys.length > 0 ? (
              userkeys.map(key => (
                <UsersList key={key} id={key} u={this.state.user} />
              ))
            ) : (
              <div>No Users</div>
            )}
          </ul>
          <button className="btn btn-primary btn-sm" onClick={this.logout}>
            Logout
          </button>
          <button className="btn btn-primary btn-sm" onClick={this.about}>
            About
          </button>
        </div>
      </>
    );
  }
}
