import React from 'react';

function ArticleFilterAndSort({
  topics,
  topic,
  updateTopic,
  updateSortBy,
  updateOrderBy
}) {
  const handleTopicChange = event => {
    updateTopic(event.target.value);
  };

  const handleSortChange = event => {
    updateSortBy(event.target.value);
  };

  const handleOrderChange = event => {
    updateOrderBy(event.target.value);
  };

  return (
    <form className="article-filter-and-sort">
      <label className="article-filter-item">
        Filter by topic:{' '}
        <select onChange={handleTopicChange}>
          {topics.map(topic => {
            return (
              <option
                value={topic.slug}
                key={topic.slug}
              >{`${topic.slug[0].toUpperCase()}${topic.slug.slice(1)}`}</option>
            );
          })}
        </select>
      </label>
      <label className="article-filter-item">
        Sort by:{' '}
        <select onChange={handleSortChange}>
          <option value="created_at">Date Posted</option>
          <option value="comment_count">Number of Comments</option>
          <option value="votes">Number of Votes</option>
        </select>
      </label>
      <label className="article-filter-item">
        Order:{' '}
        <select onChange={handleOrderChange}>
          <option value="desc">High > Low</option>
          <option value="asc">Low > High</option>
        </select>
      </label>
    </form>
  );
}

export default ArticleFilterAndSort;
