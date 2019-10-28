import React, { Component } from 'react';
import ArticleCard from './ArticleCard';
import * as api from '../api';
import ArticleFilter from './ArticleFilter';
import ArticlesPagination from './ArticlesPagination';

class ArticleList extends Component {
  state = {
    isLoading: true,
    articles: [],
    total_count: 0,
    p: 1
  };

  render() {
    const { articles, p, total_count } = this.state;
    if (this.state.isLoading) {
      return <p>Loading...</p>;
    } else {
      return (
        <main>
          <ArticleFilter />
          <ul>
            {articles.map(article => {
              return (
                <ArticleCard
                  key={article.article_id}
                  article={article}
                  vote={this.vote}
                />
              );
            })}
          </ul>
          <ArticlesPagination
            p={p}
            total_count={total_count}
            changePage={this.changePage}
          />
        </main>
      );
    }
  }

  componentDidMount() {
    api.getArticles(this.state).then(data => {
      this.fetchArticles();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.p !== this.state.p || this.state.trigger) {
      this.fetchArticles();
    }
  }

  fetchArticles = () => {
    api.getArticles(this.state).then(data => {
      const { articles, total_count } = data;
      this.setState({ articles, total_count, isLoading: false });
    });
  };

  vote = event => {
    const [voteDirection, article_id] = event.target.id.split(',');
    const inc_votes = voteDirection === 'upvote' ? 1 : -1;
    api.voteOnArticle(article_id, inc_votes).then(x => {
      this.setState(currentState => {
        const newArticles = currentState.articles.map(article => {
          const currentVotes = article.votes;
          if (article.article_id === parseInt(article_id)) {
            return {
              ...article,
              votes:
                voteDirection === 'upvote' ? currentVotes + 1 : currentVotes - 1
            };
          }
          return { ...article };
        });
        return { articles: newArticles };
      });
    });
  };

  changePage = event => {
    if (event.target.id === 'next-page') {
      this.setState(currentState => {
        const newP = currentState.p + 1;
        return { p: newP };
      });
    } else {
      this.setState(currentState => {
        const newP = currentState.p - 1;
        return { p: newP };
      });
    }
  };
}

export default ArticleList;
