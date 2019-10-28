import React, { Component } from 'react';
import * as api from '../api';

class ArticleFilter extends Component {
  state = {
    topics: []
  };

  render() {
    return (
      <form>
        <select></select>
      </form>
    );
  }

  componentDidMount() {
    api.getTopics().then(topics => {
      topics.map(topic => {
        topic.slug = `${topic.slug[0].toUpperCase()}${topic.slug.slice(1)}`;
        return topic;
      });
    });
  }
}

export default ArticleFilter;
