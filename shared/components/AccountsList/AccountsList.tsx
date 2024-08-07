'use client';

import useSWR from 'swr';
import ListItem from '../ListItem/ListItem';
import styles from './AccountsList.module.css';
import { BASE_URL } from '@/utils/constants/baseUrl';
import { IUser } from '@/utils/types/Interfaces';
import Link from 'next/link';
import { FixedSizeList as List } from 'react-window';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const AccountList: React.FC = () => {
  const { data } = useSWR<IUser[]>(`${BASE_URL}/user`, fetcher);

  // Функция для рендеринга элементов списка
  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const item = data ? data[index] : null;

    if (!item) return null;

    return (
      <Link
        key={item.slug}
        className={styles.link}
        href={`/profile/${item.slug}`}
        style={style}
      >
        <ListItem
          email={item.email}
          name={item.name}
          imageUrl={item.image?.url}
        ></ListItem>
      </Link>
    );
  };

  return (
    <div className={styles.list}>
      {data && (
        <List
          className={styles.list}
          height={600}
          itemCount={data.length}
          itemSize={70}
          width={'100%'}
          overscanCount={5}
        >
          {Row}
        </List>
      )}
    </div>
  );
};
export default AccountList;
