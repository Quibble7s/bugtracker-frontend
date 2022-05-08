import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { BASE_URL } from 'src/Constants';
import { SignInParams, User } from 'src/Models';

//Types
interface AuthUser {
  user: User;
  token: string;
  status: number;
  message: string;
}

interface callBackParams {
  message: string;
  status: number;
}

interface AuthContextType {
  user: User;
  signIn: (params: SignInParams, callBack?: () => void) => Promise<void>;
  signOut: (callback?: ({ message, status }: callBackParams) => void) => void;
}

//Context
const AuthContext = createContext<AuthContextType>(null!);

//Provider
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null!);

  const token: string | null = localStorage.getItem('token');
  const authenticated: boolean =
    localStorage.getItem('authenticated') === 'true' ? true : false;

  const fetchUser = useCallback(async (): Promise<AuthUser> => {
    try {
      const res: Response = await fetch(`${BASE_URL}/api/v1/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      //User unauthorized.
      if (res.status === 401) {
        const data: AuthUser = {
          user: null!,
          token: '',
          status: 401,
          message: 'Unauthorized.',
        };
        return data;
      }

      //User not found.
      if (res.status === 404) {
        const json = await res.json();
        const data: AuthUser = {
          user: null!,
          token: '',
          status: json.status,
          message: json.message,
        };
        return data;
      }

      //User fetched successfuly.
      const json = await res.json();
      const data: AuthUser = {
        user: json,
        token: token!,
        message: 'Ok.',
        status: 200,
      };
      return data;
    } catch {
      const data: AuthUser = {
        user: null!,
        token: '',
        message: 'Server Error.',
        status: 500,
      };
      return data;
    }
  }, [token]);

  //If the user is aleady authenticated (token is pressent && authenticated = true) fetch user data on load.
  useEffect(() => {
    const setUserAsync = async () => {
      const data: AuthUser = await fetchUser();
      if (data.status === 200) {
        setUser(data.user);
      } else if (data.status === 401 || data.status === 404) {
        //Set auth to false and remove the token if the user is unauthorized or doesn't exist
        localStorage.setItem('authenticated', 'false');
        localStorage.setItem('token', '');
        setUser(data.user);
      }
    };
    if (authenticated) {
      setUserAsync();
    }
  }, [authenticated, fetchUser]);

  const signIn = async (
    params: SignInParams,
    callback?: ({ message, status }: callBackParams) => void,
  ) => {
    try {
      const res: Response = await fetch(`${BASE_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      //Invalid email or password..
      if (res.status === 401) {
        if (callback) {
          callback({
            message: 'Invalid email or password.',
            status: res.status,
          });
        }
        return;
      }
      //User logged in correctly.
      if (res.status === 200) {
        if (callback) {
          callback({ message: 'Success.', status: 200 });
        }
        const data: AuthUser = await res.json();
        localStorage.setItem('authenticated', 'true');
        localStorage.setItem('token', data.token);
        setUser(data.user);
      }
    } catch {
      if (callback) {
        callback({ message: 'Server error.', status: 500 });
      }
    }
  };

  const signOut = () => {
    localStorage.setItem('authenticated', 'false');
    localStorage.setItem('token', '');
    setUser(null!);
  };

  const value = { user, signIn, signOut };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
