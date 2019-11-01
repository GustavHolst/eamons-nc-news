import React, { Component } from 'react';
import { Link } from '@reach/router';

class UserLogin extends Component {
  state = {
    username: '',
    usernameNotRecognised: false
  };

  render() {
    const { loggedInUser, logUserOut } = this.props;

    return (
      <main className="login">
        {loggedInUser.username !== 'guest' ? (
          <div>
            <p>Hi, {loggedInUser.name.split(' ')[0]}</p>
            <img src={loggedInUser.avatar_url} alt="user avatar" />
            <p>You're already logged in. What would you like to do now?</p>
            <div>
              <p onClick={logUserOut}>Log out</p>
              <Link to="/articles">
                <p>Go back to Articles</p>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {' '}
            <form onSubmit={this.handleSubmit}>
              <label>
                Input your username: <input type="text" />
              </label>
              <button id="enter-button" type="submit">
                Enter
              </button>
            </form>
            <Link to="/articles">
              <p>Enter as guest</p>
            </Link>
            {this.state.usernameNotRecognised ? (
              <p>
                Username not recognised. Please try again or feel free to enter
                as a guest
              </p>
            ) : null}
          </>
        )}
      </main>
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
      this.setState({ usernameNotRecognised: true });
    }
  };
}

export default UserLogin;
