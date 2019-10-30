import { setUserAsGuest } from '../utils/utils';
import React, { Component } from 'react';
import { Link } from '@reach/router';

class Header extends Component {
  state = {};

  render() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    return (
      <header>
        <h1>NC News</h1>
        <div>
          <p>Hi, {loggedInUser.name.split(' ')[0]}</p>
          <img
            src={loggedInUser.avatar_url}
            alt="user avatar"
            id="header-avatar"
          />
          {loggedInUser.username !== 'guest' ? (
            <>
              <p>my account</p>
              <button onClick={this.handleLogOut}>log out</button>
            </>
          ) : (
            <Link to="/">
              <button>log in</button>
            </Link>
          )}
        </div>
      </header>
    );
  }
  handleLogOut = () => {
    alert('you have logged out');
    setUserAsGuest();
    this.props.toggleUserChange();
  };
}

export default Header;
