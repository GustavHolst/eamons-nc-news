import React from 'react';
import './App.css';
import Header from './Components/Header';
import { Router } from '@reach/router';
import ArticleList from './Components/ArticleListPage/ArticleList';
import SingleArticlePage from './Components/SingleArticlePage/SingleArticlePage';

function App() {
  return (
    <>
      <Header />
      <Router>
        <ArticleList path="/" />
        <ArticleList path="/articles" />
        <SingleArticlePage path="/articles/:article_id/*" />
      </Router>
    </>
  );
}

export default App;
