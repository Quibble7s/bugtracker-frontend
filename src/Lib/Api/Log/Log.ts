import { BASE_URL } from 'src/Constants';
import { LogMessages } from 'src/Models';
import { ErrorResponse } from '../ErrorResponse';
import { GetToken } from '../Token';

export const GetMessages = async (
  id: string,
  page: number,
  perPage: number,
  callBack: ({
    message,
    status,
    total,
    messages,
  }: {
    message: string;
    status: number;
    total: number;
    messages: LogMessages[];
  }) => void,
) => {
  const token = GetToken();
  try {
    const response = await fetch(`${BASE_URL}/api/v1/log/${id}/messages`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    //Ok
    if (response.status === 200) {
      const data: { total: number; messages: LogMessages[] } =
        await response.json();
      callBack({
        message: 'Ok',
        status: 200,
        total: data.total,
        messages: data.messages,
      });
      return;
    }
    //Unauthorized
    if (response.status === 401) {
      callBack({
        message: 'Session expired, please login.',
        status: 401,
        total: 0,
        messages: null!,
      });
      return;
    }
    //Any other error
    const error = await response.json();
    callBack({
      message: error.title,
      status: response.status,
      total: 0,
      messages: null!,
    });
  } catch (error) {
    callBack({
      message: "Couldn't reach the server.",
      status: 500,
      total: 0,
      messages: null!,
    });
  }
};
