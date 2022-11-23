import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import styles from './Order.module.css';

import { NavbarContext } from '../../context/Navbar.context';
import {
  Counter,
  Input,
  Container,
  OrderButton,
  FullPageLoader,
} from '../../components';
import { orderActions, orderSelectors } from '../../redux/order';
import { getErrorMessage } from '../../utils/getErrorMessage';

export default function OrderPage() {
  const { setTransparent, setBackVisible } = useContext(NavbarContext);
  const { orderId } = useParams();
  const [plate, setPlate] = useState([]);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation(0);

  const dispatch = useDispatch();
  const history = useHistory();

  const totalAmount = useSelector(orderSelectors.getTotalAmount);
  const totalPrice = useSelector(orderSelectors.getTotalPrice);
  const orders = useSelector(orderSelectors.getAddToCart);

  const [comment, setComment] = useState(
    orders[orderId] ? orders[orderId].comment : ''
  );
  const [count, setCount] = useState(
    orders[orderId] ? orders[orderId].amount : 1
  );

  useEffect(() => {
    setTransparent(true);
    setBackVisible(true);

    return () => {
      setTransparent(false);
      setBackVisible(false);
    };
  }, [setTransparent, setBackVisible]);

  useEffect(() => {
    setLoading(true);

    axios({
      url: `/plates/${orderId}`,
      method: 'GET',
    })
      .then((res) => {
        setPlate(res.data.data);
      })
      .catch((err) => toast.error(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, [orderId]);

  function addToCart() {
    const newOrder = {
      plate,
      amount: count,
      comment,
    };

    dispatch(orderActions.addToCart(newOrder));
    history.goBack();
  }

  return (
    <>
      {loading && <FullPageLoader isDimmerActive />}

      {!loading && (
        <div className={styles.wrapper}>
          <img className={styles.picture} src={plate.image} alt={plate.name} />

          <Container>
            <div className={styles.text}>
              <h3 className={styles.title}>{plate.name}</h3>
              <p className={styles.ingredients}>{plate.description}</p>
            </div>
            <div className={styles.container_textarea}>
              <Input
                multiline
                placeholder={t('Add comment')}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <div className={styles.counter}>
              <Counter count={count} setCount={setCount} />
            </div>

            <div className={styles.confirm_button}>
              <OrderButton
                totalPrice={totalPrice}
                totalAmount={totalAmount}
                component="button"
                type="button"
                label={t('Add to cart')}
                onClick={addToCart}
              />
            </div>
          </Container>
        </div>
      )}
    </>
  );
}
