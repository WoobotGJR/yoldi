'use client';

import useUser from '@/hooks/useUser';
import { SiGN_IN_ENDPOINT } from '@/utils/constants/endpoints';
import fetchToken from '@/utils/fetcher/fetchToken';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

const withAuth = (Component: React.FC) => {
  return function WithAuth(props: any) {
    const [isClient, setIsClient] = useState(false);

    const { data } = useSWR('api/token', fetchToken, {
      fallbackData: fetchToken(),
    });
    const router = useRouter();

    useEffect(() => {
      setIsClient(true);
    }, []);

    if (!isClient) {
      return null;
    }

    const isAuthenticated = !!data;

    if (!isAuthenticated) {
      router.push(SiGN_IN_ENDPOINT);
      return null;
    }

    return <Component {...props} />;
  };
};

export default withAuth;
