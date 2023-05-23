import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import styles from './Menu.module.css';

import { OrderButton, Container, FullPageLoader, Link } from '../../components';
import { NavbarContext } from '../../context/Navbar.context';
import MenuCard from './MenuCard/MenuCard';

import { orderSelectors } from '../../redux/order';
import { hotelSelectors } from '../../redux/hotel';
import urls from '../../config/urls';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../utils/getErrorMessage';

export default function MenuPage() {
  const {
    setTitle,
    setBackVisible,
    setBackVisibleMenu,
    setSearchVisible,
    setCategoriesVisible,
  } = useContext(NavbarContext);
  const [plates, setPlates] = useState([]);
  const [loading, setLoading] = useState(false);

  const { menuId } = useParams();
  const hotel = useSelector(hotelSelectors.getHotel);
  const cart = useSelector(orderSelectors.getAddToCart);

  const totalAmount = useSelector(orderSelectors.getTotalAmount);
  const totalPrice = useSelector(orderSelectors.getTotalPrice);

  const { t } = useTranslation();

  useEffect(() => {
    setTitle(<Link to={urls.hotel}>Menu</Link>);
    setBackVisible(true);
    setBackVisibleMenu(true);
    setSearchVisible(true);
    setCategoriesVisible(true);

    return () => {
      setTitle('');
      setBackVisible(false);
      setBackVisibleMenu(false);
      setSearchVisible(false);
      setCategoriesVisible(false);
    };
  }, [
    setTitle,
    setBackVisible,
    setBackVisibleMenu,
    setSearchVisible,
    setCategoriesVisible,
    menuId,
  ]);

  useEffect(() => {
    if (!hotel) return;

    setLoading(true);
    axios({
      url: `/restaurants/${hotel.id}/plates`,
      method: 'GET',
      params: {
        category_id: menuId,
      },
    })
      .then((res) => {
        setPlates(res.data.data);
      })
      .catch((err) => toast.error(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, [menuId, hotel]);

  return (
    <div className={styles.content}>
      {loading && <FullPageLoader isDimmerActive />}

      {!loading && plates && plates.length > 0 && (
        <div className={styles.grid_content}>
          {plates.map((plate) => {
            const orderItem = cart[plate.id];

            return (
              <MenuCard
                key={plate.id}
                bordered={false}
                isActive={!!orderItem}
                orderItem={orderItem}
                plate={plate}
                {...plate}
              />
            );
          })}
        </div>
      )}

      <Container>
        <div className={styles.content_button}>
          <OrderButton
            totalPrice={totalPrice}
            totalAmount={totalAmount}
            component={Link}
            to={urls.cart}
            label={t('Order')}
          />
        </div>
      </Container>
    </div>
  );
}
