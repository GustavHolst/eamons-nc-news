import React from 'react';
import { Link } from '@reach/router';

function ArticleHeader({ article }) {
  return (
    <section>
      <p>
        from:{' '}
        <Link to={`/articles/topics/${article.topic}`}>
          <i>{article.topic[0].toUpperCase() + article.topic.slice(1)}</i>
        </Link>
      </p>
      <h1>{article.title}</h1>

      <h2>
        Author:{' '}
        <Link to={`/users/${article.author}`}>
          <i>{article.author}</i>
        </Link>
      </h2>

      <h3>Posted on: {article.created_at.slice(0, 10)}</h3>
    </section>
  );
}

export default ArticleHeader;
