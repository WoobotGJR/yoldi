'use client';

import React, { useEffect } from 'react';
import Form from '@/shared/components/Form/Form';
import { mailIcon, lockIcon } from '@/shared/icons';
import Input from '@/shared/ui/Input/Input';
import Button from '@/shared/ui/Button/Button';

import styles from './SigninPage.module.css';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { PROFILE_ENDPOINT } from '@/utils/constants/endpoints';

const SigninPage = () => {
  const { error, isLoading, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push(PROFILE_ENDPOINT);
    }
  }, [router]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const email = data.email as string;
    const password = data.password as string;

    login(email, password);
  };

  const inputFields = [
    {
      placeholder: 'E-mail',
      type: 'email',
      name: 'email',
      alt: 'mail-logo',
      logo: mailIcon,
      minlength: 6,
      maxLength: 20,
      required: true,
    },
    {
      placeholder: 'Пароль',
      type: 'password',
      name: 'password',
      alt: 'lock-logo',
      logo: lockIcon,
      minlength: 6,
      maxLength: 20,
      required: true,
    },
  ];

  return (
    <Form onSubmit={handleSubmit} title="Вход в Yoldi Agency">
      {inputFields.map((input) => (
        <Input
          key={input.name}
          placeholder={input.placeholder}
          type={input.type}
          alt={input.alt}
          name={input.name}
          logo={input.logo}
          maxLength={input.maxLength}
          minLength={input.minlength}
          required={input.required}
        />
      ))}
      {error?.message && (
        <p className={styles.error}>Неправильный пароль или email</p>
      )}

      <Button className={styles.button} type="submit" variant="black">
        Войти
      </Button>
    </Form>
  );
};

export default SigninPage;
