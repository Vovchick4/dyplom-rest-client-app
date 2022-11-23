import { useSelector } from 'react-redux';

import { Container } from '../../components';
import { orderSelectors } from '../../redux/order';
import styles from './BillingTicket.module.css';

export default function BillingTicket() {
  const order = useSelector(orderSelectors.getOrder);

  const totalPrice = order.plates.reduce(
    (prev, { price, amount }) => prev + price * amount,
    0
  );

  return (
    <Container>
      <h1>Billing Ticket</h1>
      <hr />

      {order ? (
        <>
          <div className={styles.block}>
            <h3 className={styles.title}>How many person at the table:</h3>
            <p>{order.person_quantity}</p>
          </div>

          <div className={styles.block}>
            <h3 className={styles.title}>For how many people you ordered:</h3>
            <p>{order.people_for_quantity}</p>
          </div>

          <div className={styles.block}>
            <h3 className={styles.title}>Table #:</h3>
            <p>{order.table}</p>
          </div>

          <div className={styles.block}>
            <h3 className={styles.title}>Plates:</h3>
            <ul>
              {order.plates.map((plate) => (
                <li key={plate.id}>
                  {plate.name} - {plate.price}€ x{plate.amount}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.block}>
            <h3 className={styles.title}>Total price:</h3>
            <p>{totalPrice}€</p>
          </div>
        </>
      ) : (
        <h2>No info available</h2>
      )}
    </Container>
  );
}
