import React from 'react';
import { Link } from '@reach/router';
import Voter from '../Voter';

function ArticleCard({ article, users, requestDeleteArticle, loggedInUser }) {
  const authorAvatar = users.filter(user => user.username === article.author)[0]
    .avatar_url;

  return (
    <li
      className={
        loggedInUser.username === article.author
          ? 'LIU-article-card'
          : 'article-card'
      }
    >
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
          <p>{article.author}</p>
        </Link>

        <p className="article-card-posted-on">
          {article.created_at.slice(0, 10)}
        </p>
      </div>

      <h2 className="article-card-title">
        <Link to={`/articles/${article.article_id}`}>
          <p>{article.title}</p>
        </Link>
      </h2>
      <div className="article-card-votes-and-comms-container">
        <Voter
          item_id={article.article_id}
          voteOn="Article"
          votes={article.votes}
          loggedInUser={loggedInUser}
        />
        <p className="comments">Comments: {article.comment_count}</p>
      </div>
      <div className="article-card-topic-and-delete">
        <p className="article-card-topic">
          from:{' '}
          <Link to={`/articles/topics/${article.topic}`}>
            <i>{article.topic[0].toUpperCase() + article.topic.slice(1)}</i>
          </Link>
        </p>
      </div>
      <div className="delete-article-container">
        {loggedInUser.username === article.author ? (
          <button
            className="delete-article"
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
