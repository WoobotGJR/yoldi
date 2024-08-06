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
        >
          Рыбатекст используется дизайнерами, проектировщиками и фронтендерами,
          когда нужно быстро заполнить макеты или прототипы содержимым. Это
          тестовый контент, который не должен нести никакого смысла, лишь
          показать наличие самого текста или продемонстрировать типографику в
          деле.
        </textarea>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
