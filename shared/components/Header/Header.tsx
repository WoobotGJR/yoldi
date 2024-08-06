'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import Image from 'next/image';

import { mainLogo } from '@/shared/icons';
import Button from '@/shared/ui/Button/Button';
import Avatar from '@/shared/components/Avatar/Avatar';
import {
  ACCOUNTS_LIST_ENDPOINT,
  PROFILE_ENDPOINT,
  SiGN_IN_ENDPOINT,
} from '@/utils/constants/endpoints';
import useSWR from 'swr';
import fetchToken from '@/utils/fetcher/fetchToken';
import useUser from '@/hooks/useUser';

const Header = () => {
  const { data } = useSWR('api/token', fetchToken, {
    fallbackData: fetchToken(),
  });
  const { user } = useUser();

  const isAuth = !!data;

  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <Link href={isAuth ? ACCOUNTS_LIST_ENDPOINT : SiGN_IN_ENDPOINT}>
          <Image src={mainLogo} alt="Yoldi Agency Logo" />
        </Link>
        <p className={styles.text}>
          Разрабатываем и запускаем
          <br />
          сложные веб проекты
        </p>
      </div>
      {isAuth ? (
        <Link href={PROFILE_ENDPOINT} className={styles.profile}>
          <p className={styles.name}>{user?.name}</p>
          <Avatar
            src={user?.image?.url}
            username={user?.name}
            variant="small"
          />
        </Link>
      ) : (
        <div className={styles.auth}>
          <Link href={SiGN_IN_ENDPOINT}>
            <Button className={styles.button} type="button" variant="white">
              Войти
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
