import React, { Component } from 'react';
import ArticleCard from './ArticleCard';
import * as api from '../../api';
import ArticleFilterAndSort from './ArticleFilterAndSort';
import Pagination from '../Pagination';
import ArticleSort from './ArticleSort';

class ArticleList extends Component {
  state = {
    isLoading: true,
    articles: [],
    total_count: 0,
    p: 1,
    topics: [],
    selectedTopic: 'all',
    sort_by: 'created_at'
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
            updateSelectedTopic={this.updateSelectedTopic}
            updateSortBy={this.updateSortBy}
          />
          <ArticleSort />
          <ul>
            {articles.map(article => {
              return (
                <ArticleCard
                  key={article.article_id}
                  article={article}
                  vote={this.vote}
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
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.p !== this.state.p ||
      prevState.selectedTopic !== this.state.selectedTopic ||
      prevState.sort_by !== this.state.sort_by
    ) {
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
    api.voteOnArticle(article_id, inc_votes).then(() => {
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

  updateSelectedTopic = selectedTopic => {
    this.setState({ selectedTopic });
  };

  updateSortBy = sort_by => {
    this.setState({ sort_by });
  };
}

export default ArticleList;
