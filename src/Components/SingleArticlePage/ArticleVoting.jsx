import React from 'react';

function ArticleVoting({ article, voter }) {
  return (
    <div>
      <p>Votes: {article.votes}</p>
      <button onClick={voter}>Upvote</button>
      <button onClick={voter}>Downvote</button>
    </div>
  );
}

export default ArticleVoting;
