import { setUserAsGuest } from '../utils/utils';
import React, { Component } from 'react';
import { Link } from '@reach/router';

class Header extends Component {
  state = {};

  render() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    return (
      <header>
        <Link to="/articles">
          <h1>NC News</h1>
        </Link>
        {loggedInUser.username !== 'guest' ? (
          <div>
            <p>Hi, {loggedInUser.name.split(' ')[0]}</p>
            <Link to={`/users/${loggedInUser.username}`}>
              <img
                src={loggedInUser.avatar_url}
                alt="user avatar"
                id="header-avatar"
              />
            </Link>
            <button onClick={this.handleLogOut}>log out</button>
          </div>
        ) : (
          <Link to="/">
            <p id="header-login">log in</p>
          </Link>
        )}
      </header>
    );
  }
  handleLogOut = () => {
    setUserAsGuest();
    this.props.toggleUserChange();
  };
}

export default Header;
