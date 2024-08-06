'use client';

import useSWR from 'swr';
import ListItem from '../ListItem/ListItem';
import styles from './AccountsList.module.css';
import { BASE_URL } from '@/utils/constants/baseUrl';
import { IUser } from '@/utils/types/Interfaces';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const AccountList: React.FC = () => {
  const { data } = useSWR<IUser[]>(`${BASE_URL}/user`, fetcher);

  return (
    <div className={styles.list}>
      {data?.map((item, index) => (
        <Link className={styles.link} href={`/profile/${item.slug}`}>
          <ListItem
            key={item.slug}
            email={item.email}
            name={item.name}
            imageUrl={item.image?.url}
          ></ListItem>
        </Link>
      ))}
    </div>
  );
};
export default AccountList;
