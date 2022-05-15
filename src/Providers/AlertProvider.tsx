import { createContext, MutableRefObject, ReactNode, useRef } from 'react';

type AlertType = 'error' | 'success' | 'warning';

interface ContextType {
  alert: (message: string, type: AlertType, duration: number) => void;
  alertRef: MutableRefObject<HTMLDivElement>;
  alertTextRef: MutableRefObject<HTMLParagraphElement>;
}

export const AlertContext = createContext<ContextType>(null!);
AlertContext.displayName = 'Alert';

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const alertRef: MutableRefObject<HTMLDivElement> = useRef(null!);
  const alertTextRef: MutableRefObject<HTMLParagraphElement> = useRef(null!);

  const themes = {
    error: 'bg-red-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-300',
  };

  let lastClass = '';
  let playingAlert = false;

  /**
   *
   * @param message The message to display
   * @param type The type of the message
   * @param duration The duration of the message in seconds
   */
  const alert = (message: string, type: AlertType, duration = 5) => {
    //If an alert is already playing don't do anything.
    if (playingAlert) return;
    playingAlert = true;
    //Removing last class and adding the new one.
    if (lastClass !== '') alertRef.current.classList.remove(lastClass);
    lastClass = themes[type];
    //Adding corresponding styles
    alertRef.current.classList.add(themes[type]);
    alertRef.current.classList.toggle('!right-0');
    alertRef.current.classList.toggle('!opacity-100');
    alertRef.current.classList.toggle('!scale-100');
    alertTextRef.current.innerText = message;
    //Remove styles after n ammount of seconds
    setTimeout(() => {
      alertRef.current.classList.toggle('!right-0');
      alertRef.current.classList.toggle('!opacity-100');
      alertRef.current.classList.toggle('!scale-100');
      playingAlert = false;
    }, duration * 1000);
  };

  const values = { alert, alertRef, alertTextRef };
  return (
    <AlertContext.Provider value={values}>{children}</AlertContext.Provider>
  );
};
