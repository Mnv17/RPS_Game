import './App.css';
import Navbar from './components/Navbar';
import RockPaperScissors from './components/RockPaperScissors';
import Pomodoro from './components/Pomodoro';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';import Login from './components/Login';
import Signup from './components/Signup';
import { ToastContainer } from 'react-toastify';
import Homepage from './components/Homepage';

function App() {

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  return (
    <div className="App">
 <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {loggedInUser ? (
            <>
              <Route path="/rock-paper-scissors" element={<RockPaperScissors />} />
              <Route path="/pomodoro" element={<Pomodoro />} />
              <Route path="/" element={<Homepage/>} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>
      <ToastContainer />
    </Router>
    </div>
  );
}

export default App;
