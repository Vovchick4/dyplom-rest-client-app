import { AiOutlineMenu } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';

import { Link } from '..';

import styles from './Navbar.module.css';
import logoImg from '../../images/Ouiorder_logo_horiz.svg';
import arrowBack from '../../images/arrow-back.svg';
import searchIcon from '../../images/ic-search.svg';
import { NavbarContext } from '../../context/Navbar.context';
import urls from '../../config/urls';
import { hotelSelectors } from '../../redux/hotel';

export default function Navbar({ onOpenSidebar, onOpenSearchbar }) {
  const history = useHistory();
  const {
    title,
    backVisible,
    backVisibleMenu,
    searchVisible,
    categoriesVisible,
    categories,
    setCategories,
    setLoading,
    transparent,
  } = useContext(NavbarContext);

  const hotel = useSelector(hotelSelectors.getHotel);

  useEffect(() => {
    if (!hotel) return;

    setLoading(true);

    axios({
      method: 'GET',
      url: `/restaurants/${hotel.id}/categories`,
    })
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, [hotel, setCategories, setLoading]);

  return (
    <nav className={transparent ? styles.transparent : styles.navbar}>
      <div className={styles.content}>
        {backVisible &&
          (backVisibleMenu ? (
            <Link to={urls.hotel}>
              <img
                className={styles.backIconDefault}
                src={arrowBack}
                width="9"
                height="18"
                alt="arrowBack"
              />
            </Link>
          ) : (
            <button
              type="button"
              className={styles.btn}
              onClick={history.goBack}
            >
              <img
                className={styles.backIconDefault}
                src={arrowBack}
                width="9"
                height="18"
                alt="arrowBack"
              />
            </button>
          ))}
        {!transparent && !backVisible && (
          <button
            className={styles.sidebarToggleBtn}
            type="button"
            onClick={onOpenSidebar}
          >
            <AiOutlineMenu />
          </button>
        )}
        {!transparent && title && <h2 className={styles.title}>{title}</h2>}
        {!transparent && !title && (
          <div className={styles.logoBox}>
            <img className={styles.logo} src={logoImg} alt="Ouiorder Logo" />
          </div>
        )}
        {!transparent && searchVisible && (
          <button
            type="button"
            className={styles.searchBtn}
            onClick={onOpenSearchbar}
          >
            <img src={searchIcon} height="18" width="21" alt="searchIcon" />
          </button>
        )}
      </div>

      {!transparent && categoriesVisible && (
        <div className={styles.categories}>
          {categories.map((category) => (
            <Link
              key={category.id}
              className={styles.categoryLink}
              activeClassName={styles.categoryLinkActive}
              to={`${urls.menu}/${category.id}`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
