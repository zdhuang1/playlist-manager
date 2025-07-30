// Prefer in-memory for access token; sessionStorage as a fallback.
export const memory = { accessToken: null, expiresAt: null };

export const storage = {
  set(k, v) { sessionStorage.setItem(k, v); },
  get(k) { return sessionStorage.getItem(k); },
  remove(k) { sessionStorage.removeItem(k); }
};
