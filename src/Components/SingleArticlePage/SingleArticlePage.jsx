import React, { Component } from 'react';
import * as api from '../../api';
import ArticleHeader from './ArticleHeader';
import ArticleBody from './ArticleBody';
import ArticleVoting from './ArticleVoting';
import { Link, Router } from '@reach/router';
import Comments from '../Comments/Comments';

class SingleArticlePage extends Component {
  state = {
    article: {},
    isLoading: true,
    showComments: false
  };

  render() {
    const { article, isLoading, showComments } = this.state;
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (isLoading) return <p>Loading...</p>;

    return (
      <main>
        <ArticleHeader article={article} />
        <ArticleVoting article={article} voter={this.voter} />
        <ArticleBody article={article} />
        {!showComments ? (
          <Link to="comments">
            <button onClick={this.toggleCommentDisplay}>Show Comments</button>
          </Link>
        ) : null}
        <Router>
          <Comments
            path="/comments"
            article_id={article.article_id}
            toggleCommentDisplay={this.toggleCommentDisplay}
            loggedInUser={loggedInUser}
          />
        </Router>
      </main>
    );
  }

  componentDidMount() {
    const { article_id } = this.props;
    // look at URI
    api.getArticle(article_id).then(article => {
      this.setState({ article, isLoading: false });
    });
  }

  voter = event => {
    const noOfVotes = event.target.innerText === 'Upvote' ? 1 : -1;

    api.voteOnArticle(this.state.article.article_id, noOfVotes).then(() => {
      this.setState(currentState => {
        const newArticle = {
          ...currentState.article,
          votes: currentState.article.votes + noOfVotes
        };
        return { article: newArticle };
      });
    });
  };

  toggleCommentDisplay = () => {
    this.setState(currentState => {
      const newShowComments = !currentState.showComments;
      return { showComments: newShowComments };
    });
  };

}

export default SingleArticlePage;
