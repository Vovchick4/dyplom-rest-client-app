import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import sharedStyles from '../../styles/LoginSignUpShared.module.css';
import styles from './LogIn.module.css';

import {
  Input,
  PasswordInput,
  FormRow,
  Button,
  Container,
  Link,
} from '../../components';
import urls from '../../config/urls';
import logoImg from '../../images/Ouiorder_logo_horiz.svg';
import { authOperations, authSelectors } from '../../redux/auth';

import { FaFacebookF } from 'react-icons/fa';
import { GrTwitter } from 'react-icons/gr';

const validationSchema = Yup.object().shape({
  email_or_phone: Yup.string().trim().required('Email or Phone is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(255, 'Password must be at most 255 characters')
    .required('Password is required'),
});

export default function LogInPage() {
  const dispatch = useDispatch();

  const loading = useSelector(authSelectors.getLoading);

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      email_or_phone: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(authOperations.login(values));
    },
  });

  function resetPassword() {
    if (!formik.values.email_or_phone || formik.errors.email_or_phone) {
      toast(t('Enter valid email or phone'));
      return;
    }

    dispatch(authOperations.resetPassword(formik.values.email_or_phone));
  }

  return (
    <Container>
      <div className={sharedStyles.container}>
        <div className={sharedStyles.logoBox}>
          <img
            className={sharedStyles.logo}
            src={logoImg}
            alt="Ouiorder Logo"
          />
        </div>
        <form className={sharedStyles.form} onSubmit={formik.handleSubmit}>
          <FormRow>
            <Input
              type="text"
              placeholder={t('Email or Phone')}
              name="email_or_phone"
              required
              autoComplete="username"
              value={formik.values.email_or_phone}
              error={
                formik.touched.email_or_phone && formik.errors.email_or_phone
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading}
            />
          </FormRow>
          <FormRow>
            <PasswordInput
              required
              autoComplete="new-password"
              placeholder={t('Password')}
              name="password"
              value={formik.values.password}
              error={formik.touched.password && formik.errors.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading}
            />
          </FormRow>

          <Button
            type="submit"
            className={sharedStyles.submitBtn}
            isLoading={loading}
          >
            {t('Login')}
          </Button>

          <FormRow>
            <p className={styles.forgotPassword} onClick={resetPassword}>
              {t('Forgot Password')}?
            </p>
          </FormRow>
        </form>
        <div className={sharedStyles.content_link}>
          <p className={sharedStyles.text}>{t("Don't have account")}?</p>
          <Link
            className={sharedStyles.link_text}
            to={urls.signup}
            prefix={false}
          >
            {t('Sign Up')}
          </Link>
        </div>

        <div className={sharedStyles.border_or}>
          <p className={sharedStyles.text_or}>{t('or')}</p>
        </div>

        <div className={styles.content_buttons}>
          <Button className={styles.facebookButton}>
            <span className={styles.button_icon}>
              <FaFacebookF />
            </span>
            {t('Login with')} Facebook
          </Button>
          <Button className={styles.twitterButton}>
            <span className={styles.button_icon}>
              <GrTwitter />
            </span>
            {t('Login with')} Twitter
          </Button>
        </div>
      </div>
    </Container>
  );
}
