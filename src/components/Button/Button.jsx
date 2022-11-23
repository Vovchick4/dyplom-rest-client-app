import { BiLoaderAlt } from 'react-icons/bi';
import { useMemo, createElement } from 'react';

import styles from './Button.module.css';

export default function Button({
  variant = 'default',
  type = 'button',
  isLoading = false,
  disabled = false,
  children,
  className,
  component = 'button',
  ...otherProps
}) {
  const classes = useMemo(() => {
    const base = [styles[variant]];
    if (className) {
      base.push(className);
    }

    return base;
  }, [className, variant]);

  return createElement(
    component,
    {
      className: classes.join(' '),
      disabled: isLoading || disabled,
      type: type,
      ...otherProps,
    },
    <>
      {children}
      {isLoading && (
        <div className={styles.loader}>
          <BiLoaderAlt className={styles.loaderIcon} size={30} />
        </div>
      )}
    </>
  );
}
