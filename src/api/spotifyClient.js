import { API_BASE_URL } from "../config"

export async function fetchWebApi(endpoint, method, token, body) {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
  };
  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }
  const res = await fetch(`${API_BASE_URL}/${endpoint}`, options);
  if (!res.ok) {
    throw new Error(`Spotify API error: ${res.status}`);
  }
  return await res.json();
}

export const getProfile = (token) => fetchWebApi('v1/me', 'GET', token);

export const getUserPlaylists = (token, userId) => {
  fetchWebApi(`v1/users/${userId}/playlists`, 'GET', token)
};
