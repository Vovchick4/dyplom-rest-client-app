import { CSSTransition } from 'react-transition-group';
import { useMemo } from 'react';

import fadeIn from '../../styles/animations/fadeIn.module.css';
import styles from './Input.module.css';

export default function Input({
  error,
  multiline = false,
  variant = 'default',
  leftAdornment,
  rightAdornment,
  ...inputProps
}) {
  const inputClasses = useMemo(() => {
    const classes = [styles.input, styles[`input_${variant}`]];

    if (leftAdornment) {
      classes.push(styles.leftAdornmentVisible);
    }
    if (rightAdornment) {
      classes.push(styles.rightAdornmentVisible);
    }
    if (error) {
      classes.push(styles.inputError);
    }

    return classes;
  }, [leftAdornment, rightAdornment, error, variant]);

  return (
    <div className={styles.container}>
      <div className={styles.field}>
        {multiline ? (
          <textarea className={inputClasses.join(' ')} {...inputProps} />
        ) : (
          <input className={inputClasses.join(' ')} {...inputProps} />
        )}
        {leftAdornment && (
          <div className={styles.leftAdornment}>{leftAdornment}</div>
        )}
        {rightAdornment && (
          <div className={styles.rightAdornment}>{rightAdornment}</div>
        )}
      </div>

      <CSSTransition
        in={!!error}
        unmountOnExit
        classNames={fadeIn}
        timeout={75}
      >
        <p className={styles.error}>{error}</p>
      </CSSTransition>
    </div>
  );
}
