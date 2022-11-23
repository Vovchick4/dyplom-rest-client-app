import { useContext } from 'react';

import styles from './NavbarOffset.module.css';
import { NavbarContext } from '../../context/Navbar.context';

export default function NavbarOffset({ children }) {
  const { transparent, categoriesVisible } = useContext(NavbarContext);

  let className = styles.default;
  if (transparent) {
    className = styles.none;
  } else if (categoriesVisible) {
    className = styles.tall;
  }

  return <div className={className}>{children}</div>;
}
