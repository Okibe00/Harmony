/**
 * @description handle user authentication management
*/

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(null);
  useEffect(() => {
    fetch('http://localhost:5000/api/auth/status/', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setIsAuth(data.authenticated)
      })
      .catch(() => setIsAuth(false));
  }, []);
  return isAuth;
};

export const Protected =  ({ children }) => {
  const isAuthenticated = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  if (isAuthenticated === null) {
    return <div>Loading...</div>
  }
  return isAuthenticated === true ?  children: null;
}
export default Protected;