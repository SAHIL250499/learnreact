import React, { Component } from "react";
import fire from "./config/fire";
import { userRef, storageRef } from "./config/firebasepath";

export default class EditDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      name: "",
      status: "",
      pimage: null
    };
  }

  componentDidMount() {
    userRef.child(fire.auth().currentUser.uid).on("value", snap => {
      this.setState({
        user: snap.val()
      });
    });
  }

  filehandler = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({
        pimage: image
      }));
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleUpload = () => {
    const uploadTask = storageRef
      .child(fire.auth().currentUser.uid)
      .child(this.state.pimage.name);
    const uploadTask2 = uploadTask.put(this.state.pimage);
    uploadTask2.on(
      "state_changed",
      snapshot => {},
      err => {
        console.log(err);
      },
      () => {
        uploadTask.getDownloadURL().then(url => {
          userRef.child(fire.auth().currentUser.uid).update({
            image: url,
            img_thumbnail: url
          });
        });
      }
    );
  };

  save = () => {
    userRef.child(fire.auth().currentUser.uid).update({
      name: this.state.name,
      status: this.state.status
    });

    this.props.history.push("/about");
  };

  render() {
    return (
      <div className="container">
        <img
          src={
            this.state.user.image ||
            "https://img.icons8.com/color/480/000000/morty-smith.png"
          }
          className="img-thumbnail"
        />
        <input type="file" onChange={this.filehandler} />
        <button onClick={this.handleUpload}>Upload</button>
        <div>
          <label>Name</label>
          <input
            name="name"
            type="text"
            onChange={this.handleChange}
            value={this.state.name}
          />
        </div>
        <div>
          <label>Status</label>
          <input
            name="status"
            type="text"
            onChange={this.handleChange}
            value={this.state.status}
          />
        </div>
        <button className="btn btn-primary btn-sm" onClick={this.save}>
          save
        </button>
      </div>
    );
  }
}
