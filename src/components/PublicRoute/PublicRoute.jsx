import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { authSelectors } from '../../redux/auth';
import { hotelSelectors } from '../../redux/hotel';
import urls from '../../config/urls';

export default function PublicRoute({ children, ...routeProps }) {
  const isAuthenticated = useSelector(authSelectors.isAuthenticated);
  const hotel = useSelector(hotelSelectors.getHotel);

  return (
    <Route {...routeProps}>
      {isAuthenticated && routeProps.restricted ? (
        <Redirect to={`${hotel.slug}${urls.hotel}`} />
      ) : (
        children
      )}
    </Route>
  );
}
