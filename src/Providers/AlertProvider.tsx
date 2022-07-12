import { createContext, ReactNode, useState } from 'react';
import { Alert, Notification } from 'src/Components/Layout';

type AlertType = 'error' | 'success' | 'warning';

interface ContextType {
  alert: (message: string, type: AlertType, duration: number) => void;
}

export const AlertContext = createContext<ContextType>(null!);
AlertContext.displayName = 'Alert';

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<JSX.Element[]>([]);

  /**
   *
   * @param message The message to display
   * @param type The type of the message
   * @param duration The duration of the message in seconds
   */
  const alert = (message: string, type: AlertType, duration = 5) => {
    setNotifications([
      ...notifications,
      <Notification
        key={`noti-${Date.now()}`}
        message={message}
        type={type}
        duration={duration}
      />,
    ]);
  };

  const values = { alert };
  return (
    <>
      <Alert>
        <div className='w-full md:absolute md:w-[420px] h-[calc(100%-150px)] p-4 right-0 flex flex-col-reverse justify-start gap-2'>
          {notifications.map((noti) => noti)}
        </div>
      </Alert>
      <AlertContext.Provider value={values}>{children}</AlertContext.Provider>
    </>
  );
};
