import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResetPassword.css';
import axios from 'axios';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://attendapp-backend.cloud-stacks.com/api/auth/reset-password', {
        email
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setSuccess(true);
      setError('');
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to reset password');
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      {success ? (
        <div className="success-message">
          Password reset link sent! Please check your email.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="reset-password-form">
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="reset-password-button">Reset Password</button>
        </form>
      )}
    </div>
  );
}

export default ResetPassword;
