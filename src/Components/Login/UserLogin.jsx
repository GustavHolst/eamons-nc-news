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
          <div className="already-logged-in">
            <h2 className="username">Hi, {loggedInUser.name.split(' ')[0]}</h2>
            <img
              id="login-avatar"
              src={loggedInUser.avatar_url}
              alt="user avatar"
            />
            <p className="login-text">
              You're already logged in. What would you like to do now?
            </p>
            <div>
              <button
                className="button"
                id="log-out-button"
                onClick={logUserOut}
              >
                Log out
              </button>
              <Link to="/articles">
                <button className="button" id="go-to-artciles-button">
                  Go to Articles
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {' '}
            <form onSubmit={this.handleSubmit} className="login-form">
              <label id="username-input-label">
                <input
                  className="username-input"
                  type="text"
                  placeholder="Username"
                />
              </label>
              <div className="login-form-button-container">
                <Link to="/articles">
                  <button className="button">Enter as guest</button>
                </Link>
              </div>
              <div className="login-form-button-container">
                <button className="button" type="submit">
                  Enter
                </button>
              </div>
            </form>
            <div id="username-not-recognised-container">
              {this.state.usernameNotRecognised ? (
                <p className="login-text" id="username-not-recognised">
                  Username not recognised. Please try again or feel free to
                  enter as a guest
                </p>
              ) : null}
            </div>
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
