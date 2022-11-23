import { useEffect } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';

import { Layout, PrivateRoute, PublicRoute } from '../';
import routes from '../../config/routes';
import urls from '../../config/urls';
import { authOperations } from '../../redux/auth';
import { hotelSelectors } from '../../redux/hotel';
import { languageSelectors } from '../../redux/language';

export default function App() {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const language = useSelector(languageSelectors.getLocale);
  const hotel = useSelector(hotelSelectors.getHotel);

  useEffect(() => {
    dispatch(authOperations.getUser());
  }, [dispatch]);

  useEffect(() => {
    if (!language) return;

    i18n.changeLanguage(language);
  }, [i18n, language]);

  // SET THEME
  useEffect(() => {
    const activeTheme =
      hotel?.settings === null || hotel?.settings?.theme === undefined
        ? 'green'
        : hotel?.settings?.theme;

    document.documentElement.className = `${activeTheme}-theme`;
  }, [hotel]);

  return (
    <Layout>
      <Switch>
        {routes.map(({ component: Component, path, prefix, ...route }) =>
          route.private ? (
            <PrivateRoute
              key={path}
              path={prefix ? '/:hotelSlug' + path : path}
              {...route}
            >
              <Component />
            </PrivateRoute>
          ) : (
            <PublicRoute
              key={path}
              path={prefix ? '/:hotelSlug' + path : path}
              {...route}
            >
              <Component />
            </PublicRoute>
          )
        )}

        <Redirect to={urls.notFound} />
      </Switch>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Layout>
  );
}
