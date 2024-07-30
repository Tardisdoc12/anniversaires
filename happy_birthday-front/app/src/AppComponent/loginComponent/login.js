import React, { useState } from 'react';
import { login } from '../../services/birthdayApiService';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
        // Stocker le token JWT dans le localStorage ou dans un cookie
        localStorage.setItem('token', result.token);
      setMessage('Login successful');
      navigate("/")

    } else if (!result.success) {
      setMessage(result.message);
    }else{
        setMessage('Login failed')
    }
  };

  return (
    <div className="Login-container">
      <h2>Login</h2>
      <form onSubmit={handlelogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginComponent;
