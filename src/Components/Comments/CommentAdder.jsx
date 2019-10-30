import React, { Component } from 'react';

class CommentAdder extends Component {
  state = {
    comment_body: ''
  };

  render() {
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
