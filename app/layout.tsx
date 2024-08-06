import Footer from '@/shared/components/Footer/Footer';
import Header from '@/shared/components/Header/Header';
import type { Metadata } from 'next';

import styles from './layout.module.css';
import './globals.css';
import Modal from '@/shared/components/Modal/Modal';

export const metadata: Metadata = {
  title: 'yoldi.agency — тестовое задание',
  description: 'Тестовое задание для yoldi.agency',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={styles.body}>
        <Header />
        <main className={styles.mainContent}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
