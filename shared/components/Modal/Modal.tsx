'use client';

import InputGroup from '@/shared/ui/InputGroup/InputGroup';
import Button from '../../ui/Button/Button';
import Input from '../../ui/Input/Input';
import styles from './Modal.module.css';
import Textarea from '@/shared/ui/Textarea/Textarea';
import { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import useUser from '@/hooks/useUser';

interface ModalProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}
const Modal: React.FC<ModalProps> = ({ isVisible, setIsVisible }) => {
  const { user, updateUserInfo } = useUser();
  const [name, setName] = useState(user?.name || '');
  const [slug, setSlug] = useState(user?.slug || '');
  const [description, setDescription] = useState(user?.description || '');
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal by pressing escape
  const onClose = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsVisible(false);
    }
  }, []);

  // Close modal by clicking outside
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsVisible(false);
    }
  }, []);

  const handleButtonClick = () => {
    setIsVisible(false);
  };

  // Add event listeners
  useEffect(() => {
    if (!isVisible) return;
    document.addEventListener('keydown', onClose);
    document.addEventListener('mousedown', handleClickOutside);
    document.body.style.overflow = 'hidden'; // disable scroll on body

    return () => {
      document.removeEventListener('keydown', onClose);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'visible'; // enable scroll on body
    };
  }, [isVisible]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Сохранение изменений (например, отправка данных на сервер)
    const updatedUser = {
      name,
      slug,
      description,
      // добавьте другие необходимые поля, например, imageId, если нужно
    };
    try {
      await updateUserInfo(updatedUser); // Обновление данных пользователя
      setIsVisible(false);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  return (
    <div className={clsx(styles.overlay, isVisible && styles.visible)}>
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.title}>Редактировать профиль</div>
        <form className={styles.content} onSubmit={handleSubmit}>
          <Input
            variant="default"
            type="text"
            placeholder="Введите имя"
            name="name"
            id="name"
            labelText="Имя"
            value={name || user?.name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputGroup
            value={slug || user?.slug}
            id="profile-address"
            staticText="Адрес профиля"
            onChange={(e) => setSlug(e.target.value)}
          />
          <Textarea
            value={description || user?.description}
            placeholder="Расскажите о себе"
            labelText="Описание"
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className={styles.buttons}>
            <Button
              onClick={() => handleButtonClick()}
              className={styles.button}
              type="button"
              variant="white"
            >
              Отмена
            </Button>
            <Button className={styles.button} type="submit" variant="black">
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Modal;
