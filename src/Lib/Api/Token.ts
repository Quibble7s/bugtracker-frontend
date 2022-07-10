export const GetToken = (): string | null => {
  return localStorage.getItem('token');
};
