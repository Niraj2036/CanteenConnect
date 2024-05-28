import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.module.css';
import userIcon from '../assets/images/user-icon.png';
import emailIcon from '../assets/images/email-icon.png';
import mobileIcon from '../assets/images/phone-icon.png';
import passwordIcon from '../assets/images/password-icon.png';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/users/register', {
        name, email, mobileNo, password, confirmPassword
      });
      localStorage.setItem('token', response.data.token);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-header">SIGN UP</div>
      <form onSubmit={handleSignup}>
        {error && <p className="error-message">{error}</p>}
        <div className="input-container">
          <img src={userIcon} alt="User Icon" className="input-icon" />
          <input
            type="text"
            className="signup-input"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <img src={emailIcon} alt="Email Icon" className="input-icon" />
          <input
            type="email"
            className="signup-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <img src={mobileIcon} alt="Mobile Icon" className="input-icon" />
          <input
            type="tel"
            className="signup-input"
            placeholder="Mobile Number"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <img src={passwordIcon} alt="Password Icon" className="input-icon" />
          <input
            type="password"
            className="signup-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <img src={passwordIcon} alt="Password Icon" className="input-icon" />
          <input
            type="password"
            className="signup-input"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="signup-button">SIGN UP</button>
        <p className='signin'>Already have an account? <a className='signinlink' href="/login">Sign in</a></p>
      </form>
    </div>
  );
}

export default Signup;
