import React from 'react';
import { Link } from '@reach/router';
import Voter from '../Voter';

function ArticleCard({ article, users }) {
  const authorAvatar = users.filter(user => user.username === article.author)[0]
    .avatar_url;
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  return (
    <li
      className={
        loggedInUser.username === article.author
          ? 'logged-in-users-article-card'
          : 'article-card'
      }
    >
      <div className="article-card-author-container">
        <img
          className="article-card-author-img"
          src={authorAvatar}
          alt="article author avatar"
        />
        <p>
          <Link to={`/users/${article.author}`}>
            <i>{article.author}</i>
          </Link>
        </p>
      </div>

      <p className="article-card-topic">
        from:{' '}
        <Link to={`/articles/topics/${article.topic}`}>
          <i>{article.topic[0].toUpperCase() + article.topic.slice(1)}</i>
        </Link>
      </p>
      <h2 className="article-card-title">
        <Link to={`/articles/${article.article_id}`}>
          <i>{article.title}</i>
        </Link>
      </h2>
      <p className="article-card-posted-on">
        Posted on {article.created_at.slice(0, 10)}
      </p>
      <p className="comments">Comments: {article.comment_count}</p>
      <div className="article-card-voter-container">
        <Voter
          item_id={article.article_id}
          voteOn="Article"
          votes={article.votes}
        />
      </div>
    </li>
  );
}

export default ArticleCard;
