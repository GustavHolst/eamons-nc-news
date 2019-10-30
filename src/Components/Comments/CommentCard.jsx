import React from 'react';

function CommentCard({ comment, voteOnComment, deleteComment, loggedInUser }) {
  const { comment_id, author, body, created_at, votes } = comment;
  return (
    <section className="comment-card">
      <p className="comment-posted">
        Posted by {author} on {created_at.slice(0, 10)}
      </p>
      <div className="comment-body">
        <p>{body}</p>
      </div>
      <div className="comment-votes-container">
        <p className="number-of-comment-votes">Votes: {votes}</p>
        <span
          role="img"
          aria-label="upvote"
          className="comment-upvote"
          id={`1,${comment_id}`}
          onClick={voteOnComment}
        >
          ⬆️
        </span>
        <span
          role="img"
          aria-label="downvote"
          className="comment-downvote"
          id={`-1,${comment_id}`}
          onClick={voteOnComment}
        >
          ⬇️
        </span>
      </div>
      {loggedInUser.username === author ? (
        <button onClick={deleteComment} id={comment_id}>
          Delete
        </button>
      ) : null}
    </section>
  );
}

export default CommentCard;
