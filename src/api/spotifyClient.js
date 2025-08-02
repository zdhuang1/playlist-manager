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
  const res = await fetch(`${API_BASE_URL}${endpoint}`, options);
  if (!res.ok) {
    throw new Error(`Spotify API error: ${res.status}`);
  }
  return await res.json();
}

export async function getUserData(token) {
  return fetchWebApi('/me', 'GET', token)
}

export async function getUserPlaylists(token) {
  return fetchWebApi('/me/playlists', 'GET', token);
}

