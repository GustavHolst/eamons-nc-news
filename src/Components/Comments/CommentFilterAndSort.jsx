import React from 'react';

function CommentFilterAndSort({ changeSortBy, changeOrder }) {
  const handleSortByChange = event => {
    changeSortBy(event.target.value);
  };
  const handleOrderChange = event => {
    changeOrder(event.target.value);
  };

  return (
    <form>
      <label>
        Sort by:{' '}
        <select onChange={handleSortByChange}>
          <option value="created_at">Date Posted</option>
          <option value="votes">Number of Votes</option>
        </select>
      </label>
      <label>
        Order:{' '}
        <select onChange={handleOrderChange}>
          <option value="desc">High > Low</option>
          <option value="asc">Low > High</option>
        </select>
      </label>
    </form>
  );
}

export default CommentFilterAndSort;
