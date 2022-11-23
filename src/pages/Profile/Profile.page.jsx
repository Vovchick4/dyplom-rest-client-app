import { useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link as RLink } from 'react-router-dom';

import styles from './Profile.module.css';

import { NavbarContext } from '../../context/Navbar.context';
import {
  Container,
  Input,
  PasswordInput,
  Button,
  FormRow,
  FullPageLoader,
} from '../../components';
import urls from '../../config/urls';
import { authOperations, authSelectors } from '../../redux/auth';
import userIcon from '../../images/ic-user-grey.svg';
import mailIcon from '../../images/ic-mail.svg';
import phoneIcon from '../../images/ic-phone.svg';
import arrow from '../../images/arrow-back.svg';

import { CgLock } from 'react-icons/cg';
import { MdPayment } from 'react-icons/md';
import { IoMdExit } from 'react-icons/io';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Name must be at least 1 character')
    .trim()
    .max(255, 'Name must be at most 255 characters')
    .required('Name is required'),
  email: Yup.string()
    .trim()
    .email('Email must be a valid email')
    .required('Email is required'),
  phone: Yup.string()
    .trim()
    .min(1, 'Phone number must be at least 1 character')
    .max(255, 'Phone number must be at most 255 characters')
    .required('Phone number is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(255, 'Password must be at most 255 characters'),
});

export default function ProfilePage() {
  const { setTitle, setBackVisible } = useContext(NavbarContext);
  const loading = useSelector(authSelectors.getLoading);
  const user = useSelector(authSelectors.getUser);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    setTitle(`${t(`Hi`)}, ${user.name}!`);
    setBackVisible(true);

    return () => {
      setTitle('');
      setBackVisible(false);
    };
  }, [setTitle, setBackVisible, user, t]);

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      let data = { ...values };

      if (values.password === '') {
        delete data.password;
      }

      dispatch(authOperations.updateProfile({ ...data, _method: 'PATCH' }));
    },
  });

  return (
    <div className={styles.wrapper}>
      {loading && <FullPageLoader isDimmerActive />}

      {!loading && (
        <>
          <Container>
            <form onSubmit={formik.handleSubmit} id="userForm">
              <FormRow>
                <Input
                  type="text"
                  name="name"
                  required
                  autoComplete="off"
                  value={formik.values.name}
                  error={formik.touched.name && t(formik.errors.name)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={t('Name')}
                  leftAdornment={
                    <img src={userIcon} height="22" alt="userIcon" />
                  }
                />
              </FormRow>
              <FormRow>
                <Input
                  type="email"
                  name="email"
                  placeholder={t('Email')}
                  required
                  autoComplete="email"
                  value={formik.values.email}
                  error={formik.touched.email && t(formik.errors.email)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  leftAdornment={
                    <img src={mailIcon} height="18" alt="mailIcon" />
                  }
                />
              </FormRow>
              <FormRow>
                <Input
                  type="tel"
                  placeholder={t('Phone')}
                  leftAdornment={
                    <img src={phoneIcon} height="22" alt="phoneIcon" />
                  }
                  required
                  autoComplete="tel"
                  name="phone"
                  value={formik.values.phone}
                  error={formik.touched.phone && t(formik.errors.phone)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </FormRow>
              <FormRow>
                <PasswordInput
                  placeholder={t('Password')}
                  autoComplete="new-password"
                  name="password"
                  leftAdornment={
                    <CgLock size={24} className={styles.input_icon} />
                  }
                  value={formik.values.password}
                  error={formik.touched.password && t(formik.errors.password)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </FormRow>

              <Button
                component={RLink}
                to={urls.paymentMethod}
                className={styles.link_paymethod}
              >
                <div className={styles.link_paymethod_left}>
                  <MdPayment className={styles.link_paymethod_icon} />
                  <span className={styles.link_paymethod_label}>
                    {t('Pay method')}
                  </span>
                </div>
                <img
                  className={styles.arrow_icon}
                  src={arrow}
                  height="16"
                  alt="arrow_icon"
                />
              </Button>

              <Button
                className={styles.exit_button}
                onClick={() => dispatch(authOperations.logout())}
              >
                <IoMdExit className={styles.exit_icon} />
                <span className={styles.exit_label}>{t('Exit')}</span>
              </Button>
            </form>
          </Container>

          <Button
            form="userForm"
            type="submit"
            className={styles.confirm_button}
          >
            {t('Save Changes')}
          </Button>
        </>
      )}
    </div>
  );
}
