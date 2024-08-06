import clsx from 'clsx';
import styles from './Button.module.css';
import { forwardRef } from 'react';
import Image from 'next/image';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'black' | 'white' | 'icon';
  leftIcon?: string;
  rightIcon?: string;
}
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { type, children, className, variant, leftIcon, rightIcon, ...props },
    ref
  ) => {
    return (
      <button
        {...props}
        ref={ref}
        type={type}
        className={clsx(styles.button, variant && styles[variant], className)}
      >
        {leftIcon && (
          <Image
            src={leftIcon}
            alt="left-icon"
            className={styles.leftIcon}
            width={25}
            height={25}
          />
        )}
        {children}
        {rightIcon && (
          <Image
            src={rightIcon}
            alt="right-icon"
            className={styles.rightIcon}
            width={25}
            height={25}
          />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
