import { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import styles from './Cart.module.css';

import { NavbarContext } from '../../context/Navbar.context';
import {
  Container,
  Input,
  Select,
  Checkbox,
  FormRow,
  Button,
  FullPageLoader,
} from '../../components';
import {
  orderOperations,
  orderSelectors,
  orderActions,
} from '../../redux/order';
import { hotelSelectors } from '../../redux/hotel';
import { authSelectors } from '../../redux/auth';
import CartCard from './CartCard/CartCard';
import { paymentMethod } from '../../constants/paymentMethod';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Name must be at least 1 character')
    .trim()
    .max(255, 'Name must be at most 255 characters')
    .required('Name is required'),
  person_quantity: Yup.number('Person quantity must be a number').min(
    1,
    'Person quantity must be at least 1'
  ),
  // .required('Person quantity is required'),
  people_for_quantity: Yup.number('People for quantity must be a number').min(
    1,
    'People for quantity must be at least 1'
  ),
  // .required('People for quantity is required'),
});

export default function CartPage() {
  const { setTitle, setBackVisible } = useContext(NavbarContext);

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const user = useSelector(authSelectors.getUser);
  const hotel = useSelector(hotelSelectors.getHotel);
  const cart = useSelector(orderSelectors.getAddToCart);
  const loading = useSelector(orderSelectors.getOrderLoad);
  const totalPrice = useSelector(orderSelectors.getTotalPrice);

  const history = useHistory();

  const payMethodOptions = [
    {
      value: paymentMethod.GooglePay,
      name: 'Google Pay',
      render: hotel?.settings === null ? true : hotel?.settings.appleGooglePay,
      is_online_payment: 1,
      url: 'https://apiouiorder.astwellsoft.com/test/googlepay',
    },
    {
      value: paymentMethod.ApplePay,
      name: 'Apple Pay',
      render: hotel?.settings === null ? true : hotel?.settings.appleGooglePay,
      is_online_payment: 1,
      url: '',
    },
    {
      value: paymentMethod.PayPal,
      name: 'PayPal',
      render: hotel?.settings === null ? true : hotel?.settings.paypal,
      is_online_payment: 1,
      url: '',
    },
    // {
    //   value: paymentMethod.Card,
    //   name: 'Card',
    //   render: true,
    //   is_online_payment: 1,
    //   url: '',
    // },
    {
      value: paymentMethod.Cash,
      name: 'Cash',
      render: true,
      is_online_payment: 0,
      url: '',
    },
  ];

  useEffect(() => {
    setTitle('Cart');
    setBackVisible(true);

    return () => {
      setTitle('');
      setBackVisible(false);
    };
  }, [setTitle, setBackVisible]);

  const formik = useFormik({
    initialValues: {
      name: '',
      person_quantity: 1,
      people_for_quantity: 1,
      is_takeaway: false,
      paymentMethod: payMethodOptions.find(
        ({ value, render }) =>
          Object.values(paymentMethod).includes(value) && render
      ),
    },
    validationSchema,
    onSubmit: (values) => {
      if (!hotel) return;

      const formattedOrderItems = Object.entries(cart).reduce(
        (prev, [plateId, cartItem]) => {
          return {
            ...prev,
            [plateId]: {
              amount: cartItem.amount,
              price: cartItem.plate.price,
              comment: cartItem.comment,
            },
          };
        },
        {}
      );

      // const formattedValues = validationSchema.cast(values);

      const orderData = {
        table: sessionStorage.getItem('tableNumber'),
        name: values.name,
        person_quantity: values.person_quantity,
        people_for_quantity: values.people_for_quantity,
        is_online_payment: values.paymentMethod.is_online_payment,
        is_takeaway: values.is_takeaway ? 1 : 0,
        plates: formattedOrderItems,
        restaurant_id: hotel.id,
      };
      dispatch(orderOperations.order(orderData, history));
    },
  });

  useEffect(() => {
    if (!user) return;
    const paymentMethod = payMethodOptions.find(
      ({ value, render }) => value === user.payment_method && render
    );

    if (paymentMethod) {
      formik.setFieldValue('paymentMethod', paymentMethod);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  function handleChangePayMethod(value) {
    formik.setFieldValue('paymentMethod', value);
  }

  function incrementAmount(orderId) {
    dispatch(orderActions.incrementAmount(orderId));
  }

  function decrementAmount(orderId) {
    dispatch(orderActions.decrementAmount(orderId));
  }

  return (
    <Container>
      {formik.isSubmitting && loading ? (
        <FullPageLoader isDimmerActive />
      ) : (
        <>
          <div className={styles.grid_content}>
            {Object.entries(cart).map(([plateId, cartItem]) => (
              <CartCard
                key={plateId}
                {...cartItem}
                quantity={cartItem.plate.quantity}
                increment={incrementAmount}
                decrement={decrementAmount}
              />
            ))}
          </div>

          <div className={styles.container_total}>
            <p className={styles.total}>Total:</p>
            <p className={styles.price}>€{totalPrice}</p>
          </div>

          <form className={styles.form} onSubmit={formik.handleSubmit}>
            {formik.values.is_takeaway && (
              <FormRow>
                <Input
                  type="text"
                  name="name"
                  placeholder={t('Name')}
                  required
                  autoComplete="off"
                  value={formik.values.name}
                  error={formik.touched.name && t(formik.errors.name)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </FormRow>
            )}

            <FormRow>
              <Input
                type="number"
                name="person_quantity"
                placeholder={t('People for quantity is required')}
                required
                autoComplete="off"
                value={formik.values.person_quantity}
                error={
                  formik.touched.person_quantity &&
                  t(formik.errors.person_quantity)
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormRow>

            <FormRow>
              <Input
                type="number"
                name="people_for_quantity"
                placeholder={t('People for quantity is required')}
                required
                autoComplete="off"
                value={formik.values.people_for_quantity}
                error={
                  formik.touched.people_for_quantity &&
                  t(formik.errors.people_for_quantity)
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormRow>

            <FormRow>
              <Checkbox
                label={t('Is takeaway')}
                name="is_takeaway"
                checked={formik.values.is_takeaway}
                onChange={formik.handleChange}
              />
            </FormRow>

            <FormRow>
              <Select
                options={payMethodOptions}
                value={formik.values.paymentMethod}
                onChange={handleChangePayMethod}
              />
            </FormRow>

            {/* {formik.values.paymentMethod.url && (
              <iframe
                src={formik.values.paymentMethod.url}
                title={formik.values.paymentMethod.name}
                allowpaymentrequest=""
                style={{
                  border: 'none',
                  height: 80,
                }}
              />
            )} */}

            <Button type="submit" className={styles.submitBtn}>
              {t('Confirm')}
            </Button>
          </form>
        </>
      )}
    </Container>
  );
}
