const ONE_DAY_MS = 1000 * 60 * 60 * 24;

export function setExpiring(key: string, value: string, ttl = ONE_DAY_MS) {
  localStorage.setItem(key, JSON.stringify({ value, expiry: Date.now() + ttl }));
}

export function getExpiring(key: string): string | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { value, expiry } = JSON.parse(raw);
    if (Date.now() > expiry) { localStorage.removeItem(key); return null; }
    return value;
  } catch {
    return null;
  }
}
