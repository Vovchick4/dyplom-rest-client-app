import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './ChooseLanguage.module.css';

export default function ChooseLanguage({ onSelect }) {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <h2>{t('Choose language')}</h2>

      <div className={styles.languagesBox}>
        <button
          type="button"
          className={styles.languageBtn}
          onClick={() => onSelect('en')}
        >
          🇺🇸
        </button>
        <button
          type="button"
          className={styles.languageBtn}
          onClick={() => onSelect('fr')}
        >
          🇫🇷
        </button>
      </div>
    </React.Fragment>
  );
}
