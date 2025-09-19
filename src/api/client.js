const BASE = '/api';

function toQuery(params = {}) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === '') return;
    if (Array.isArray(v)) q.set(k, v.join(','));
    else q.set(k, String(v));
  });
  return q.toString() ? `?${q.toString()}` : '';
}

export async function get(path, params) {
  const res = await fetch(`${BASE}${path}${toQuery(params)}`);
  if (!res.ok) throw new Error(`GET ${path} failed`);
  return res.json();
}

export async function post(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`POST ${path} failed`);
  return res.json();
}
