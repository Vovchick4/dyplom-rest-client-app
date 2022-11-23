import axios from 'axios';

axios.defaults.baseURL = 'http://dyplom-app-back/api/client';

export function setToken(token) {
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

export function unsetToken() {
  axios.defaults.headers.Authorization = null;
}

export function setLocale(lng) {
  axios.defaults.headers.locale = lng;
}
