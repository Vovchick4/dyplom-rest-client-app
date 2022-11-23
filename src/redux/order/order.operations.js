import { toast } from 'react-toastify';
import axios from 'axios';

import { orderActions as actions } from '.';
import { getErrorMessage } from '../../utils/getErrorMessage';
import urls from '../../config/urls';

export const order = (values, history) => (dispatch) => {
  dispatch(actions.orderRequest());

  axios({
    method: 'POST',
    url: '/orders',
    data: values,
  })
    .then((res) => {
      dispatch(actions.orderSuccess(res.data));
      toast.success('Order created');
      history.push(urls.billingTicket);
    })
    .catch((err) => {
      const message = getErrorMessage(err);

      toast.warning(message);
      dispatch(actions.orderError(message));
    });
};
