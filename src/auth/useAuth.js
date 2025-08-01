import { useCallback, useEffect, useState } from 'react';
import { generateRandomString, createCodeChallenge } from './pkce';
import { buildAuthorizeUrl } from './spotify';
import { REDIRECT_URI, SPOTIFY_CLIENT_ID } from '../config';
import { memory, storage } from '../utils/storage';

const TOKEN_KEY = 'spotify_access_token';
const REFRESH_KEY = 'spotify_refresh_token';
const EXPIRES_AT_KEY = 'spotify_expires_at';
const STATE_KEY = 'oauth_state';
const VERIFIER_KEY = 'pkce_code_verifier';

export function useAuth() {
  const [token, setToken] = useState(() => memory.accessToken || storage.get(TOKEN_KEY));

  const startLogin = useCallback(async () => {
    const state = generateRandomString(16);
    const codeVerifier = generateRandomString(64);

    storage.set(STATE_KEY, state);
    storage.set(VERIFIER_KEY, codeVerifier);

    const codeChallenge = await createCodeChallenge(codeVerifier);
    window.location.assign(buildAuthorizeUrl({ codeChallenge, state }));
  }, []);

  const handleCallback = useCallback(async () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const stateReturned = params.get('state');
    const expectedState = storage.get(STATE_KEY);

    if (!code || stateReturned !== expectedState) throw new Error('Invalid state or code');

    const codeVerifier = storage.get(VERIFIER_KEY);

    const url = "https://accounts.spotify.com/api/token";
    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        client_id: SPOTIFY_CLIENT_ID,
        code_verifier: codeVerifier
      }),
    }
    
    const body = await fetch(url, payload);

    if (body.ok) {
      const url = new URL(window.location.href);
      url.searchParams.delete('code');
      url.searchParams.delete('state');
      window.history.replaceState({}, document.title, url.pathname + url.search);
    } else {
      // Optional: try backend instead if CORS fails (API_BASE_URL + '/spotify-token')
      throw new Error('Token exchange failed');
    }

    const data = await body.json();
    const expiresAt = Date.now() + data.expires_in * 1000;

    memory.accessToken = data.access_token;
    memory.expiresAt = expiresAt;
    storage.set(TOKEN_KEY, data.access_token);
    if (data.refresh_token) storage.set(REFRESH_KEY, data.refresh_token);
    storage.set(EXPIRES_AT_KEY, String(expiresAt));

    storage.remove(STATE_KEY);
    storage.remove(VERIFIER_KEY);

    setToken(data.access_token);
    return data;
  }, []);

  const refresh = useCallback(async () => {
    const refreshToken = storage.get(REFRESH_KEY);
    if (!refreshToken) return null;

    // Browser->Spotify (PKCE refresh)
    const body = new URLSearchParams({
      client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    });

    const r = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body
    });
    if (!r.ok) return null;

    const data = await r.json();
    const expiresAt = Date.now() + data.expires_in * 1000;

    memory.accessToken = data.access_token;
    memory.expiresAt = expiresAt;
    storage.set(TOKEN_KEY, data.access_token);
    if (data.refresh_token) storage.set(REFRESH_KEY, data.refresh_token);
    storage.set(EXPIRES_AT_KEY, String(expiresAt));
    setToken(data.access_token);
    return data;
  }, []);

  useEffect(() => {
    const exp = Number(storage.get(EXPIRES_AT_KEY) || 0);
    if (exp && Date.now() > exp - 60_000) { refresh(); }
  }, [refresh]);

  return { token, startLogin, handleCallback, refresh };
}
