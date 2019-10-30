import React, { Component } from 'react';
import * as api from '../../api';
import CommentCard from './CommentCard';
import Pagination from '../Pagination';
import CommentAdder from '../Comments/CommentAdder';

class Comments extends Component {
  state = {
    comments: [],
    isLoading: true,
    p: 1,
    total_count: 0
  };

  render() {
    const { article_id, loggedInUser } = this.props;
    const { comments, isLoading, p, total_count } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    } else {
      return (
        <section>
          <CommentAdder
            article_id={article_id}
            addComment={this.addComment}
            loggedInUser={loggedInUser}
          />
          {comments.map(comment => {
            return (
              <CommentCard
                key={comment.comment_id}
                comment={comment}
                deleteComment={this.deleteComment}
                loggedInUser={loggedInUser}
              />
            );
          })}
          <Pagination
            p={p}
            total_count={total_count}
            changePage={this.changePage}
          />
        </section>
      );
    }
  }

  componentDidMount() {
    this.fetchComments();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.p !== this.state.p) {
      this.fetchComments();
    }
  }

  fetchComments = () => {
    api
      .getCommentsByArticle(this.props.article_id, this.state.p)
      .then(({ comments, total_count }) => {
        this.setState({ comments, total_count, isLoading: false });
      });
  };

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

  addComment = body => {
    api
      .postComment(this.props.article_id, 'weegembump', body)
      .then(newComment => {
        this.setState(currentState => {
          const newComments = [newComment, ...currentState.comments];
          newComments.pop();
          return { comments: newComments };
        });
      });
  };

  deleteComment = event => {
    const comment_id = event.target.id;
    if (window.confirm('are you sure you want to delete this comment?')) {
      api
        .deleteComment(comment_id)
        .then(() => {
          this.setState(currentState => {
            const newComments = currentState.comments.filter(
              comment => comment.comment_id !== parseInt(comment_id)
            );
            return {
              comments: newComments,
              total_count: currentState.total_count - 1
            };
          });
        })
        .catch(console.log);
    }
  };
}

export default Comments;
