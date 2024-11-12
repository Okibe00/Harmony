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
    <div className='login-cont'>
      <div className="login">
        <div className="input-box-cont">
          <h1>Login</h1>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter a username"
            onChange={(e) => handleChange(e)}
            required={true}
            name="user_name"
            id="name"
          /> <br />
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type="email"
            placeholder="Enter a email"
            onChange={(e) => handleChange(e)}
            required={true}
          /> <br />
          <Button
            config={config}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  )
}
