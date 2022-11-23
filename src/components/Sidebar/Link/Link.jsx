import { BsChevronRight } from 'react-icons/bs';

import styles from './Link.module.css';
import { Link as MyLink } from '../../';

export default function Link({ to, exact, children, ...props }) {
  return (
    <MyLink to={to} exact={exact} className={styles.link} {...props}>
      <div>{children}</div>
      <BsChevronRight strokeWidth="1" />
    </MyLink>
  );
}
