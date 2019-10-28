import React from 'react';
import './App.css';
import Header from './Components/Header';
import { Router } from '@reach/router';
import ArticleList from './Components/ArticleList';

function App() {
  return (
    <>
      <Header />
      <Router>
        <ArticleList path="/" />
      </Router>
    </>
  );
}

export default App;
