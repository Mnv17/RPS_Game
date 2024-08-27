import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    toast.success('😟 Come back again!');
    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {loggedInUser ? (
          <>
            <li className="navbar-item"><a className="navbar-link" href="/rock-paper-scissors">Rock Paper Scissors</a></li>
            <li className="navbar-item"><a className="navbar-link" href="/pomodoro">Pomodoro</a></li>
            <li className="navbar-item"><button className="navbar-button" onClick={handleLogout}>Logout</button></li>
            <ToastContainer />
          </>
        ) : (
          <>
            <li className="navbar-item"><a className="navbar-link" href="/login">Login</a></li>
            <li className="navbar-item"><a className="navbar-link" href="/signup">Sign Up</a></li>
          </>
        )}
      </ul>
      
    </nav>
  );
};

export default Navbar;
