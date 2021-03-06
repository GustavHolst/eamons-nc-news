import React from 'react';
import Voter from '../Voter';
import { Link } from '@reach/router';

function CommentCard({ comment, deleteComment, loggedInUser }) {
  const { comment_id, author, body, created_at } = comment;
  return (
    <section className="comment-card">
      <p className="comment-posted">
        Posted by{' '}
        <Link to={`/users/${comment.author}`}>
          <b className="link">{author}</b>{' '}
        </Link>
        on {created_at.slice(0, 10)}
      </p>
      <div className="comment-body">
        <p>{body}</p>
      </div>
      <div className="cc-voter-container">
        <Voter
          item_id={comment.comment_id}
          voteOn="Comment"
          votes={comment.votes}
          loggedInUser={loggedInUser}
        />
      </div>
      {loggedInUser.username === author ? (
        <div className="delete-comment">
          <button
            className="delete-button"
            onClick={deleteComment}
            id={comment_id}
          >
            Delete
          </button>
        </div>
      ) : null}
    </section>
  );
}

export default CommentCard;
