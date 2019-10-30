import './App.css';
import Header from './Components/Header';
import { Router, navigate } from '@reach/router';
import ArticleList from './Components/ArticleListPage/ArticleList';
import SingleArticlePage from './Components/SingleArticlePage/SingleArticlePage';
import UserLogin from './Components/Login/UserLogin';
import React, { Component } from 'react';
import * as api from './api';
import { setUserAsGuest } from './utils/utils';
import User from './Components/UserPage/User';

class App extends Component {
  state = {
    isLoading: true,
    users: [],
    userChange: 0
  };

  render() {
    if (this.state.isLoading) return <p>Loading...</p>;

    return (
      <>
        <Header
          guest={this.state.guest}
          toggleUserChange={this.toggleUserChange}
          userChange={this.state.userChange}
        />
        <Router>
          <UserLogin
            path="/"
            users={this.state.users}
            logUserIn={this.logUserIn}
            enterAsGuest={this.enterAsGuest}
            toggleUserChange={this.toggleUserChange}
            userChange={this.state.userChange}
          />
          <ArticleList
            path="/articles"
            users={this.state.users}
            userChange={this.state.userChange}
          />
          <SingleArticlePage
            path="/articles/:article_id/*"
            users={this.state.loggedInUser}
            userChange={this.state.userChange}
          />
          <User path="users/:username" />
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
    this.toggleUserChange();
    navigate('/articles');
    this.setState({ userChange: true });
  };

  toggleUserChange = () => {
    this.setState(currentState => {
      return { userChange: currentState.userChange + 1 };
    });
  };
}

export default App;
