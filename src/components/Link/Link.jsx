import { createElement } from 'react';
// eslint-disable-next-line no-unused-vars
import { Link as RLink, NavLink, NavLinkProps } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { hotelSelectors } from '../../redux/hotel';

/**
 *
 * @param {NavLinkProps} props
 * @returns
 */
export default function Link({
  as,
  children,
  to,
  activeClassName,
  prefix = true,
  ...props
}) {
  const hotel = useSelector(hotelSelectors.getHotel);
  const hotelLoading = useSelector(hotelSelectors.getLoading);

  if (!hotel || hotelLoading) {
    return null;
  }

  let pathname = prefix ? `/${hotel.slug}${to}` : to;
  if (typeof to === 'object') {
    pathname = {
      ...to,
      pathname: prefix ? `/${hotel.slug}${to.pathname}` : to,
    };
  }

  if (activeClassName) {
    return createElement(
      as ? as : NavLink,
      {
        to: pathname,
        activeClassName: activeClassName,
        ...props,
      },
      children
    );
  } else {
    return createElement(
      as ? as : RLink,
      {
        to: pathname,
        ...props,
      },
      children
    );
  }
}
