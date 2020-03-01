import React, { Component } from "react";

export default class UsersList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <li key={this.props.id}>
          <span>
            <strong>Username:</strong>
            {this.props.u.name}
          </span>
          <span>
            <strong>Status:</strong>
            {this.props.u.status}
          </span>
        </li>
      </div>
    );
  }
}
