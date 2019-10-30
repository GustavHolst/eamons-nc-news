import React from 'react';
import { Link } from '@reach/router';

function ArticleCard({ article, vote }) {
  return (
    <li className="article-card">
      <p className="topic">{article.topic}</p>
      <p className="title">
        "
        <Link to={`/articles/${article.article_id}`}>
          <i>{article.title}</i>
        </Link>
        " by{' '}
        <Link to={`/users/${article.author}`}>
          <i>{article.author}</i>
        </Link>{' '}
        on {article.created_at.slice(0, 10)}
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
