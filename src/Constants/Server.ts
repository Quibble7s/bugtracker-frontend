export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://bugtracker-server-production.up.railway.app'
    : 'https://localhost:44362';
