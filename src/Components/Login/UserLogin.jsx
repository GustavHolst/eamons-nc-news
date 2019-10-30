import React, { Component } from 'react';

class UserLogin extends Component {
  state = {
    username: ''
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Input your username: <input type="text" />
          </label>
          <button type="submit">Enter</button>
        </form>
        <button onClick={this.props.enterAsGuest}>Enter as guest</button>
      </div>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    this.checkUser(event.target.children[0].children[0].value);
  };

  checkUser = username => {
    const usernames = this.props.users.map(user => user.username);
    if (usernames.includes(username)) {
      this.props.logUserIn(username);
    } else {
      alert('Username not recognised');
    }
  };
}

export default UserLogin;
