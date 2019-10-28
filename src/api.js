import axios from 'axios';

const request = axios.create({
  baseURL: 'https://eamons-nc-news.herokuapp.com/api'
});

export const getArticles = ({ p }) => {
  return request
    .get('/articles', { params: { p } })
    .then(({ data }) => data)
    .catch(console.log);
};

export const voteOnArticle = (article_id, inc_votes) => {
  return request
    .patch(`/articles/${article_id}`, { inc_votes })
    .then(({ data: { article } }) => article)
    .catch(console.log);
};

export const getTopics = () => {
  return request
    .get('/topics')
    .then(({ data: { topics } }) => topics)
    .catch(console.log);
};
