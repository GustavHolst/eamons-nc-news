import React from 'react';
import { Link } from '@reach/router';

function ArticleHeader({ article }) {
  return (
    <section className="article-header">
      <h2 className="article-author">
        Author:{' '}
        <Link to={`/users/${article.author}`}>
          <b className="link" id="article-author">
            {' '}
            {article.author}
          </b>
        </Link>
      </h2>

      <h3 className="article-posted-on">
        Posted on: {article.created_at.slice(0, 10)}
      </h3>
      <p>
        from:{' '}
        <Link to={`/articles/topics/${article.topic}`}>
          <b className="link">
            {' '}
            {article.topic[0].toUpperCase() + article.topic.slice(1)}
          </b>
        </Link>
      </p>
    </section>
  );
}

export default ArticleHeader;
