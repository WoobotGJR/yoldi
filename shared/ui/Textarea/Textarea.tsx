import { forwardRef } from 'react';

import styles from './Textarea.module.css';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelText: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ labelText, ...props }, ref) => {
    return (
      <div className={styles.wrapper}>
        <label className={styles.label} htmlFor="description">
          {labelText}
        </label>

        <textarea
          {...props}
          className={styles.textarea}
          name="description"
          id="description"
          ref={ref}
        ></textarea>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
