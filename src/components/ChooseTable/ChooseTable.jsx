import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './ChooseTable.module.css';
import { Input, Button, FormRow } from '../';

export default function ChooseTable({ onSubmit }) {
  const [tableNumber, setTableNumber] = useState('');

  const { t } = useTranslation();

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(tableNumber);
  }

  return (
    <React.Fragment>
      <FormRow>
        <h2>{t('Choose Table')}</h2>
      </FormRow>

      <form className={styles.form} onSubmit={handleSubmit}>
        <FormRow>
          <Input
            type="number"
            min="0"
            placeholder={t('Type table number')}
            required
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
          />
        </FormRow>
        <Button type="submit">{t('Confirm')}</Button>
      </form>
    </React.Fragment>
  );
}
