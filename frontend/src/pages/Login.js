import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.module.css';
import userIcon from '../assets/images/email-icon.png';
import passwordIcon from '../assets/images/password-icon.png';
import loginIcon from '../assets/images/usericon.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">SIGN IN</div>
      <div className='login-icon'><img src={loginIcon} alt='icon' /></div>
      <form onSubmit={handleLogin}>
        {error && <p className="error-message">{error}</p>}
        <div className="input-container">
          <img src={userIcon} alt="User Icon" className="input-icon" />
          <input
            type="text"
            className="login-input"
            placeholder="Username/Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <img src={passwordIcon} alt="Password Icon" className="input-icon" />
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">LOGIN</button>
        <p className='sign'>Don't have account? <a className='signlink' href="/signup">create new</a></p>
      </form>
    </div>
  );
}

export default Login;
