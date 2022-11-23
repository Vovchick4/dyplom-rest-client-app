import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import styles from './Searchbar.module.css';
import ResultCard from './ResultCard';
import searchIcon from '../../images/ic-search.svg';
import cancelIcon from '../../images/ic-cancel.svg';
import { hotelSelectors } from '../../redux/hotel';
import { getErrorMessage } from '../../utils/getErrorMessage';

import { FullPageLoader } from '..';

export default function Searchbar({ onCancel }) {
  const [query, setQuery] = useState('');
  const [plates, setPlates] = useState([]);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const hotel = useSelector(hotelSelectors.getHotel);

  useEffect(() => {
    document.body.classList.add('no-scroll');

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  function changeQuery(e) {
    setQuery(e.target.value);
  }

  function clearQuery() {
    setQuery('');
  }

  useEffect(() => {
    if (query.trim() && hotel) {
      setLoading(true);
      axios({
        url: `/restaurants/${hotel.id}/plates/search/${query}`,
        method: 'GET',
      })
        .then((res) => {
          setPlates(res.data.data);
        })
        .catch((err) => toast.error(getErrorMessage(err)))
        .finally(() => setLoading(false));
    }
    return () => {
      setPlates([]);
    };
  }, [query, hotel]);

  return (
    <div className={styles.container}>
      <div className={styles.searchbar}>
        <div className={styles.content}>
          <img
            className={styles.searchIcon}
            src={searchIcon}
            height="18"
            width="21"
            alt="searchIcon"
          />
          <div className={styles.inputBox}>
            <input
              className={styles.input}
              type="search"
              placeholder={t('Search')}
              value={query}
              onChange={changeQuery}
            />
            <button
              className={styles.clearButton}
              type="button"
              onClick={clearQuery}
            >
              <img
                className={styles.searchIcon}
                src={cancelIcon}
                height="8"
                width="10"
                alt="searchIcon"
              />
            </button>
          </div>
          <button
            className={styles.cancelButton}
            type="button"
            onClick={onCancel}
          >
            {t('Cancel')}
          </button>
        </div>
      </div>

      {loading && <FullPageLoader />}

      <div className={styles.results}>
        <div className={styles.scrollable}>
          {!loading &&
            plates.map((plate) => <ResultCard key={plate.id} {...plate} />)}
        </div>
      </div>
    </div>
  );
}
