import { setUserAsGuest } from '../utils/utils';
import React from 'react';
import { Link } from '@reach/router';

function Header({ loggedInUser, logUserOut }) {
  const handleLogOut = () => {
    setUserAsGuest();
    logUserOut();
  };

  return (
    <header>
      <Link to="/articles" id="a">
        <h1 id="ES-News">{'<ES News />'}</h1>
      </Link>
      {loggedInUser.username !== 'guest' ? (
        <div id="header-rhs">
          <p id="header-greeting">Hi, {loggedInUser.name.split(' ')[0]}</p>
          <Link to={`/users/${loggedInUser.username}`}>
            <img
              src={loggedInUser.avatar_url}
              alt="user avatar"
              id="header-avatar"
            />
          </Link>
          <p id="header-log-out" onClick={handleLogOut}>
            log out
          </p>
        </div>
      ) : (
        <div id="header-rhs">
          <p id="header-greeting"></p>
          <Link to={`/users/${loggedInUser.username}`}>
            <img
              src={loggedInUser.avatar_url}
              alt="user avatar"
              id="header-avatar"
            />
          </Link>
          <Link to="/login">
            <p id="header-login">log in</p>
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
