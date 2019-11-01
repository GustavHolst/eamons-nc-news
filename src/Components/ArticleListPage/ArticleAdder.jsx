import React, { Component } from 'react';

class ArticleAdder extends Component {
  state = {
    title: '',
    body: '',
    topic: '---'
  };

  render() {
    const { topics } = this.props;
    return (
      <form className="article-adder" onSubmit={this.handleSubmit}>
        <label className="post-article-topic-select-label">
          <p className="post-article-label-text">Select a topic: </p>
          <select
            className="post-article-topic-select"
            id="topic"
            onChange={this.handleInputChange}
          >
            <option value="---">---</option>
            {topics.map(topic => {
              if (topic.slug !== 'all') {
                return (
                  <option value={topic.slug} key={topic.slug}>
                    {topic.slug[0].toUpperCase() + topic.slug.slice(1)}
                  </option>
                );
              } else {
                return null;
              }
            })}
          </select>
        </label>
        <label className="post-article-title-label">
          <p className="post-article-label-text">Title: </p>
          <input
            type="text"
            id="title"
            value={this.state.title}
            onChange={this.handleInputChange}
            className="post-article-title"
            required
          />
        </label>
        <label className="post-article-body-label">
          <p className="post-article-label-text">Body: </p>
          <textarea
            type="text"
            id="body"
            className="post-article-body"
            onChange={this.handleInputChange}
            value={this.state.body}
            required
            wrap="soft"
          />
        </label>
        <div className="submit-article-container">
          <button className="submit-article" type="submit">
            Post
          </button>
        </div>
      </form>
    );
  }

  handleSubmit = event => {
    if (this.state.topic === '---') {
      event.preventDefault();
      alert('please select a topic');
    } else {
      event.preventDefault();
      this.props.submitArticle(
        this.state.title,
        this.state.body,
        this.state.topic
      );

      this.setState({
        title: '',
        body: '',
        topic: '---'
      });
    }
  };
  handleInputChange = event => {
    const { value, id } = event.target;
    this.setState({ [id]: value });
  };
}

export default ArticleAdder;
