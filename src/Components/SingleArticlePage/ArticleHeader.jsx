import React from 'react';

function ArticleHeader({ article }) {
  return (
    <main>
      <p>Topic: {article.topic}</p>
      <h1>{article.title}</h1>
      <h2>Author: {article.author}</h2>
      <h3>Posted on: {article.created_at.slice(0, 10)}</h3>
    </main>
  );
}

export default ArticleHeader;
