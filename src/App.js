import './App.css';
import Header from './Components/Header';
import { Router, navigate } from '@reach/router';
import ArticleList from './Components/ArticleListPage/ArticleList';
import SingleArticlePage from './Components/SingleArticlePage/SingleArticlePage';
import UserLogin from './Components/Login/UserLogin';
import React, { Component } from 'react';
import * as api from './api';
import User from './Components/UserPage/User';
import ErrorPage from './Components/ErrorPage';

class App extends Component {
  state = {
    isLoading: true,
    users: [],
    loggedInUser: {}
  };

  render() {
    if (this.state.isLoading) return <p>Loading...</p>;
    const { loggedInUser } = this.state;

    return (
      <>
        <Header
          guest={this.state.guest}
          toggleUserChange={this.toggleUserChange}
          userChange={this.state.userChange}
          loggedInUser={loggedInUser}
          logUserOut={this.logUserOut}
        />
        <Router>
          <ErrorPage default err={{ status: 400, msg: 'Page not found' }} />
          <UserLogin
            path="/login"
            users={this.state.users}
            logUserIn={this.logUserIn}
            logUserOut={this.logUserOut}
            loggedInUser={loggedInUser}
            enterAsGuest={this.enterAsGuest}
          />
          <ArticleList
            path="/"
            users={this.state.users}
            loggedInUser={loggedInUser}
            userChange={this.state.userChange}
          />
          <ArticleList
            path="/articles"
            users={this.state.users}
            loggedInUser={loggedInUser}
            userChange={this.state.userChange}
          />
          <ArticleList
            path="/articles/topics/:topic"
            users={this.state.users}
            loggedInUser={loggedInUser}
            userChange={this.state.userChange}
          />
          <ArticleList
            path="/users/:username/articles"
            users={this.state.users}
            loggedInUser={loggedInUser}
            userChange={this.state.userChange}
          />
          <SingleArticlePage
            path="/articles/:article_id/*"
            users={this.state.loggedInUser}
            loggedInUser={loggedInUser}
            userChange={this.state.userChange}
          />
          <User
            path="users/:username"
            loggedInUser={loggedInUser}
            users={this.state.users}
          />
        </Router>
      </>
    );
  }

  componentDidMount() {
    let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
      loggedInUser = {
        username: 'guest',
        avatar_url:
          'http://wpuploads.appadvice.com/wp-content/uploads/2014/10/facebookanon.jpg',
        name: 'Guest'
      };
      localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    }

    api.getUsers().then(users => {
      this.setState({ users, isLoading: false, userChange: 0, loggedInUser });
    });
  }

  logUserIn = username => {
    const loggedInUser = this.state.users.find(
      user => user.username === username
    );
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    this.setState({ loggedInUser });
    navigate('/articles');
  };

  logUserOut = () => {
    this.setState({
      loggedInUser: {
        username: 'guest',
        avatar_url:
          'http://wpuploads.appadvice.com/wp-content/uploads/2014/10/facebookanon.jpg',
        name: 'Guest'
      }
    });
  };
}

export default App;
