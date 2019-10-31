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
          <button onClick={handleLogOut}>log out</button>
        </div>
      ) : (
        <Link to="/login">
          <p id="header-login">log in</p>
        </Link>
      )}
    </header>
  );
}

export default Header;
