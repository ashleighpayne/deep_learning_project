var SpotifyWebApi = require('spotify-web-api-node');

var scopes = ['user-read-private', 'user-read-email', 'user-modify-playback-state'],
  redirectUri = 'http://www.localhost.com/callback',
  clientId = 'd1918e6d018b4ec3bb0f638d2d88825d',
  state = 'some-state-of-my-choice';

  var spotifyApi = new SpotifyWebApi({
    redirectUri: redirectUri,
    clientId: clientId,
    clientSecret: 2423f57f56a14c81b876ef6adbed95d2
  });

  var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
