export default async function handler(req, res) {
  const { code, code_verifier, redirect_uri, client_id } = req.body || {};
  const body = new URLSearchParams({
    client_id, grant_type: 'authorization_code', code, redirect_uri, code_verifier
  });
  const r = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body
  });
  const data = await r.json();
  res.status(r.ok ? 200 : r.status).json(data);
}
