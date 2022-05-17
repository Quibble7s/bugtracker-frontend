import { BASE_URL } from 'src/Constants';
import { Project } from 'src/Models';

const GetToken = (): string | null => {
  return localStorage.getItem('token');
};

export const GetProjects = async (): Promise<Project[]> => {
  const token = GetToken();
  const response = await fetch(`${BASE_URL}/api/v1/project/all`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    return await response.json();
  }
  return null!;
};
