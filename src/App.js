import './App.css';
import Header from './Components/Header';
import { Router, navigate } from '@reach/router';
import ArticleList from './Components/ArticleListPage/ArticleList';
import SingleArticlePage from './Components/SingleArticlePage/SingleArticlePage';
import UserLogin from './Components/Login/UserLogin';
import React, { Component } from 'react';
import * as api from './api';
import { setUserAsGuest } from './utils/utils';

class App extends Component {
  state = {
    isLoading: true,
    users: []
  };

  render() {
    if (this.state.isLoading) return <p>Loading...</p>;

    return (
      <>
        <Header guest={this.state.guest} />
        <Router>
          <UserLogin
            path="/"
            users={this.state.users}
            logUserIn={this.logUserIn}
            enterAsGuest={this.enterAsGuest}
          />
          <ArticleList path="/articles" users={this.state.users} />
          <SingleArticlePage
            path="/articles/:article_id/*"
            users={this.state.loggedInUser}
          />
        </Router>
      </>
    );
  }

  componentDidMount() {
    api.getUsers().then(users => {
      this.setState({ users, isLoading: false });
    });
  }

  logUserIn = username => {
    const loggedInUser = this.state.users.filter(
      user => user.username === username
    )[0];
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    this.setState({ guest: false });
    navigate('/articles');
  };

  enterAsGuest = () => {
    setUserAsGuest();
    navigate('/articles');
  };
}

export default App;
