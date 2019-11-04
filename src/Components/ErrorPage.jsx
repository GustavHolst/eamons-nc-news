import React from 'react';

function ErrorPage({ err }) {
  return (
    <main className="error-page">
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
    </main>
  );
}

export default ErrorPage;
