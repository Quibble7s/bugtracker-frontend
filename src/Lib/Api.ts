import { BASE_URL } from 'src/Constants';
import { Bug, BugPriority, Project } from 'src/Models';

type ErrorResponse = { message: string; status: number };

const GetToken = (): string | null => {
  return localStorage.getItem('token');
};

export const CreateProject = async (params: {
  name: string;
  description: string;
}): Promise<{ project: Project | null; message: string; status: number }> => {
  const token = GetToken();
  try {
    const response = await fetch(`${BASE_URL}/api/v1/project/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });
    //Project created successfuly
    if (response.status === 201) {
      const project = await response.json();
      return {
        project,
        message: 'Project created successfuly.',
        status: response.status,
      };
    }
    //User not found
    if (response.status === 204) {
      const errorData: ErrorResponse = await response.json();
      return {
        project: null,
        message: errorData.message,
        status: errorData.status,
      };
    }
    //Any other error
    return {
      project: null,
      message: (await response.json()).title,
      status: response.status,
    };
  } catch {
    return {
      project: null,
      message: "Couldn't connect with the server.",
      status: 500,
    };
  }
};

export const GetProjects = async (): Promise<Project[]> => {
  const token = GetToken();
  try {
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
  } catch {
    return null!;
  }
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
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/project/${projectID}/join`,
      {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
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
  } catch {
    callBack({ message: "Couldn't reach the server.", status: 500 });
  }
};

export const LeaveProject = async (
  projectID: string,
  callBack: ({ message, status }: { message: string; status: number }) => void,
) => {
  const token = GetToken();
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/project/${projectID}/leave`,
      {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
    //Left project successfuly
    if (response.status === 204) {
      callBack({ message: 'You left the project successfuly.', status: 204 });
      return;
    }
    //User project or member not found.
    if (response.status === 404) {
      const error: ErrorResponse = await response.json();
      callBack({ message: error.message, status: error.status });
    }
    //Any other error
    callBack({
      message: (await response.json()).title,
      status: response.status,
    });
  } catch {
    callBack({ message: "Couldn't reach the server.", status: 500 });
  }
};

export const CreateIssue = async (
  projectID: string,
  {
    description,
    name,
    priority,
  }: { description: string; name: string; priority: BugPriority },
  callBack: ({
    message,
    status,
    issue,
  }: {
    message: string;
    status: number;
    issue: Bug;
  }) => void,
): Promise<void> => {
  const token = GetToken();
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/bug/project/${projectID}/create`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description, name, priority }),
      },
    );
    //Created successfuly.
    if (response.status === 201) {
      const bug: Bug = await response.json();
      callBack({
        message: 'Issue created successfuly.',
        status: 201,
        issue: bug,
      });
    }
    //Not found error.
    if (response.status === 404) {
      const error: ErrorResponse = await response.json();
      callBack({ message: error.message, status: error.status, issue: null! });
    }
    //Any other error.
    callBack({
      message: (await response.json()).title,
      status: response.status,
      issue: null!,
    });
  } catch {
    callBack({
      message: "Couldn't reach the server.",
      status: 500,
      issue: null!,
    });
  }
};

export const UpdateTaskState = async (
  {
    taskID,
    issueID,
    projectID,
    state,
  }: {
    taskID: string;
    issueID: string;
    projectID: string;
    state?: 'pending' | 'inProgress' | 'completed';
  },
  callBack: ({ message, status }: { message: string; status: number }) => void,
) => {
  const token = GetToken();
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/task/${taskID}/project/${projectID}/bug/${issueID}/state`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ state }),
      },
    );
    //Successfuly updated task
    if (response.status === 204) {
      callBack({ message: 'Updated task.', status: 204 });
      return;
    }
    if (response.status === 404) {
      const error: ErrorResponse = await response.json();
      callBack({ message: error.message, status: error.status });
      return;
    }
    //any other error
    callBack({
      message: (await response.json()).title,
      status: response.status,
    });
  } catch (error) {
    callBack({ message: "Coudn't reach the server.", status: 500 });
  }
};

export const UpdateTaskDescription = async (
  {
    taskID,
    issueID,
    projectID,
    description,
  }: {
    taskID: string;
    issueID: string;
    projectID: string;
    description?: string;
  },
  callBack: ({ message, status }: { message: string; status: number }) => void,
) => {
  const token = GetToken();
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/task/${taskID}/project/${projectID}/bug/${issueID}/description`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ description }),
      },
    );
    //Successfuly updated task
    if (response.status === 204) {
      callBack({ message: 'Updated task.', status: 204 });
      return;
    }
    if (response.status === 404) {
      const error: ErrorResponse = await response.json();
      callBack({ message: error.message, status: error.status });
      return;
    }
    //any other error
    callBack({
      message: (await response.json()).title,
      status: response.status,
    });
  } catch (error) {
    callBack({ message: "Coudn't reach the server.", status: 500 });
  }
};
