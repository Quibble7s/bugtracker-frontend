import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PXS } from 'src/Components/Typography';
import { useAlert, useAuth } from 'src/Hooks';
import { GetMessages } from 'src/Lib';
import { Bug, LogMessages, Project } from 'src/Models';

export const ProjectActivity = ({
  logID,
  dependency,
}: {
  logID: string;
  dependency: Bug | Project;
}) => {
  const [logMessages, setLogMessages] = useState<LogMessages[]>(null!);
  const { alert } = useAlert();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getMessages = async () => {
      await GetMessages(logID, 1, 10, ({ message, status, messages }) => {
        if (status === 200) {
          setLogMessages(messages);
          return;
        }
        if (status === 401) {
          signOut();
          alert('Session expired, please login.', 'error', 5);
          navigate('/auth/login', { replace: false });
          return;
        }
        alert(message, 'error', 2.5);
      });
    };
    getMessages();
  }, [logID, dependency, alert]);

  const FormatDate = (string: string): string => {
    const [date, time] = string.split('T');
    const [hour, minute, second] = time.split('.')[0].split(':');

    const offSet = -(new Date().getTimezoneOffset() / 60);
    const amOrPm = parseInt(hour) < 12 ? 'a.m' : 'p.m';

    const formatedTime = `${
      parseInt(hour) > 12 ? Math.round(parseInt(hour) / 12) : hour
    }:${minute}:${second} ${amOrPm}`;

    return `${date} ${formatedTime} UTC${offSet}`;
  };

  return (
    <div className='flex flex-col mt-8 gap-4'>
      {logMessages !== null ? (
        logMessages.map((log) => (
          <div className='flex flex-col gap-4 md:flex-row md:items-center'>
            <PXS className='font-thin text-sm rounded-md p-[4px] bg-themeLightGray min-w-[210px] text-themeGray text-center'>
              {FormatDate(log.date)}
            </PXS>
            <PXS key={log.id} className='text-themeGray rounded-md'>
              {log.message}
            </PXS>
          </div>
        ))
      ) : (
        <>
          {[0, 1, 2].map(() => (
            <div className='w-full min-h-[18px] field-loading' />
          ))}
        </>
      )}
    </div>
  );
};
