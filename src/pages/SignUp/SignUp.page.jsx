import { useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import sharedStyles from '../../styles/LoginSignUpShared.module.css';

import {
  Input,
  PasswordInput,
  FormRow,
  Button,
  Container,
  Link,
  FullPageLoader,
} from '../../components';
import urls from '../../config/urls';
import logoImg from '../../images/Ouiorder_logo_horiz.svg';
import { authOperations, authSelectors } from '../../redux/auth';

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
    .max(255, 'Password must be at most 255 characters')
    .required('Password is required'),
});

export default function SignUpPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const loading = useSelector(authSelectors.getLoading);

  const formRef = useRef();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData(formRef.current);
      dispatch(authOperations.signUp(formData));
    },
  });

  return (
    <Container>
      {formik.isSubmitting && loading ? (
        <FullPageLoader isDimmerActive />
      ) : (
        <div className={sharedStyles.container}>
          <div className={sharedStyles.logoBox}>
            <img
              className={sharedStyles.logo}
              src={logoImg}
              alt="Ouiorder Logo"
            />
          </div>
          <form
            ref={formRef}
            className={sharedStyles.form}
            onSubmit={formik.handleSubmit}
          >
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
              />
            </FormRow>
            <FormRow>
              <Input
                type="tel"
                required
                autoComplete="tel"
                placeholder={t('Phone')}
                name="phone"
                value={formik.values.phone}
                error={formik.touched.phone && t(formik.errors.phone)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormRow>
            <FormRow>
              <PasswordInput
                required
                autoComplete="new-password"
                placeholder={t('Password')}
                name="password"
                value={formik.values.password}
                error={formik.touched.password && t(formik.errors.password)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormRow>
            <Button type="submit" className={sharedStyles.submitBtn}>
              {t('Sign Up')}
            </Button>
          </form>
          <div className={sharedStyles.content_link}>
            <p className={sharedStyles.text}>{t('Already have an account')}?</p>
            <Link
              className={sharedStyles.link_text}
              to={urls.login}
              prefix={false}
            >
              {t('Login')}
            </Link>
          </div>
        </div>
      )}
    </Container>
  );
}
