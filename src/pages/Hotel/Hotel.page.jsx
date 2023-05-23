import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import styles from './Hotel.module.css';
import { NavbarContext } from '../../context/Navbar.context';
import {
  Container,
  OrderButton,
  Button,
  Link,
  FullPageLoader,
} from '../../components';
import HotelCard from './HotelCard';
import { hotelOperations, hotelSelectors } from '../../redux/hotel';
import { orderSelectors } from '../../redux/order';
import urls from '../../config/urls';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { authSelectors } from '../../redux/auth';

export default function HotelPage() {
  const { categories, setSearchVisible } = useContext(NavbarContext);
  const { hotelSlug } = useParams();

  const dispatch = useDispatch();
  const user = useSelector(authSelectors.getUser);
  const hotel = useSelector(hotelSelectors.getHotel);
  const isCallWaiter =
    hotel?.settings === null ? true : hotel?.settings?.callWaiter;
  const isLeaveTable =
    hotel?.settings === null ? true : hotel?.settings?.billRequest;
  const hotelLoading = useSelector(hotelSelectors.getLoading);
  const totalAmount = useSelector(orderSelectors.getTotalAmount);
  const totalPrice = useSelector(orderSelectors.getTotalPrice);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    setSearchVisible(true);

    return () => {
      setSearchVisible(false);
    };
  }, [setSearchVisible]);

  useEffect(() => {
    dispatch(hotelOperations.fetchDetails(hotelSlug));
  }, [dispatch, hotelSlug, i18n.language]);

  function callWaiter() {
    const data = {
      table_number: Number(sessionStorage.getItem('tableNumber')),
      rest_id: hotel.id,
      category: 'waiter',
    };
    if (user !== null) {
      data['client_id'] = user.id;
    }
    axios({
      url: 'tables',
      method: 'POST',
      data,
    })
      .then((res) => toast('The waiter is called'))
      .catch((err) => toast.error(getErrorMessage(err)));
  }

  function leaveTable() {
    const data = {
      table_number: Number(sessionStorage.getItem('tableNumber')),
      rest_id: hotel.id,
      category: 'bill_request',
    };
    if (user !== null) {
      data['client_id'] = user.id;
    }
    axios({
      url: 'tables',
      method: 'POST',
      data,
    })
      .then((res) => toast('Bill was asked'))
      .catch((err) => toast.error(getErrorMessage(err)));
  }

  return (
    <Container>
      {hotelLoading && <FullPageLoader isDimmerActive />}

      <div className={styles.waiterButtons}>
        {isCallWaiter && (
          <Button variant="outline" onClick={callWaiter}>
            {t('Call waiter')}
          </Button>
        )}
        {isLeaveTable && (
          <Button variant="outline" onClick={leaveTable}>
            {t('Leave table')}
          </Button>
        )}
      </div>

      {!hotelLoading && (
        <div className={styles.grid_content}>
          {categories.map((item) => (
            <HotelCard
              key={item.id}
              id={item.id}
              img={item.image}
              title={item.name}
            />
          ))}
        </div>
      )}

      {totalPrice > 0 && (
        <div className={styles.content_button}>
          <OrderButton
            totalAmount={totalAmount}
            totalPrice={totalPrice}
            component={Link}
            to={urls.cart}
            label={t('Order')}
          />
        </div>
      )}
    </Container>
  );
}
