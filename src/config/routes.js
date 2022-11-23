import { lazy } from 'react';

import urls from './urls';

const routes = [
  {
    path: urls.notFound,
    exact: true,
    component: lazy(() => import('../pages/NotFound')),
    private: false,
    restricted: false,
    prefix: false,
  },
  {
    path: urls.signup,
    exact: true,
    component: lazy(() =>
      import('../pages/SignUp' /* webpackChunkName: 'SignUp' */)
    ),
    private: false,
    restricted: true,
    prefix: false,
  },
  {
    path: urls.login,
    exact: true,
    component: lazy(() =>
      import('../pages/LogIn' /* webpackChunkName: 'LogIn' */)
    ),
    private: false,
    restricted: true,
    prefix: false,
  },
  {
    path: urls.cart,
    exact: true,
    component: lazy(() =>
      import('../pages/Cart' /* webpackChunkName: 'Cart' */)
    ),
    private: false,
    restricted: false,
    prefix: true,
  },
  {
    path: urls.hotel,
    exact: true,
    component: lazy(() =>
      import('../pages/Hotel' /* webpackChunkName: 'Hotel' */)
    ),
    private: false,
    restricted: false,
    prefix: true,
  },
  {
    path: urls.menu + '/:menuId',
    exact: true,
    component: lazy(() =>
      import('../pages/Menu' /* webpackChunkName: 'Menu' */)
    ),
    private: false,
    restricted: false,
    prefix: true,
  },
  {
    path: urls.order + '/:orderId',
    exact: true,
    component: lazy(() =>
      import('../pages/Order' /* webpackChunkName: 'Order' */)
    ),
    private: false,
    restricted: false,
    prefix: true,
  },
  {
    path: urls.profile,
    exact: true,
    component: lazy(() =>
      import('../pages/Profile' /* webpackChunkName: 'Profile' */)
    ),
    private: true,
    restricted: false,
    prefix: true,
  },
  {
    path: urls.paymentMethod,
    exact: true,
    component: lazy(() =>
      import('../pages/PaymentMethod' /* webpackChunkName: 'PaymentMethod' */)
    ),
    private: true,
    restricted: false,
    prefix: false,
  },
  {
    path: urls.addCreditCard,
    exact: true,
    component: lazy(() =>
      import('../pages/AddCreditCard' /* webpackChunkName: 'AddCreditCard' */)
    ),
    private: true,
    restricted: false,
    prefix: false,
  },
  {
    path: urls.billingTicket,
    exact: true,
    component: lazy(() =>
      import('../pages/BillingTicket' /* webpackChunkName: 'BillingTicket' */)
    ),
    private: false,
    restricted: false,
    prefix: false,
  },
];

export default routes;
