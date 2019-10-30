import React, { PureComponent } from 'react';
import * as api from '../../api';
import ArticleCard from '../ArticleListPage/ArticleCard';

class User extends PureComponent {
  state = {
    users: [],
    isLoading: true,
    thisUser: {},
    articles: []
  };

  render() {
    const { isLoading, thisUser, articles } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    } else {
      return (
        <main>
          <p>Username: {thisUser.username}</p>
          <img src={thisUser.avatar_url} alt="user avatar" />
          <p>Articles by {thisUser.username}</p>
          {articles.map(article => {
            return (
              <ArticleCard
                key={article.article_id}
                article={article}
                vote={this.vote}
                deleteArticle={this.deleteArticle}
              />
            );
          })}
        </main>
      );
    }
  }

  componentDidMount() {
    api.getUsers().then(users => {
      this.setState({ users });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.users.length !== prevState.users.length) {
      const thisUser = this.state.users.filter(
        user => user.username === this.props.username
      )[0];
      this.setState({ thisUser });
    }
    if (this.state.thisUser.username !== prevState.thisUser.username) {
      api
        .getArticles({ author: this.state.thisUser.username })
        .then(({ articles }) => this.setState({ articles, isLoading: false }))
        .catch(console.log);
    }
  }
}

export default User;
