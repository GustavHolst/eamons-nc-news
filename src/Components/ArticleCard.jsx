import React from 'react';

function ArticleCard({ article, vote }) {
  return (
    <li className="article-card">
      <p className="topic">{article.topic}</p>
      <p className="title">
        "{article.title}" by {article.author}
      </p>
      <p className="comments">Comments: {article.comment_count}</p>
      <div className="votes-container">
        <p className="votes">Votes: {article.votes}</p>
        <button onClick={vote} id={`upvote,${article.article_id}`}>
          Upvote
        </button>
        <button onClick={vote} id={`downvote,${article.article_id}`}>
          Downvote
        </button>
      </div>
    </li>
  );
}

export default ArticleCard;
