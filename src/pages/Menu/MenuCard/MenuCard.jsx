import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import styles from './MenuCard.module.css';
import { Button, Link } from '../../../components';
import urls from '../../../config/urls';
import { orderActions, orderSelectors } from '../../../redux/order';

export default function MenuCard({
  id,
  name,
  description,
  image,
  isActive,
  price,
  bordered,
  orderItem,
  plate,
}) {
  const classes = [styles.card_container];
  if (bordered) {
    classes.push(styles.cardBordered);
  }

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const orders = useSelector(orderSelectors.getAddToCart);

  function addToCart() {
    if (orders[plate.id]) {
      dispatch(orderActions.incrementAmount(plate.id));
    } else {
      const newOrder = {
        plate,
        amount: 1,
        comment: '',
      };

      dispatch(orderActions.addToCart(newOrder));
    }
  }

  return (
    <div className={styles.container}>
      <Button
        variant="outline"
        style={{ whiteSpace: 'nowrap' }}
        onClick={addToCart}
        className={styles.addBtn}
      >
        + {t('add')}
      </Button>
      <Link to={`${urls.order}/${id}`} className={classes.join(' ')}>
        <div className={isActive ? styles.card_active : styles.card}>
          <div className={styles.card_content}>
            <img className={styles.card_img} src={image} alt={name} />
            <div className={styles.card_text}>
              <h2 className={styles.card_title}>{name}</h2>
              <p className={styles.ingredients}>{description}</p>
              <div className={styles.priceBox}>
                <span className={styles.price}>€{price}</span>
                {isActive && (
                  <span className={styles.count}>{orderItem.amount}x</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
