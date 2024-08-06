import { forwardRef } from 'react';

import styles from './InputGroup.module.css';

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  staticText: string;
}

const InputGroup = forwardRef<HTMLInputElement, InputGroupProps>(
  ({ staticText, ...props }, ref) => {
    return (
      <div className={styles.wrapper}>
        <label className={styles.label} htmlFor={props.id}>
          {staticText}
        </label>
        <div className={styles.inputGroup}>
          <div className={styles.prepend}>
            <span className={styles.text}>example.com/</span>
          </div>
          <input id={props.id} {...props} ref={ref} className={styles.input} />
        </div>
      </div>
    );
  }
);

InputGroup.displayName = 'InputGroup';

export default InputGroup;
