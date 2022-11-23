import axios from 'axios';

import {
  hotelActions as actions,
  hotelSelectors as selectors,
} from '.';
import { orderActions } from '../order';
import { toast } from 'react-toastify';

export const fetchDetails = (hotelSlug) => (dispatch, getState) => {
  const hotel = selectors.getHotel(getState());

  if (hotel && hotel.slug !== hotelSlug) {
    dispatch(orderActions.clearCart());
  }

  dispatch(actions.fetchDetailsRequest());

  axios({
    method: 'GET',
    url: `/restaurants/${hotelSlug}`,
  })
    .then((res) => {
      dispatch(actions.fetchDetailsSuccess(res.data));
    })
    .catch((err) => {
      dispatch(actions.fetchDetailsError(err.message));
      toast.error(err.message);
    });
};
