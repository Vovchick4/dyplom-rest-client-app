import { createElement } from 'react';

import styles from './OrderButton.module.css';
import cartIcon from '../../images/ic-cart-green.svg';

export default function OrderButton({
  totalPrice,
  totalAmount,
  label,
  component,
  ...otherProps
}) {
  return createElement(
    component,
    {
      className: styles.orderBtn,
      ...otherProps,
    },
    <span className={styles.textPrice}>€{totalPrice}</span>,
    <span className={styles.textOrder}>{label}</span>,
    <p className={styles.container_basket_price}>
      <img
        className={styles.GrBasketIcon}
        src={cartIcon}
        height="26"
        width="26"
        alt="basket"
      />
      <span className={styles.textCount}>{totalAmount}</span>
    </p>
  );
}
