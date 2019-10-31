import React, { Component } from 'react';
import { Link } from '@reach/router';

class CommentAdder extends Component {
  state = {
    comment_body: ''
  };

  render() {
    const { loggedInUser } = this.props;
    if (loggedInUser.username !== 'guest') {
      return (
        <form id="comment-form" onSubmit={this.handleSubmit}>
          <label>
            Add your comment here:
            <input
              id="comment-body-input"
              type="text"
              value={this.state.comment_body}
              onChange={this.handleCommentChange}
              required
            />
          </label>
          <button type="submit">Post Comment</button>
        </form>
      );
    } else {
      return (
        <p>
          <Link to="/login">
            <i>Log in</i>
          </Link>{' '}
          to get involved in the conversation
        </p>
      );
    }
  }

  handleCommentChange = ({ target: { value } }) => {
    this.setState({ comment_body: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.addComment(this.state.comment_body);
    this.setState({ comment_body: '' });
  };
}

export default CommentAdder;
