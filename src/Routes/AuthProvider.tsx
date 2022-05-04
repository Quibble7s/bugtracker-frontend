import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { BASE_URL } from 'src/Constants';
import { SignInParams, User } from 'src/Models';

interface AuthUser {
  user: User;
  token: string;
}

interface AuthContextType {
  user: AuthUser;
  signIn: (params: SignInParams) => Promise<void>;
  signOut: VoidFunction;
}

const AuthContext = createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser>(null!);

  const token: string | null = localStorage.getItem('token');

  const fetchUser = useCallback(async () => {
    await fetch(`${BASE_URL}/api/v1/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const data: AuthUser = await res.json();
        setUser(data);
      })
      .catch((err) => {
        localStorage.setItem('token', '');
      });
  }, [token, BASE_URL]);

  useEffect(() => {
    if (token && token.length > 0) {
      fetchUser();
    }
  }, [token]);

  const signIn = async (params: SignInParams) => {
    await fetch(`${BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then(async (res) => {
        const data: AuthUser = await res.json();
        localStorage.setItem('token', data.token);
        setUser(data);
      })
      .catch((err) => {
        localStorage.setItem('token', '');
      });
  };

  const signOut = () => {
    localStorage.setItem('token', '');
    setUser(null!);
  };

  const value = { user, signIn, signOut };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
