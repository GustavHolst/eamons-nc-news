import axios from 'axios';

const request = axios.create({
  baseURL: 'https://eamons-nc-news.herokuapp.com/api'
});

export const getArticles = ({ p, topic, sort_by, author, order }) => {
  if (topic === 'all') topic = '';

  return request
    .get('/articles', { params: { p, topic, sort_by, author, order } })
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

export const getCommentsByArticle = (article_id, p, sort_by, order) => {
  return request
    .get(`/articles/${article_id}/comments`, { params: { p, sort_by, order } })
    .then(({ data }) => data);
};

export const postComment = (article_id, username, body) => {
  return request
    .post(`/articles/${article_id}/comments`, { username, body })
    .then(({ data: { comment } }) => comment);
};

export const getUsers = () => {
  return request.get(`/users`).then(({ data: { users } }) => users);
};

export const deleteComment = comment_id => {
  return request.delete(`/comments/${comment_id}`).then(({ data }) => data);
};

export const postArticle = body => {
  return request
    .post('/articles', body)
    .then(({ data: { article } }) => article);
};

export const deleteArticle = article_id => {
  return request.delete(`/articles/${article_id}`).then(({ data }) => data);
};

export const postTopic = (slug, description) => {
  return request
    .post('/topics', { slug, description })
    .then(({ data: { topic } }) => topic);
};
