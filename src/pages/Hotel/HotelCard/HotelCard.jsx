import styles from './HotelCard.module.css';
import urls from '../../../config/urls';
import { Link } from '../../../components';

export default function HotelCard({ id, img, title }) {
  return (
    <Link className={styles.card} to={`${urls.menu}/${id}`}>
      <img className={styles.card_picture} src={img} alt={title} />
      <p className={styles.card_text}>{title}</p>
    </Link>
  );
}
