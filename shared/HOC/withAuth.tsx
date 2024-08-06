'use client';

import useUser from '@/hooks/useUser';
import { SiGN_IN_ENDPOINT } from '@/utils/constants/endpoints';
import fetchToken from '@/utils/fetcher/fetchToken';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useSWR from 'swr';

const withAuth = (Component: React.FC) => {
  return function WithAuth(props: any) {
    // const { getUser } = useUser();
    const { data } = useSWR('api/token', fetchToken, {
      fallbackData: fetchToken(),
    });
    const router = useRouter();

    const isAuthenticated = !!data;

    // useEffect(() => {
    //   if (isAuthenticated) {
    //     getUser('api/user');
    //   } else {
    //     router.push(SiGN_IN_ENDPOINT);
    //   }
    // }, []);

    if (!isAuthenticated) {
      router.push(SiGN_IN_ENDPOINT);
      return null;
    }

    return <Component {...props} />;
  };
};

export default withAuth;
