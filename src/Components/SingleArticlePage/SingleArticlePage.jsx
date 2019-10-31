import React, { Component } from 'react';
import * as api from '../../api';
import ArticleHeader from './ArticleHeader';
import { Link, Router } from '@reach/router';
import Comments from '../Comments/Comments';
import Voter from '../Voter';
import Loading from '../Loading';
import ErrorPage from '../ErrorPage';

class SingleArticlePage extends Component {
  state = {
    article: {},
    isLoading: true,
    showComments: false,
    err: null
  };

  render() {
    const { article, isLoading, showComments, err } = this.state;
    const { loggedInUser } = this.props;

    if (isLoading) return <Loading />;
    if (err) return <ErrorPage err={err} />;

    return (
      <main className="single-article-page">
        <ArticleHeader article={article} />
        <Voter
          item_id={article.article_id}
          voteOn="Article"
          votes={article.votes}
          loggedInUser={loggedInUser}
        />
        <p>{article.body}</p>
        {!showComments ? (
          <Link to="comments">
            <button onClick={this.toggleCommentDisplay}>Show Comments</button>
          </Link>
        ) : (
          <Link to="">
            <button onClick={this.toggleCommentDisplay}>Hide Comments</button>
          </Link>
        )}
        <Router>
          <Comments
            path="/comments"
            article_id={article.article_id}
            toggleCommentDisplay={this.toggleCommentDisplay}
            loggedInUser={loggedInUser}
            userChange={this.props.userChange}
          />
        </Router>
      </main>
    );
  }

  componentDidMount() {
    const { article_id } = this.props;
    api
      .getArticle(article_id)
      .then(article => {
        this.setState({ article, isLoading: false });
      })
      .catch(err => this.setState({ err }));
    if (this.props['*'].includes('comments')) {
      this.setState({ showComments: true });
    }
  }

  voter = event => {
    const noOfVotes = event.target.innerText === 'Upvote' ? 1 : -1;

    api
      .voteOnArticle(this.state.article.article_id, noOfVotes)
      .then(() => {
        this.setState(currentState => {
          const newArticle = {
            ...currentState.article,
            votes: currentState.article.votes + noOfVotes
          };
          return { article: newArticle };
        });
      })
      .catch(err => this.setState({ err }));
  };

  toggleCommentDisplay = () => {
    this.setState(currentState => {
      const newShowComments = !currentState.showComments;
      return { showComments: newShowComments };
    });
  };
}

export default SingleArticlePage;
