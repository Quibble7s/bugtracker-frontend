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
  user: User;
  signIn: (params: SignInParams) => Promise<void>;
  signOut: VoidFunction;
}

const AuthContext = createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null!);

  const token: string | null = localStorage.getItem('token');
  const authenticated: boolean =
    localStorage.getItem('authenticated') === 'true' ? true : false;

  const fetchUser = useCallback(async () => {
    let userData: User = null!;
    await fetch(`${BASE_URL}/api/v1/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const data: User = await res.json();
        localStorage.setItem('authenticated', 'true');
        userData = data;
      })
      .catch((err) => {
        localStorage.setItem('authenticated', 'false');
        localStorage.setItem('token', '');
        userData = null!;
      });
    return userData;
  }, [token]);

  useEffect(() => {
    const setUserAsync = async () => {
      setUser(await fetchUser());
    };
    if (authenticated) {
      setUserAsync();
    }
  }, [authenticated, fetchUser]);

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
        localStorage.setItem('authenticated', 'true');
        localStorage.setItem('token', data.token);
        setUser(data.user);
      })
      .catch((err) => {
        localStorage.setItem('authenticated', 'false');
        localStorage.setItem('token', '');
      });
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
