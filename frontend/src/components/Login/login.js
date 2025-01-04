/**
 * login screen
 *
 */
import './Login.css';
import { useState } from 'react';
import Button from '../Button/button.js';
const config= {label: 'submit',type:'submit'}
export default function Login() {
  const [currentUser, setCurrentUser] = useState({
    user_name: '',
    password: ''
  })
  const handleSubmit = () => {
    //shoot a call to the user end point
    
  };
  const handleChange = (e) => {
    setCurrentUser({...currentUser, [e.target.name]: e.target.value});
  };
  return (
    <div className="login-container">
      <h1>Login</h1>
      <label htmlFor="name">Email</label>
      <input
        type="text"
        placeholder="Enter an email"
        onChange={(e) => handleChange(e)}
        required={true}
        name="email"
        id="email"
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
