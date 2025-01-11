/**
 * login screen
 *
 */
import './Login.css';
import { useContext, useState } from 'react';
import Button from '../Button/button.js';
import { useNavigate } from 'react-router-dom';
import { loginContext } from '../../loginContext.js';
const config = { label: 'submit', type: 'submit', class: 'login-btn' };

export default function Login() {
  const context = useContext(loginContext);
  const [user, setUser] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const response = await fetch('http://localhost:5000/api/auth/login/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    });

    if (response.ok) {
      context.user = user;
      context.isLoggedIn = true;
      navigate('/admin');
      alert("login successful");
      return;
    }
    alert('Login Failed');
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  
  return (
    <div className="login-container">
      <h1>Login</h1>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        placeholder="Enter username"
        onChange={(e) => handleChange(e)}
        required={true}
        name="username"
        id="username"
      />
      <label htmlFor="password">Password</label>
      <input
        name="password"
        id="password"
        type="password"
        placeholder="Enter password"
        onChange={(e) => handleChange(e)}
        required={true}
      />
      <Button config={config} handleSubmit={handleSubmit} />
    </div>
  );
}
