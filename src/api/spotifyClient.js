// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = '1POdFZRZbvb...qqillRxMr2z';

export async function fetchWebApi(endpoint, method, body) {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
  };
  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }
  const res = await fetch(`https://api.spotify.com/${endpoint}`, options);
  if (!res.ok) {
    throw new Error(`Spotify API error: ${res.status}`);
  }
  return await res.json();
}

export async function getTopTracks() {
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
  )).items;
}

export const getMe = (token) => fetchWebApi('me', token);