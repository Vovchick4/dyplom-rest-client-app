import { toast } from 'react-toastify';
import axios from 'axios';

import { authActions as actions, authSelectors as selectors } from './';
import { setToken, unsetToken } from '../../config/axios';
import { getErrorMessage } from '../../utils/getErrorMessage';

/*
  "name": string,
  "email": string,
  "phone": string,
  "password": string,
*/
export const signUp = (values) => async (dispatch) => {
  try {
    dispatch(actions.signUpRequest());

    // Sign Up
    const { data: signUpData } = await axios({
      method: 'POST',
      url: '/auth/register',
      data: values,
    });

    // Confirm
    await axios.get(signUpData.link);
    setToken(signUpData.token.accessToken);
    dispatch(actions.signUpSuccess(signUpData));
    toast.success('Account created!');
  } catch (err) {
    const message = getErrorMessage(err);

    toast.warning(message);
    dispatch(actions.signUpError(message));
  }
};

export const login = (values) => (dispatch) => {
  dispatch(actions.loginRequest());

  axios({
    method: 'POST',
    url: '/auth/login',
    data: values,
  })
    .then((res) => {
      dispatch(actions.loginSuccess(res.data));
      setToken(res.data.token.accessToken);
      toast.success('You are logged in!');
    })
    .catch((err) => {
      const message = getErrorMessage(err);

      toast.warning(message);
      dispatch(actions.loginError(message));
    });
};

export const logout = () => (dispatch) => {
  dispatch(actions.logoutRequest());

  axios({
    method: 'POST',
    url: '/auth/logout',
  })
    .then((res) => {
      unsetToken();
      dispatch(actions.logoutSuccess());
      toast.success('You are logged out!');
    })
    .catch((err) => dispatch(actions.logoutError(err.message)));
};

export const resetPassword = (email) => (dispatch) => {
  dispatch(actions.resetPasswordRequest());

  axios({
    url: '/auth/password/reset',
    method: 'POST',
    data: {
      email,
    },
  })
    .then((res) => {
      toast(res.data.message);
      dispatch(actions.resetPasswordSuccess());
    })
    .catch((error) => {
      const message = getErrorMessage(error);
      toast.error(message);
      dispatch(actions.resetPasswordError(message));
    });
};

export const getUser = () => (dispatch, getState) => {
  const token = selectors.getToken(getState());
  if (!token) return;

  setToken(token.accessToken);

  dispatch(actions.getUserRequest());

  axios({
    method: 'GET',
    url: '/auth/get-user',
  })
    .then((res) => dispatch(actions.getUserSuccess(res.data)))
    .catch((error) => {
      unsetToken();
      const message = getErrorMessage(error);

      toast.error(message);
      dispatch(actions.getUserError(message));
    });
};

export const updateProfile = (values) => (dispatch) => {
  dispatch(actions.updateProfileRequest());

  axios({
    method: 'POST',
    url: '/clients/update',
    data: values,
  })
    .then((res) => {
      toast.success(res.data.message);
      dispatch(actions.updateProfileSuccess(res.data));
    })
    .catch((err) => {
      const message = getErrorMessage(err);

      toast.error(message);
      dispatch(actions.updateProfileError(message));
    });
};
