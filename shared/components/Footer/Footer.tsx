'use client';

import React from 'react';
import styles from './Footer.module.css';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  SiGN_IN_ENDPOINT,
  SIGN_UP_ENDPOINT,
} from '@/utils/constants/endpoints';

const Footer = () => {
  const pathname = usePathname();

  const allowedPaths = [SIGN_UP_ENDPOINT, SiGN_IN_ENDPOINT];

  if (!allowedPaths.includes(pathname)) return null;

  return (
    <footer className={styles.footer}>
      {pathname === SIGN_UP_ENDPOINT ? (
        <p className={styles.text}>
          Уже есть аккаунт?{' '}
          <Link className={styles.link} href={SiGN_IN_ENDPOINT}>
            Войти
          </Link>
        </p>
      ) : (
        <p className={styles.text}>
          Еще нет аккаунта?{' '}
          <Link className={styles.link} href={SIGN_UP_ENDPOINT}>
            Зарегистрироваться
          </Link>
        </p>
      )}
    </footer>
  );
};

export default Footer;
