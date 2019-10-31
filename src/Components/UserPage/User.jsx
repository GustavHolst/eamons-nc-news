import React, { PureComponent } from 'react';
import * as api from '../../api';
import ArticleCard from '../ArticleListPage/ArticleCard';
import ErrorPage from '../ErrorPage';
import Loading from '../Loading';

class User extends PureComponent {
  state = {
    isLoading: true,
    thisUser: {},
    articles: [],
    err: null
  };

  render() {
    const { isLoading, thisUser, articles, err } = this.state;
    const { loggedInUser, users } = this.props;

    if (isLoading) return <Loading />;
    if (err) return <ErrorPage err={err} />;

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
              users={users}
              loggedInUser={loggedInUser}
              deleteArticle={this.deleteArticle}
            />
          );
        })}
      </main>
    );
  }

  componentDidMount() {
    const allUsernames = this.props.users.map(user => user.username);
    if (allUsernames.includes(this.props.username)) {
      const thisUser = this.props.users.filter(
        user => user.username === this.props.username
      )[0];
      this.setState({ thisUser, isLoading: false });
    } else {
      this.setState({
        err: { status: 404, msg: 'User not found' },
        isLoading: false
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.thisUser.username !== prevState.thisUser.username) {
      api
        .getArticles({ author: this.state.thisUser.username })
        .then(({ articles }) => this.setState({ articles, isLoading: false }))
        .catch(err => this.setState({ err, isLoading: false }));
    }
  }
}

export default User;
