export default async function handler(req, res) {
  const { refresh_token, client_id } = req.body || {};
  const body = new URLSearchParams({
    client_id, grant_type: 'refresh_token', refresh_token
  });
  const r = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body
  });
  const data = await r.json();
  res.status(r.ok ? 200 : r.status).json(data);
}
