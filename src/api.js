import axios from 'axios';

const request = axios.create({
  baseURL: 'https://eamons-nc-news.herokuapp.com/api'
});

export const getArticles = ({ p, selectedTopic, sort_by }) => {
  if (selectedTopic === 'all') selectedTopic = '';
  return request
    .get('/articles', { params: { p, topic: selectedTopic, sort_by } })
    .then(({ data }) => data);
};

export const getArticle = article_id => {
  return request
    .get(`/articles/${article_id}`)
    .then(({ data: { article } }) => article);
};

export const voteOnArticle = (article_id, inc_votes) => {
  return request
    .patch(`/articles/${article_id}`, { inc_votes })
    .then(({ data: { article } }) => article);
};

export const voteOnComment = (comment_id, inc_votes) => {
  return request
    .patch(`/comments/${comment_id}`, { inc_votes })
    .then(({ data: { comment } }) => comment);
};

export const getTopics = () => {
  return request.get('/topics').then(({ data: { topics } }) => topics);
};

export const getCommentsByArticle = article_id => {
  return request
    .get(`/articles/${article_id}/comments`)
    .then(({ data }) => data);
};
