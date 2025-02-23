'use client';

import React, { useEffect, useState } from 'react';
import Form from '@/shared/components/Form/Form';
import { userIcon, mailIcon, lockIcon } from '@/shared/icons';
import Input from '@/shared/ui/Input/Input';
import Button from '@/shared/ui/Button/Button';

import styles from './SignupPage.module.css';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { PROFILE_ENDPOINT } from '@/utils/constants/endpoints';

const SignupPage = () => {
  const { error, isLoading, signup } = useAuth();
  const [isFormValid, setIsFormValid] = useState(false);
  const location = useRouter();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push(PROFILE_ENDPOINT);
    }
  }, [router]);

  const handleInputChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    setIsFormValid(event.currentTarget.checkValidity());
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const email = data.email as string;
    const password = data.password as string;
    const name = data.name as string;

    signup(email, name, password);
  };

  const inputFields = [
    {
      placeholder: 'Имя',
      type: 'text',
      name: 'name',
      alt: 'user-logo',
      logo: userIcon,
      minLength: 6,
      maxLength: 20,
      required: true,
    },
    {
      placeholder: 'E-mail',
      type: 'email',
      name: 'email',
      alt: 'mail-logo',
      logo: mailIcon,
      minLength: 6,
      maxLength: 20,
      required: true,
    },
    {
      placeholder: 'Пароль',
      type: 'password',
      name: 'password',
      alt: 'lock-logo',
      logo: lockIcon,
      minLength: 6,
      maxLength: 20,
      required: true,
    },
  ];

  return (
    <Form
      onSubmit={handleSubmit}
      onChange={handleInputChange}
      title="Регистрация в Yoldi Agency"
    >
      {inputFields.map((input) => (
        <Input
          key={input.name}
          placeholder={input.placeholder}
          type={input.type}
          alt={input.alt}
          name={input.name}
          logo={input.logo}
          minLength={input.minLength}
          maxLength={input.maxLength}
          required={input.required}
        />
      ))}
      {error?.message && <p className={styles.error}>{error?.message}</p>}
      <Button
        disabled={!isFormValid || isLoading}
        className={styles.button}
        type="submit"
        variant="black"
      >
        Создать аккаунт
      </Button>
    </Form>
  );
};

export default SignupPage;
