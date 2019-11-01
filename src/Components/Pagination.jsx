import React from 'react';

function ArticlesPagination({ p, total_count, changePage }) {
  return (
    <section className="pagination">
      {p === 1 ? (
        <button className="pagination-button" disabled>
          Previous Page
        </button>
      ) : (
        <button
          className="pagination-button"
          onClick={changePage}
          id="prev-page"
        >
          Previous Page
        </button>
      )}
      <p>
        Showing {10 * (p - 1) + 1} to{' '}
        {p >= Math.ceil(total_count / 10) ? <i>end</i> : 10 * (p - 1) + 10} of{' '}
        {total_count}
      </p>

      {p >= Math.ceil(total_count / 10) ? (
        <button className="pagination-button" disabled>
          Next Page
        </button>
      ) : (
        <button
          className="pagination-button"
          onClick={changePage}
          id="next-page"
        >
          Next Page
        </button>
      )}
    </section>
  );
}

export default ArticlesPagination;
