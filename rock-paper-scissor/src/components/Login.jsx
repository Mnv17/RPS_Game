import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  //   if (loggedInUser) {
  //     toast.success('User is logged in. Redirecting...');
  //     navigate('/');
  //   }
  // }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      console.log('Login successful. Redirecting...');

      localStorage.setItem('loggedInUser', JSON.stringify(user));

      toast.success('Login successful!');
      setTimeout(() => {
        setLoading(false);
        navigate('/');
      }, 1000);
    } else {
      setLoading(false);
      toast.error('Invalid email or password');
    }
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <ToastContainer />
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
};

export default Login;
