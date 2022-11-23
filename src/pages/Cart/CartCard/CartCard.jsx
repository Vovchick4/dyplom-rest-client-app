import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import styles from './CartCard.module.css';

import { orderActions } from '../../../redux/order';
import { Button } from '../../../components';
import plusIcon from '../../../images/ic-plus.svg';
import minusIcon from '../../../images/ic-minus.svg';
import trashIcon from '../../../images/ic-delete.svg';

export default function CartCard({
  plate,
  amount,
  quantity,
  increment,
  decrement,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <div className={styles.card}>
      <div>
        <p className={styles.card_count}>
          {amount}x<span className={styles.card_title}>{plate.name}</span>
        </p>
        <div className={styles.countControlsBox}>
          <button
            type="button"
            className={styles.card_button}
            onClick={() => decrement(plate.id)}
            disabled={amount === 1}
          >
            <img src={minusIcon} width="12" height="4" alt="minusIcon" />
          </button>
          <button
            type="button"
            className={styles.card_button}
            onClick={() => increment(plate.id)}
            disabled={amount === quantity}
          >
            <img src={plusIcon} width="12" height="12" alt="plusIcon" />
          </button>
        </div>
      </div>
      <div>
        <p className={styles.card_price}>€{plate.price * amount}</p>
        <button
          type="button"
          className={styles.card_button_trash}
          onClick={() =>
            toast(
              <>
                <p>Do you wan't delete?</p>
                <div className={styles.alert_content}>
                  <Button variant="outline" onClick={() => toast.dismiss()}>
                    {t('Cancel')}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      dispatch(orderActions.deleteCart(plate.id));
                      toast.dismiss();
                    }}
                  >
                    {t('Apply')}
                  </Button>
                </div>
              </>
            )
          }
        >
          <img src={trashIcon} width="16" height="19" alt="cart" />
        </button>
      </div>
    </div>
  );
}
