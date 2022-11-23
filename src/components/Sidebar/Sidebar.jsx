import { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import styles from './Sidebar.module.css';
import fadeIn from '../../styles/animations/fadeIn.module.css';
import sidebarSlide from '../../styles/animations/SidebarSlide.module.css';
import urls from '../../config/urls';
import Link from './Link';
import { authSelectors } from '../../redux/auth';
import logoImg from '../../images/Ouiorder_logo_horiz_onlywhite.png';

export default function Sidebar({ open, onClose, showLanguageSelect }) {
  const isAuthenticated = useSelector(authSelectors.isAuthenticated);

  const { t } = useTranslation();

  useEffect(() => {
    if (open) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [open]);

  return (
    <div>
      <CSSTransition in={open} unmountOnExit timeout={100} classNames={fadeIn}>
        <div className={styles.dimmer} onClick={onClose} />
      </CSSTransition>

      <CSSTransition
        in={open}
        unmountOnExit
        timeout={100}
        classNames={sidebarSlide}
      >
        <aside className={styles.sidebar}>
          <div className={styles.logoBox}>
            <img
              className={styles.logo}
              src={logoImg}
              alt="Ouiorder Logo"
              height="70"
            />
          </div>

          <div>
            {!isAuthenticated && (
              <>
                <Link to={urls.login} prefix={false}>
                  {t('Login')}
                </Link>
                <Link to={urls.signup} prefix={false}>
                  {t('Sign Up')}
                </Link>
              </>
            )}
            <Link to={urls.hotel}>{t('Hotel')}</Link>
            {/* Todo add link category */}
            {/* <Link to={`${urls.menu}/101`}>Menu</Link> */}
            <Link to={urls.cart}>{t('Cart')}</Link>
            {isAuthenticated && (
              <Link to={`${urls.profile}`}>{t('Profile')}</Link>
            )}
            <Link as="button" onClick={showLanguageSelect}>
              {t('Change language')}
            </Link>
          </div>
        </aside>
      </CSSTransition>
    </div>
  );
}
