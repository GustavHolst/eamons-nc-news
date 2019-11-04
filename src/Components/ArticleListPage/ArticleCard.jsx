import React from 'react';
import { Link } from '@reach/router';
import Voter from '../Voter';

function ArticleCard({ article, users, requestDeleteArticle, loggedInUser }) {
  const authorAvatar = users.filter(user => user.username === article.author)[0]
    .avatar_url;

  return (
    <li className="article-card">
      <div className="article-card-author-container">
        <img
          className="article-card-author-img"
          src={authorAvatar}
          alt="article author avatar"
        />
        <Link
          className="article-card-posted-by"
          to={`/users/${article.author}`}
        >
          <p className="link">{article.author}</p>
        </Link>
        <p className="article-card-posted-on">
          {article.created_at.slice(0, 10)}
        </p>
      </div>
      <h2 className="article-card-title">
        <Link to={`/articles/${article.article_id}`}>
          <p className="link">{article.title}</p>
        </Link>
      </h2>
      <div className="article-card-votes-container">
        <Voter
          item_id={article.article_id}
          voteOn="Article"
          votes={article.votes}
          loggedInUser={loggedInUser}
        />
      </div>
      <div className="article-card-comments-container">
        <p className="article-card-comments">
          <span role="img" aria-label="comments">
            💬
          </span>
          : {article.comment_count}
        </p>
      </div>
      <div className="article-card-topic">
        <p>
          from:{' '}
          <Link to={`/articles/topics/${article.topic}`}>
            <b className="link">
              {article.topic[0].toUpperCase() + article.topic.slice(1)}
            </b>
          </Link>
        </p>
      </div>
      <div className="delete-article-container">
        {loggedInUser.username === article.author ? (
          <button
            className="delete-button"
            id={article.article_id}
            onClick={requestDeleteArticle}
          >
            Delete
          </button>
        ) : null}
      </div>
    </li>
  );
}

export default ArticleCard;
