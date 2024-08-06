'use client';

import {
  imageIcon,
  penIcon,
  signoutIcon,
  trashIcon,
  uploadIcon,
} from '@/shared/icons';

import Avatar from '@/shared/components/Avatar/Avatar';
import Modal from '@/shared/components/Modal/Modal';
import { useState } from 'react';
import withAuth from '@/shared/HOC/withAuth';

import styles from './ProfilePage.module.css';
import useAuth from '@/hooks/useAuth';
import useUser from '@/hooks/useUser';
import Input from '@/shared/ui/Input/Input';
import Button from '@/shared/ui/Button/Button';
import { usePathname } from 'next/navigation';

const ProfilePage = () => {
  const { user, uploadCover } = useUser();
  const { logout } = useAuth();
  const pathname = usePathname();

  const [isVisible, setIsVisible] = useState(false);
  const [hover, setHover] = useState(false); // Управление состоянием для hover

  const handleLogout = () => {
    logout();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadCover(file);
    }
  };

  return (
    <div className={styles.page}>
      <div
        className={styles.background}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ backgroundImage: `url(${user?.cover?.url})` }}
      >
        {pathname === '/profile/me' && hover && (
          <label className={styles.uploadLabel}>
            <Input
              type="file"
              className={styles.fileInput}
              onChange={handleFileChange}
              aria-label="Upload image"
            />
            {!user?.image?.url ? (
              <Button
                className={styles.uploadButton}
                leftIcon={uploadIcon}
                rightIcon={imageIcon}
                variant="white"
              >
                Загрузить
              </Button>
            ) : (
              <Button
                className={styles.uploadButton}
                leftIcon={trashIcon}
                rightIcon={imageIcon}
                variant="white"
              >
                Изменить
              </Button>
            )}
          </label>
        )}
      </div>
      <Avatar
        src={user?.image?.url}
        username={user?.name}
        className={styles.image}
        variant="large"
      />
      <div className={styles.profileContent}>
        <div className={styles.wrapper}>
          <div className={styles.infoContainer}>
            <h1 className={styles.name}>{user?.name}</h1>
            <p className={styles.email}>{user?.email}</p>
          </div>
          <Button
            onClick={() => setIsVisible(true)}
            className={styles.button}
            variant="white"
            leftIcon={penIcon}
          >
            Редактировать
          </Button>
        </div>
        <p className={styles.description}>
          {user?.description || 'Описание не указано'}
        </p>
        <Button
          className={styles.button}
          variant="white"
          leftIcon={signoutIcon}
          onClick={handleLogout}
        >
          Выйти
        </Button>
      </div>
      <Modal setIsVisible={setIsVisible} isVisible={isVisible} />
    </div>
  );
};
export default withAuth(ProfilePage);
