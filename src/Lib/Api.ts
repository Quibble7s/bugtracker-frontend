import { BASE_URL } from 'src/Constants';
import { Bug, BugPriority, Project, Task } from 'src/Models';

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
    if (response.status === 404) {
      const errorData: ErrorResponse = await response.json();
      return {
        project: null,
        message: errorData.message,
        status: errorData.status,
      };
    }
    //Unauthorized
    if (response.status === 401) {
      return {
        project: null,
        message: 'Session expired, please login.',
        status: 401,
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

export const GetProjects = async (
  callBack: ({ message, status }: { message: string; status: number }) => void,
): Promise<Project[]> => {
  const token = GetToken();
  try {
    const response = await fetch(`${BASE_URL}/api/v1/project/all`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    //Success
    if (response.status === 200) {
      callBack({ message: 'Ok', status: 200 });
      return await response.json();
    }
    //Unauthorized
    if (response.status === 401) {
      callBack({ message: 'Unauthorized', status: 401 });
      return null!;
    }
    //User not found
    if (response.status === 404) {
      const error: ErrorResponse = await response.json();
      callBack({ message: error.message, status: error.status });
      return null!;
    }
    //Any other error
    callBack({
      message: (await response.json()).title,
      status: response.status,
    });
    return null!;
  } catch {
    callBack({ message: "Cound't reach the server.", status: 500 });
    return null!;
  }
};

export const GetProject = async (
  projectID: string,
  callBack: ({ message, status }: { message: string; status: number }) => void,
): Promise<Project> => {
  const token = GetToken();
  try {
    const response = await fetch(`${BASE_URL}/api/v1/project/${projectID}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    //Success
    if (response.status === 200) {
      callBack({ message: 'Ok', status: 200 });
      return await response.json();
    }
    //Unauthorized
    if (response.status === 401) {
      callBack({ message: 'Unauthorized', status: 401 });
      return null!;
    }
    //User not found
    if (response.status === 404) {
      const error: ErrorResponse = await response.json();
      callBack({ message: error.message, status: error.status });
      return null!;
    }
    //Any other error
    callBack({
      message: (await response.json()).title,
      status: response.status,
    });
    return null!;
  } catch {
    return null!;
  }
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
    //Ok
    if (response.status === 204) {
      callBack({ message: 'Successfuly joined project.', status: 204 });
      return;
    }
    //Not found
    if (response.status === 404) {
      const error: ErrorResponse = await response.json();
      callBack({ message: error.message, status: error.status });
      return;
    }
    //Unauthorized
    if (response.status === 401) {
      callBack({ message: 'Unauthorized', status: 401 });
      return;
    }
    //Any other error
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
    //Unauthorized
    if (response.status === 401) {
      callBack({ message: 'Unauthorized', status: 401 });
      return;
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
    //Unauthorized
    if (response.status === 401) {
      callBack({ message: 'Unauthorized', status: 401, issue: null! });
      return null!;
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

export const DeleteIssue = async (
  issueID: string,
  projectID: string,
  callBack: ({ message, status }: { message: string; status: number }) => void,
): Promise<void> => {
  const token = GetToken();
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/bug/${issueID}/project/${projectID}/delete`,
      { method: 'DELETE', headers: { authorization: `Bearer ${token}` } },
    );
    //Issue deleted successfuly
    if (response.status === 204) {
      callBack({ message: 'Issue successfuly deleted.', status: 204 });
      return;
    }
    //Any 404
    if (response.status === 404) {
      const error: ErrorResponse = await response.json();
      callBack({ message: error.message, status: error.status });
      return;
    }
    //Unauthorized
    if (response.status === 401) {
      callBack({ message: 'Unauthorized', status: 401 });
      return null!;
    }
    //Any other error
    callBack({
      message: (await response.json()).title,
      status: response.status,
    });
  } catch {
    callBack({ message: "Coudn't reach the server.", status: 500 });
  }
};

export const CreateTask = async (
  data: { description: string },
  projectID: string,
  bugID: string,
  callBack: ({
    message,
    status,
    task,
  }: {
    message: string;
    status: number;
    task: Task;
  }) => void,
): Promise<void> => {
  const token = GetToken();
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/task/project/${projectID}/bug/${bugID}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      },
    );
    //Successfuly created
    if (response.status === 201) {
      const createdTask: Task = await response.json();
      callBack({
        message: 'Task successfuly added.',
        status: 201,
        task: createdTask,
      });
      return;
    }
    //Unauthorized
    if (response.status === 401) {
      callBack({ message: 'Unauthorized', status: 401, task: null! });
      return null!;
    }
    //Any 404 error
    if (response.status === 404) {
      const error: ErrorResponse = await response.json();
      callBack({ message: error.message, status: error.status, task: null! });
      return;
    }
    //Any other error
    const error = await response.json();
    callBack({ message: error.title, status: response.status, task: null! });
  } catch {
    callBack({
      message: "Coundn't reach the server.",
      status: 500,
      task: null!,
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
    //Unauthorized
    if (response.status === 401) {
      callBack({ message: 'Unauthorized', status: 401 });
      return null!;
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
    //Any not found
    if (response.status === 404) {
      const error: ErrorResponse = await response.json();
      callBack({ message: error.message, status: error.status });
      return;
    }
    //Unauthorized
    if (response.status === 401) {
      callBack({ message: 'Unauthorized', status: 401 });
      return null!;
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

export const DeleteTask = async (
  {
    taskID,
    issueID,
    projectID,
  }: {
    taskID: string;
    issueID: string;
    projectID: string;
  },
  callBack: ({ message, status }: { message: string; status: number }) => void,
) => {
  const token = GetToken();
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/task/${taskID}/project/${projectID}/bug/${issueID}/delete`,
      { method: 'DELETE', headers: { authorization: `Bearer ${token}` } },
    );
    //Successfuly deleted.
    if (response.status === 204) {
      callBack({ message: 'Task successfuly deleted.', status: 204 });
      return;
    }
    //Any 404
    if (response.status === 404) {
      const error: ErrorResponse = await response.json();
      callBack({ message: error.message, status: error.status });
      return;
    }
    //Unauthorized
    if (response.status === 401) {
      callBack({ message: 'Unauthorized', status: 401 });
      return null!;
    }
    //Any other error
    const error = await response.json();
    callBack({ message: error.title, status: response.status });
  } catch {
    callBack({ message: "Couldn't reach the server.", status: 500 });
  }
};
