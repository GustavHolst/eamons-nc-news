import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../../api';
import CommentCard from './CommentCard';
import ArticlesPagination from '../ArticleListPage/ArticlesPagination';

class Comments extends Component {
  state = {
    comments: [],
    isLoading: true,
    p: 1,
    total_count: 0
  };

  render() {
    const { toggleCommentDisplay } = this.props;
    const { comments, isLoading, p, total_count } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    } else {
      return (
        <section>
          <Link to="../">
            <button onClick={toggleCommentDisplay}>Hide Comments</button>
          </Link>
          {comments.map(comment => {
            return (
              <CommentCard
                key={comment.comment_id}
                comment={comment}
                voteOnComment={this.voteOnComment}
              />
            );
          })}
          <ArticlesPagination
            p={p}
            total_count={total_count}
            changePage={this.changePage}
          />
        </section>
      );
    }
  }

  voteOnComment = ({ target: { id } }) => {
    let [noOfVotes, comment_id] = id.split(',');
    noOfVotes = parseInt(noOfVotes);

    api
      .voteOnComment(comment_id, noOfVotes)
      .then(() => {
        this.setState(currentState => {
          const newComments = currentState.comments.map(comment => {
            if (comment.comment_id === parseInt(comment_id)) {
              return { ...comment, votes: comment.votes + noOfVotes };
            }
            return { ...comment };
          });
          return { comments: newComments };
        });
      })
      .catch(console.log);
  };

  componentDidMount() {
    api
      .getCommentsByArticle(this.props.article_id)
      .then(({ comments, total_count }) => {
        this.setState({ comments, total_count, isLoading: false });
      });
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
}

export default Comments;
