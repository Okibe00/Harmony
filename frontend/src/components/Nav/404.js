/**
 * @description default error page
 */

import './404.css';
import { NavLink } from 'react-router-dom';

const Nomatch = () => {
  return (
    <div class="container">
      <h1 className='error-code'>404</h1>
      <h2 className='error-header'>Oops! Page Not Found</h2>
      <p>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <NavLink to={'/'} className={'btn'}>Go to Homepage</NavLink>
    </div>
  );
};
export default Nomatch;
