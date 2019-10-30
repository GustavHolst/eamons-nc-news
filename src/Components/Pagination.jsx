import React from 'react';

function ArticlesPagination({ p, total_count, changePage }) {
  return (
    <div>
      {p === 1 ? (
        <button disabled>Previous Page</button>
      ) : (
        <button onClick={changePage} id="prev-page">
          Previous Page
        </button>
      )}
      <i>
        Showing {10 * (p - 1) + 1} to{' '}
        {p >= Math.ceil(total_count / 10) ? <i>end</i> : 10 * (p - 1) + 10} of{' '}
        {total_count}
      </i>

      {p >= Math.ceil(total_count / 10) ? (
        <button disabled>Next Page</button>
      ) : (
        <button onClick={changePage} id="next-page">
          Next Page
        </button>
      )}
    </div>
  );
}

export default ArticlesPagination;
