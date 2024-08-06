import Avatar from '@/shared/components/Avatar/Avatar';
import styles from './AccountsListPage.module.css';
import AccountList from '@/shared/components/AccountsList/AccountsList';

interface Props {}
const AccountsListPage = (props: Props) => {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Список аккаунтов</h1>
      <AccountList></AccountList>
    </div>
  );
};
export default AccountsListPage;
