import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  SiMastercard,
  SiGooglepay,
  SiApplepay,
  SiPaypal,
} from 'react-icons/si';
import { useTranslation } from 'react-i18next';

import styles from './PaymentMethod.module.css';

import { NavbarContext } from '../../context/Navbar.context';
import { Button, Container, FullPageLoader } from '../../components';
import { authOperations, authSelectors } from '../../redux/auth';
import checkIcon from '../../images/ic-check.svg';
import cardCashGreenIcon from '../../images/ic-cash-green.svg';
import { paymentMethod } from '../../constants/paymentMethod';
import { hotelSelectors } from '../../redux/hotel';

export default function PaymentMethodPage() {
  const { setTitle, setBackVisible } = useContext(NavbarContext);

  const user = useSelector(authSelectors.getUser);
  const loading = useSelector(authSelectors.getLoading);
  const hotel = useSelector(hotelSelectors.getHotel);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    user.payment_method
  );

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const payMethodCards = [
    {
      value: paymentMethod.GooglePay,
      img: <SiGooglepay />,
      name: 'Google Pay',
      render: hotel?.settings === null ? true : hotel?.settings.appleGooglePay,
    },
    {
      value: paymentMethod.ApplePay,
      img: <SiApplepay />,
      name: 'Apple Pay',
      render: hotel?.settings === null ? true : hotel?.settings.appleGooglePay,
    },
    {
      value: paymentMethod.PayPal,
      img: <SiPaypal />,
      name: 'PayPal',
      render: hotel?.settings === null ? true : hotel?.settings.paypal,
    },
    // {
    //   value: paymentMethod.Card,
    //   img: <SiMastercard />,
    //   name: 'Card',
    //   render: true,
    // },
    {
      value: paymentMethod.Cash,
      img: <img src={cardCashGreenIcon} height="24" alt="cardCashGreenkIcon" />,
      name: 'Cash',
      render: true,
    },
  ];

  useEffect(() => {
    setTitle('PAY METHOD');
    setBackVisible(true);

    return () => {
      setTitle('');
      setBackVisible(false);
    };
  }, [setTitle, setBackVisible]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      authOperations.updateProfile({
        payment_method: selectedPaymentMethod,
        _method: 'PATCH',
      })
    );
  };

  return (
    <form onSubmit={handleSubmit} className={styles.wrapper}>
      {loading && <FullPageLoader isDimmerActive />}

      {!loading && (
        <>
          <Container>
            <div>
              {payMethodCards.map(
                (item) =>
                  item.render && (
                    <Button
                      key={item.value}
                      onClick={() => setSelectedPaymentMethod(item.value)}
                      className={styles.link_paymethod}
                      disabled={!user.verified_at}
                    >
                      <div className={styles.pay_method_button_title}>
                        <span className={styles.credit_card_icon}>
                          {item.img}
                        </span>
                        <span>{item.name}</span>
                      </div>
                      <span>
                        {selectedPaymentMethod === item.value && (
                          <div className={styles.select_content_approve}>
                            <img
                              src={checkIcon}
                              height="8"
                              width="12"
                              alt="checkIcon"
                            />
                          </div>
                        )}
                      </span>
                    </Button>
                  )
              )}
            </div>
          </Container>

          <Button
            type="submit"
            className={styles.save_button}
            disabled={!user.verified_at}
          >
            {t(!user.verified_at ? 'Verify your account' : 'Save')}
          </Button>
        </>
      )}
    </form>
  );
}
