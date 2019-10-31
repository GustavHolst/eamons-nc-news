import React from 'react';

function ErrorPage({ err }) {
  return (
    <main>
      {err ? (
        <>
          <h2>Error</h2>
          <h3>{err.status}</h3>
          <h3>
            <span role="img" aria-label="skull and crossbones">
              ☠️
            </span>
            {err.msg}
            <span role="img" aria-label="skull and crossbones">
              ☠️
            </span>
          </h3>
        </>
      ) : (
        <>
          <h2>Error</h2>
          <h3>404</h3>
          <h3>
            <span role="img" aria-label="skull and crossbones">
              ☠️
            </span>{' '}
            Page not found{' '}
            <span role="img" aria-label="skull and crossbones">
              ☠️
            </span>
          </h3>
        </>
      )}
    </main>
  );
}

export default ErrorPage;
