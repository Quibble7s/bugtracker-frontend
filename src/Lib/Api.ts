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

export const GetProject = async (projectID: string): Promise<Project> => {
  const token = GetToken();
  const response = await fetch(`${BASE_URL}/api/v1/project/${projectID}`, {
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

export const JoinProject = async (
  projectID: string,
  callBack: ({ message, status }: { message: string; status: number }) => void,
): Promise<void> => {
  const token = GetToken();
  const response = await fetch(`${BASE_URL}/api/v1/project/${projectID}/join`, {
    method: 'PUT',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 204) {
    callBack({ message: 'Successfuly joined project.', status: 204 });
    return;
  }
  if (response.status === 404) {
    const responseData = await response.json();
    callBack({ message: responseData.message, status: 404 });
    return;
  }
  //If there is a server error or unauthorized
  const responseData = await response.json();
  callBack({ message: responseData.title, status: response.status });
};
