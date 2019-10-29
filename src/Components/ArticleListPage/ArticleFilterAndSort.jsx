import React from 'react';

function ArticleFilterAndSort({ topics, updateSelectedTopic, updateSortBy }) {
  const handleTopicChange = event => {
    updateSelectedTopic(event.target.value);
  };

  const handleSortChange = event => {
    updateSortBy(event.target.value);
  };

  return (
    <form>
      <label>
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
      <label>
        Sort by:{' '}
        <select onChange={handleSortChange}>
          <option value="date-created">Date Posted</option>
          <option value="comment_count">Number of Comments</option>
          <option value="votes">Votes</option>
        </select>
      </label>
    </form>
  );
}

export default ArticleFilterAndSort;
