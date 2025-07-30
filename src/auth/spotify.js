import { SPOTIFY_CLIENT_ID, SPOTIFY_SCOPES, REDIRECT_URI } from '../config';

export function buildAuthorizeUrl({ codeChallenge, state }) {
  const params = new URLSearchParams({
    client_id: SPOTIFY_CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: SPOTIFY_SCOPES,
    state,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge
  });
  return `https://accounts.spotify.com/authorize?${params.toString()}`;
}
