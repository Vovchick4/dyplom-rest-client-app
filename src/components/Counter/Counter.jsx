import styles from './Counter.module.css';

import plusIcon from '../../images/ic-plus.svg';
import minusIcon from '../../images/ic-minus.svg';

export default function Counter({ count, setCount }) {
  return (
    <div className={styles.container}>
      <button
        onClick={() => setCount((prev) => prev - 1)}
        className={styles.card_button}
        disabled={count === 1}
      >
        <img src={minusIcon} width="12" height="2" alt="minus" />
      </button>
      <p className={styles.count}>{count}</p>
      <button
        onClick={() => setCount((prev) => prev + 1)}
        className={styles.card_button}
        disabled={count >= 9}
      >
        <img src={plusIcon} width="12" height="12" alt="plus" />
      </button>
    </div>
  );
}
