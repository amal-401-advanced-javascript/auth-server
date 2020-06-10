// from GH docs Request a user's GitHub identity
const URL = 'https://github.com/login/oauth/authorize';
// needed query string
const options = {
  client_id: '63ea3078180e891126d5',//required!!
  redirect: 'http://localhost:3000/auth',
  scope: 'read:user',
  state: 'oauthstate',
};
// converting the obj to string and formatting the resulting string
const queryString = Object.keys(options)
  .map((key) => {
    return `${key}=${encodeURIComponent(options[key])}`;
  })
  .join('&');
// making the full url
const authUrl = `${URL}?${queryString}`;
const link = document.getElementById('oauth');
link.setAttribute('href', authUrl);
