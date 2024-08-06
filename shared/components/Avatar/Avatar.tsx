'use client';

import clsx from 'clsx';
import Image from 'next/image';
import uploadIcon from '@/public/state=hover.webp';

import styles from './Avatar.module.css';
import { useCallback, useState } from 'react';
import { usePathname } from 'next/navigation';
import useUser from '@/hooks/useUser';

interface AvatarProps {
  variant: 'large' | 'small';
  isLoading?: boolean;
  src?: string;
  username?: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  variant,
  className,
  username,
  src,
}) => {
  const { uploadImage } = useUser();
  const [hover, setHover] = useState(false);

  const pathname = usePathname();

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        uploadImage(file);
      }
    },
    [uploadImage]
  );
  return (
    <div
      className={clsx(styles.avatarContainer, className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {src && src !== 'unknown' ? (
        <Image
          className={clsx(styles.avatar, styles[variant])}
          src={src}
          alt="avatar"
          width={variant === 'large' ? 100 : 50}
          height={variant === 'large' ? 100 : 50}
          placeholder="blur"
          blurDataURL={src} // Используйте src как плейсхолдер
        />
      ) : (
        <div
          className={clsx(styles.customAvatar, styles[variant])}
          role="img"
          aria-label="avatar"
          style={{
            width: variant === 'large' ? 100 : 50,
            height: variant === 'large' ? 100 : 50,
            lineHeight: `${variant === 'large' ? 100 : 50}px`,
          }}
        >
          {username?.charAt(0).toUpperCase() || '?'}
        </div>
      )}
      {pathname === '/profile/me' && hover && variant === 'large' && (
        <label className={styles.uploadLabel}>
          <input
            type="file"
            className={styles.fileInput}
            onChange={handleFileChange}
          />
          <Image src={uploadIcon} alt="upload" className={styles.uploadIcon} />
        </label>
      )}
    </div>
  );
};
export default Avatar;
