export const getUser = (state) => state.auth.user;
export const getLoading = (state) => state.auth.loading;
export const getToken = (state) => state.auth.token;
export const isAuthenticated = (state) => !!state.auth.token;
