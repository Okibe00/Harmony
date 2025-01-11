import './header.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { loginContext } from '../../loginContext';


/**
 * 
 * This is tempory measure the app component has not been structured correctly
 * using context in this way may not be the best approach, there's a number of unnecessary re-render */

export default function Header() {
  const user = useContext(loginContext);
  const [btnText, setBtnText] = useState('Login');
  const navigate = useNavigate();
  console.log(user.isLoggedIn);
  useEffect(() => {
    if (user.isLoggedIn === true) {
      setBtnText('Logout')
    } else {
      setBtnText('Login')
    }
  }, [user.isLoggedIn]);
  const logout = async () => {
    const response = await fetch('http://localhost:5000/api/auth/logout/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (response.ok) {
      user.isLoggedIn = false;
    }
  };

  return (
    <nav>
      <div className="nav-link">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </div>
      <div className="login-logout-btn">
        {user.isLoggedIn ? (
          <button className="" onClick={
            () => {
              logout()
              navigate('/login');
              setBtnText('login')
            }}>
            {btnText}
          </button>
        ) : (
          <button
            className=""
              onClick={() => {
              navigate('/login');
              setBtnText('Login');
            }}
          >
            {btnText}
          </button>
        )}
      </div>
    </nav>
  );
}
