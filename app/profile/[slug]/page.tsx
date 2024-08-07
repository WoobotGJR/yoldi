'use client';

import Avatar from '@/shared/components/Avatar/Avatar';
import withAuth from '@/shared/HOC/withAuth';

import useSWR from 'swr';
import { useParams, useRouter } from 'next/navigation';
import { BASE_URL } from '@/utils/constants/baseUrl';

import styles from './ProfilePage.module.css';
import useUser from '@/hooks/useUser';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ProfilePage = () => {
  const { slug } = useParams();
  const { data: user, isLoading } = useSWR(`${BASE_URL}/user/${slug}`, fetcher);
  const { user: currentUser } = useUser();
  const router = useRouter();

  if (slug === currentUser?.slug) {
    router.push('/profile/me');
    return null;
  }
  return (
    <div className={styles.page}>
      <div
        style={{ backgroundImage: `url(${user?.cover?.url})` }}
        className={styles.background}
      ></div>
      <Avatar
        username={user?.name}
        src={user?.image?.url}
        className={styles.image}
        variant="large"
        isLoading={isLoading}
      />
      <div className={styles.profileContent}>
        <div className={styles.wrapper}>
          <div className={styles.infoContainer}>
            <h1 className={styles.name}>{user?.name}</h1>
            <p className={styles.email}>{user?.email}</p>
          </div>
        </div>
        <p className={styles.description}>
          {user?.description || 'Описание не указано'}
        </p>
      </div>
    </div>
  );
};
export default ProfilePage;
