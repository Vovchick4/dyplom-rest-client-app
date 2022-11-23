import { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import fadeIn from '../../styles/animations/fadeIn.module.css';
import styles from './Select.module.css';

import checkIcon from '../../images/ic-check.svg';
import arrowIcon from '../../images/arrow-back.svg';

export default function Select({ options, value, onChange }) {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const containerRef = useRef();

  const handleClickOutside = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setOptionsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function toggle() {
    setOptionsVisible((prev) => !prev);
  }

  return (
    <div className={styles.container} ref={containerRef} onClick={toggle}>
      <button type="button" className={styles.defaultOption}>
        {value.name}
        <img
          className={
            optionsVisible ? styles.dropdownIconActive : styles.dropdownIcon
          }
          src={arrowIcon}
          width="9"
          height="18"
          alt={optionsVisible ? 'Hide options' : 'Show options'}
        />
      </button>

      <CSSTransition
        classNames={fadeIn}
        in={optionsVisible}
        unmountOnExit
        timeout={200}
      >
        <ul className={styles.options}>
          {options.map((item) => {
            const isActive = value.value === item.value;

            return (
              item?.render && (
                <li key={item.value} className={styles.optionItem}>
                  <button
                    type="button"
                    className={
                      isActive ? styles.optionBtnChecked : styles.optionBtn
                    }
                    onClick={() => onChange(item)}
                  >
                    <span>{item.name}</span>

                    {isActive && (
                      <div className={styles.check}>
                        <img
                          src={checkIcon}
                          height="8"
                          width="12"
                          alt="checkIcon"
                        />
                      </div>
                    )}
                  </button>
                </li>
              )
            );
          })}
        </ul>
      </CSSTransition>
    </div>
  );
}
