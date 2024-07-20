import { createContext, ReactNode, useCallback } from 'react';
import { localStorageKeys } from '../config/localStorageKeys';
import { User } from '../entities';
import useLocalStorage from 'use-local-storage';
import { authService } from '../services';

export interface LoginParams {
  username: string;
  password: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
}

interface UserInfo extends User {
  password: string;
}

export interface AuthContextValue {
  user: User | undefined;
  login: (params: LoginParams) => Promise<any>;
  accessToken: string;
}

export const AuthContext = createContext({} as AuthContextValue);

export interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useLocalStorage<User | undefined>(
    localStorageKeys.USER,
    undefined
  );

  const [accessToken, setAccessToken] = useLocalStorage<string>(
    localStorageKeys.ACCESS_TOKEN,
    ''
  );

  const login = useCallback(async (params: LoginParams) => {
    await authService.login(params);
    const auth = localStorage.getItem(localStorageKeys.AUTH);
    if (auth) {
      const authData: UserInfo = JSON.parse(auth);
      const userInfo: Omit<UserInfo, 'password'> = (({ password, ...rest }) =>
        rest)(authData);
      setAccessToken(JSON.parse(auth));
      setUser(userInfo);
    }
  }, []);

  const value = {
    user,
    login,
    accessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
