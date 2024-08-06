import Avatar from '../Avatar/Avatar';
import styles from './ListItem.module.css';

interface ListItemProps {
  name: string;
  email: string;
  imageUrl: string;
}
const ListItem: React.FC<ListItemProps> = ({ name, email, imageUrl }) => {
  return (
    <div className={styles.listItem}>
      <Avatar src={imageUrl} className={styles.image} variant="small" />
      <div className={styles.wrapper}>
        <p className={styles.name}>{name}</p>
        <p className={styles.email}>{email}</p>
      </div>
    </div>
  );
};
export default ListItem;
