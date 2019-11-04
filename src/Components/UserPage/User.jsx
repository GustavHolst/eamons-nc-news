import React, { PureComponent } from 'react';
import * as api from '../../api';
import ArticleCard from '../ArticleListPage/ArticleCard';
import ErrorPage from '../ErrorPage';
import Loading from '../Loading';
import Pagination from '../Pagination';

class User extends PureComponent {
  state = {
    isLoading: true,
    thisUser: {},
    articles: [],
    err: null,
    p: 1,
    total_count: 0
  };

  render() {
    const { isLoading, thisUser, articles, err, p, total_count } = this.state;
    const { loggedInUser, users } = this.props;

    if (isLoading) return <Loading />;
    if (err) return <ErrorPage err={err} />;

    return (
      <main className="user-page">
        <h2 className="username">{thisUser.username}</h2>
        <img
          id="user-page-avatar"
          src={thisUser.avatar_url}
          alt="user avatar"
        />
        <p>Articles by {thisUser.username}:</p>
        <ul className="user-page-article-cards-container">
          {articles.map(article => {
            return (
              <ArticleCard
                key={article.article_id}
                article={article}
                vote={this.vote}
                users={users}
                loggedInUser={loggedInUser}
                deleteArticle={this.deleteArticle}
                requestDeleteArticle={this.requestDeleteArticle}
              />
            );
          })}
        </ul>
        <Pagination
          p={p}
          total_count={total_count}
          changePage={this.changePage}
        />
      </main>
    );
  }

  componentDidMount() {
    const allUsernames = this.props.users.map(user => user.username);
    if (allUsernames.includes(this.props.username)) {
      const thisUser = this.props.users.find(
        user => user.username === this.props.username
      );
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
        .then(({ articles, total_count }) =>
          this.setState({ articles, total_count, isLoading: false })
        )
        .catch(err => {
          err = { status: err.response.status, msg: err.response.data.msg };
          this.setState({ err, isLoading: false });
        });
    }
  }

  changePage = event => {
    if (event.target.id === 'next-page') {
      this.setState(currentState => {
        const newP = currentState.p + 1;
        return { p: newP };
      });
    } else {
      this.setState(currentState => {
        const newP = currentState.p - 1;
        return { p: newP };
      });
    }
  };

  requestDeleteArticle = event => {
    const article_id = parseInt(event.target.id);
    if (
      window.confirm(
        'Are you sure you want to delete this article and all of its comments?'
      )
    ) {
      api
        .deleteArticle(article_id)
        .then(() => {
          this.setState(currentState => {
            const newarticles = currentState.articles.filter(
              article => article.article_id !== article_id
            );
            return {
              articles: newarticles,
              total_count: currentState.total_count - 1
            };
          });
        })
        .catch(err => {
          err = { status: err.response.status, msg: err.response.data.msg };
          this.setState({ err, isLoading: false });
        });
    }
  };
}

export default User;
