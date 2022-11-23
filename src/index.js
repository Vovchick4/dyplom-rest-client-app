import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import './config/i18n';

import 'react-toastify/dist/ReactToastify.css';
import 'normalize.css';
import './styles/variables.css';
import './styles/index.css';
import './styles/toast.css';
import './config/axios';

import { NavbarContextProvider } from './context/Navbar.context';
import { store, persistor } from './redux/store';
import { App } from './components';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavbarContextProvider>
          <App />
        </NavbarContextProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
