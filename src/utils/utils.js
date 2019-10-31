export const setUserAsGuest = () => {
  const guest = {
    username: 'guest',
    avatar_url:
      'http://wpuploads.appadvice.com/wp-content/uploads/2014/10/facebookanon.jpg',
    name: 'Guest'
  };
  localStorage.setItem('loggedInUser', JSON.stringify(guest));
  
};
