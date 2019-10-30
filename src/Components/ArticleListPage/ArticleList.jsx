import React, { Component } from 'react';
import ArticleCard from './ArticleCard';
import * as api from '../../api';
import ArticleFilterAndSort from './ArticleFilterAndSort';
import Pagination from '../Pagination';

class ArticleList extends Component {
  state = {
    isLoading: true,
    articles: [],
    total_count: 0,
    p: 1,
    topics: [],
    topic: 'all',
    sort_by: 'created_at',
    order: 'desc'
  };

  render() {
    const { articles, p, total_count, topics, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    } else {
      return (
        <main>
          <ArticleFilterAndSort
            topics={topics}
            updateTopic={this.updateTopic}
            updateSortBy={this.updateSortBy}
            updateOrderBy={this.updateOrderBy}
          />
          <ul className="article-cards-container">
            {articles.map(article => {
              return (
                <ArticleCard
                  key={article.article_id}
                  article={article}
                  deleteArticle={this.deleteArticle}
                />
              );
            })}
          </ul>
          <Pagination
            p={p}
            total_count={total_count}
            changePage={this.changePage}
          />
        </main>
      );
    }
  }

  componentDidMount() {
    this.fetchArticles();
    api.getTopics().then(topics => {
      this.setState({ topics: [{ slug: 'all' }, ...topics] });
    });
    if (this.props.topic) {
      this.setState({ topic: this.props.topic });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.p !== this.state.p ||
      prevState.topic !== this.state.topic ||
      prevState.sort_by !== this.state.sort_by ||
      prevState.order !== this.state.order
    ) {
      this.fetchArticles();
    }
    if (prevProps.topic !== this.props.topic) {
      this.setState({ topic: this.props.topic });
    }
  }

  fetchArticles = () => {
    api.getArticles(this.state).then(data => {
      const { articles, total_count } = data;
      this.setState({ articles, total_count, isLoading: false });
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

  updateTopic = topic => {
    this.setState({ topic });
  };

  updateSortBy = sort_by => {
    this.setState({ sort_by });
  };

  updateOrderBy = order => {
    this.setState({ order });
  };
}

export default ArticleList;
