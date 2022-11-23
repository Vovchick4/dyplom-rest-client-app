import { Loader } from '..';
import styles from './FullPageLoader.module.css';

export default function FullPageLoader({ isDimmerActive = false }) {
  if (isDimmerActive) {
    return (
      <>
        <div className={styles.dimmer} />
        <div className={styles.content}>
          <Loader />
        </div>
      </>
    );
  } else {
    return (
      <div className={styles.absolute_content}>
        <Loader />
      </div>
    );
  }
}
