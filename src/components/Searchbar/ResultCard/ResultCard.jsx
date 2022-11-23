import styles from './ResultCard.module.css';
import urls from '../../../config/urls';
import { Link } from '../../';

export default function ResultCard({
  id,
  image,
  name,
  description,
  weight,
  price,
}) {
  return (
    <Link className={styles.card} to={`${urls.order}/${id}`}>
      <div className={styles.infoBox}>
        <h4 className={styles.title}>{name}</h4>
        <span className={styles.weight}>{weight}</span>
        <span className={styles.ingredients}>{description}</span>
        <span className={styles.price}>€{price}</span>
      </div>
      <img className={styles.image} height="100" src={image} alt={name} />
    </Link>
  );
}
