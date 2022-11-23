import { useMemo, useState } from 'react';
import { v4 } from 'uuid';
import { AiFillEye } from 'react-icons/ai';

import { Input } from '../';
import invisible from '../../images/invisible.svg';
import styles from './PasswordInput.module.css';

export default function PasswordInput(props) {
  const id = useMemo(() => v4(), []);
  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <Input
      id={id}
      type={showPassword ? 'text' : 'password'}
      rightAdornment={
        <button
          type="button"
          className={styles.typeToggleBtn}
          onClick={toggleShowPassword}
        >
          {showPassword ? (
            <AiFillEye className={styles.icon} />
          ) : (
            <img
              src={invisible}
              height="16"
              alt="Show password"
              className={styles.icon}
            />
          )}
        </button>
      }
      {...props}
    />
  );
}
