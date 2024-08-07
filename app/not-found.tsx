'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    // Перенаправление на главную страницу через 3 секунды
    setTimeout(() => {
      router.push('/');
    }, 3000);
  }, [router]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Страница не найдена</h1>
      <p>
        Вы будете перенаправлены на главную страницу через несколько секунд...
      </p>
    </div>
  );
};

export default NotFound;
