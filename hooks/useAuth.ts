import { BASE_URL } from '@/utils/constants/baseUrl';
import {
  PROFILE_ENDPOINT,
  SiGN_IN_ENDPOINT,
} from '@/utils/constants/endpoints';
import { useRouter } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';
import { useSWRConfig } from 'swr';

const useAuth = () => {
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const authenticate = useCallback(async (url: string, body: object) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const error = new Error('Произошла ошибка авторизации');
        throw error;
      }
      const data = await response.json();

      mutate(`api/token`, data.value, false);
      mutate(`api/user`, data.user, false);
      localStorage.setItem('token', data.value);
      router.push(PROFILE_ENDPOINT);
      setError(null);
    } catch (err) {
      setError(err as Error);
      removeToken();
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (email: string, password: string) =>
    authenticate(`${BASE_URL}/auth/login`, {
      email,
      password,
    });

  const signup = (email: string, name: string, password: string) =>
    authenticate(`${BASE_URL}/auth/sign-up`, {
      email,
      name,
      password,
    });

  const removeToken = () => {
    mutate(`api/token`, null, false);
    mutate(`api/user`, null, false);
    localStorage.removeItem('token');
  };

  const logout = () => {
    removeToken();
    router.push(SiGN_IN_ENDPOINT);
  };

  return {
    isLoading,
    error,
    login,
    signup,
    logout,
  };
};

export default useAuth;
