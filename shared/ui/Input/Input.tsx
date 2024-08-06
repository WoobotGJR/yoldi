import styles from './Input.module.css';

import Image from 'next/image';

import { eyeIcon } from '@/shared/icons';
import { forwardRef, useState } from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'auth' | 'default';
  logo?: string;
  labelText?: string;
}

const Input: React.FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      logo,
      variant,
      labelText,
      placeholder,
      type,
      name,
      className,
      id,
      alt,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false);

    const handleVisible = () => setVisible(!visible);

    return (
      <div className={styles.wrapper}>
        {labelText && (
          <label className={styles.label} htmlFor={id}>
            {labelText}
          </label>
        )}
        <div className={styles.inputContainer}>
          {logo && (
            <Image
              className={styles.icon}
              src={logo}
              alt={alt ?? 'input-icon'}
              width={25}
              height={25}
            />
          )}
          <input
            {...props}
            type={visible ? 'text' : type}
            name={name}
            className={clsx(
              styles.input,
              variant && styles[variant],
              className
            )}
            placeholder={placeholder}
            ref={ref}
          />
          {type === 'password' && (
            <Image
              src={eyeIcon}
              alt="lock-icon"
              className={styles.passwordIcon}
              onClick={handleVisible}
            />
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
