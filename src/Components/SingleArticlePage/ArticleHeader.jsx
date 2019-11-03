import React from 'react';
import { Link } from '@reach/router';

function ArticleHeader({ article }) {
  return (
    <section className="article-header">
      <h2 className="article-author">
        Author:{' '}
        <Link to={`/users/${article.author}`}>
          <p> {article.author}</p>
        </Link>
      </h2>

      <h3 className="article-posted-on">
        Posted on: {article.created_at.slice(0, 10)}
      </h3>
      <p className="article-header-container">
        from:{' '}
        <Link to={`/articles/topics/${article.topic}`}>
          <p> {article.topic[0].toUpperCase() + article.topic.slice(1)}</p>
        </Link>
      </p>
    </section>
  );
}

export default ArticleHeader;
