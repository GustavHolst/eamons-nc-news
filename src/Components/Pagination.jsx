import React from 'react';

function ArticlesPagination({ p, total_count, changePage }) {
  return (
    <section className="pagination">
      {p === 1 ? (
        <button className="button" disabled>
          Previous Page
        </button>
      ) : (
        <button className="button" onClick={changePage} id="prev-page">
          Previous Page
        </button>
      )}
      <p className="pagination-text">
        Showing {10 * (p - 1) + 1} to{' '}
        {p >= Math.ceil(total_count / 10) ? <b>end</b> : 10 * (p - 1) + 10} of{' '}
        {total_count}
      </p>

      {p >= Math.ceil(total_count / 10) ? (
        <button className="button" disabled>
          Next Page
        </button>
      ) : (
        <button className="button" onClick={changePage} id="next-page">
          Next Page
        </button>
      )}
    </section>
  );
}

export default ArticlesPagination;
