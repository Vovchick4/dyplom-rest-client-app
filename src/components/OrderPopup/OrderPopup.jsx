import React, { useEffect } from 'react';
import styles from './Overlay.module.css';

export default function OrderPopup({
  elements = [],
  onNext,
  activeIndex = -1,
}) {
  useEffect(() => {
    if (
      activeIndex !== -1 &&
      elements.length - 1 >= activeIndex &&
      !elements[activeIndex].renderCheck()
    ) {
      onNext();
    }
  }, [elements, activeIndex, onNext]);

  return (
    <React.Fragment>
      {activeIndex !== -1 && elements.length - 1 >= activeIndex && (
        <div className={styles.overlay}>{elements[activeIndex]?.component}</div>
      )}
    </React.Fragment>
  );
}
