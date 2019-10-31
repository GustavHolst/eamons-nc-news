import React, { Component } from 'react';
import ArticleCard from './ArticleCard';
import * as api from '../../api';
import ArticleFilterAndSort from './ArticleFilterAndSort';
import Pagination from '../Pagination';
import ArticleAdder from './ArticleAdder';

class ArticleList extends Component {
  state = {
    isLoading: true,
    articles: [],
    total_count: 0,
    p: 1,
    topics: [],
    topic: 'all',
    sort_by: 'created_at',
    order: 'desc',
    showArticleAdder: false
  };

  render() {
    const {
      articles,
      p,
      total_count,
      topics,
      isLoading,
      topic,
      showArticleAdder
    } = this.state;
    const { loggedInUser } = this.props;

    if (isLoading) {
      return <p>Loading...</p>;
    } else {
      return (
        <main className="articles-page">
          <ArticleFilterAndSort
            topics={topics}
            updateTopic={this.updateTopic}
            updateSortBy={this.updateSortBy}
            updateOrderBy={this.updateOrderBy}
            topic={topic}
          />
          {loggedInUser.username === 'guest' ? (
            <p className>Log in to post your own article</p>
          ) : (
            <button
              className="post-article-button"
              onClick={this.toggleShowArticleAdder}
            >
              {showArticleAdder ? 'Close' : 'Post your own article'}
            </button>
          )}
          {showArticleAdder ? (
            <ArticleAdder
              topics={topics}
              submitArticle={this.submitArticle}
              toggleShowTopicAdder={this.toggleShowTopicAdder}
              addNewTopic={this.addNewTopic}
            />
          ) : null}
          <ul className="article-cards-container">
            {articles.map(article => {
              return (
                <ArticleCard
                  key={article.article_id}
                  article={article}
                  users={this.props.users}
                  requestDeleteArticle={this.requestDeleteArticle}
                  loggedInUser={loggedInUser}
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

  toggleShowArticleAdder = () => {
    this.setState(currentState => {
      if (
        currentState.showArticleAdder &&
        window.confirm(
          'are you sure you to close? Any draft articles will be lost'
        )
      ) {
        return { showArticleAdder: !currentState.showArticleAdder };
      }
      return { showArticleAdder: !currentState.showArticleAdder };
    });
  };

  submitArticle = (title, body, topic) => {
    const { loggedInUser } = this.props;
    api
      .postArticle({
        title,
        body,
        topic,
        author: loggedInUser.username
      })
      .then(article => {
        this.setState(currentState => {
          const newArticles = [article, ...currentState.articles];
          newArticles.pop();
          return { articles: newArticles };
        });
      })
      .catch(console.log);
  };

  requestDeleteArticle = event => {
    const article_id = parseInt(event.target.id);
    if (
      window.confirm(
        'are you sure you want to delete this article and all of its comments?'
      )
    ) {
      api
        .deleteArticle(article_id)
        .then(() => {
          this.setState(currentState => {
            const newarticles = currentState.articles.filter(
              article => article.article_id !== article_id
            );
            return {
              articles: newarticles,
              total_count: currentState.total_count - 1
            };
          });
        })
        .catch(console.dir);
    }
  };
}

export default ArticleList;
