import React, { forwardRef } from 'react';
import styles from './Form.module.css';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  title: string;
  children: React.ReactNode;
}

const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ children, title, ...props }, ref) => {
    return (
      <div className={styles.formWrapper}>
        <h1 className={styles.formTitle}>{title}</h1>
        <form className={styles.form} ref={ref} {...props}>
          {children}
        </form>
      </div>
    );
  }
);

Form.displayName = 'Form';

export default Form;
