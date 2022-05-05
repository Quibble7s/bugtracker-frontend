export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://bugtracker-api-version1.herokuapp.com'
    : 'https://localhost:44362';
