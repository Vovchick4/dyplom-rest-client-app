import { useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './AddCreditCard.module.css';

import { NavbarContext } from '../../context/Navbar.context';
import { Button, Container, FormRow, Input } from '../../components';

import { AiOutlineUser } from 'react-icons/ai';
import { BsCreditCard } from 'react-icons/bs';
import { FiCalendar } from 'react-icons/fi';
import { FaRegAddressCard } from 'react-icons/fa';

export default function AddCreditCardPage() {
  const { setTitle, setBackVisible } = useContext(NavbarContext);

  const { t } = useTranslation();

  useEffect(() => {
    setTitle('ADD CREDIT CARD');
    setBackVisible(true);

    return () => {
      setTitle('');
      setBackVisible(false);
    };
  }, [setTitle, setBackVisible]);

  return (
    <div className={styles.wrapper}>
      <Container>
        <form>
          <FormRow>
            <Input
              variant="underline"
              type="text"
              leftAdornment={<AiOutlineUser />}
              placeholder="Card holder name"
            />
          </FormRow>

          <FormRow>
            <Input
              variant="underline"
              type="text"
              pattern="\d*"
              autoComplete="cc-number"
              leftAdornment={<BsCreditCard />}
              placeholder="Card"
            />
          </FormRow>

          <FormRow>
            <Input
              variant="underline"
              leftAdornment={<FiCalendar />}
              placeholder="MM/YY"
            />
            <Input
              variant="underline"
              leftAdornment={<FaRegAddressCard />}
              placeholder="CVV"
            />
          </FormRow>
        </form>
      </Container>

      <div className={styles.add_card}>
        <Button type="submit">{t('Add card')}</Button>
      </div>
    </div>
  );
}
