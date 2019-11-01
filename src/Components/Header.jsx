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
        <div className="header-rhs">
          <p className="header-greeting">
            Hi, {loggedInUser.name.split(' ')[0]}
          </p>
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
        <div className="header-rhs">
          <p className="header-greeting"></p>
          <Link to={'/login'}>
            <img
              src={loggedInUser.avatar_url}
              alt="user avatar"
              id="header-avatar"
            />
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
