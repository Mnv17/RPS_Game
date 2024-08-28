import React, { useState } from 'react';
import { GiRock } from 'react-icons/gi';
import { LiaHandPaper } from 'react-icons/lia';
import { LiaHandScissors } from 'react-icons/lia';
import './RockPaperScissors.css';

const choices = ['Rock', 'Paper', 'Scissors'];

const choiceIcons = {
  Rock: <GiRock className="rps-icon" />,
  Paper: <LiaHandPaper className="rps-icon" />,
  Scissors: <LiaHandScissors className="rps-icon" />
};

const RockPaperScissors = () => {
  const [userChoice, setUserChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [result, setResult] = useState('');
  const [scores, setScores] = useState({ user: 0, computer: 0, draws: 0 });

  const getComputerChoice = () => choices[Math.floor(Math.random() * choices.length)];

  const determineWinner = (user, computer) => {
    if (user === computer) return "It's a Draw";
    if (
      (user === 'Rock' && computer === 'Scissors') ||
      (user === 'Paper' && computer === 'Rock') ||
      (user === 'Scissors' && computer === 'Paper')
    ) {
      return 'Yayy !! You Win..';
    }
    return 'Oops.. You Lose!!';
  };

  const handleChoice = (choice) => {
    const computer = getComputerChoice();
    setUserChoice(choice);
    setComputerChoice(computer);
    const outcome = determineWinner(choice, computer);
    setResult(outcome);
    updateScores(outcome);
  };

  const updateScores = (outcome) => {
    setScores(prevScores => {
      const newScores = { ...prevScores };
      if (outcome === 'Yayy !! You Win..') newScores.user += 1;
      else if (outcome === 'Oops.. You Lose!!') newScores.computer += 1;
      else newScores.draws += 1;
      localStorage.setItem('rpsScores', JSON.stringify(newScores));
      return newScores;
    });
  };

  const handleRestart = () => {
    setUserChoice('');
    setComputerChoice('');
    setResult('');
    setScores({ user: 0, computer: 0, draws: 0 });
    localStorage.removeItem('rpsScores');
  };

  React.useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem('rpsScores'));
    if (savedScores) setScores(savedScores);
  }, []);

  return (
    <div className="rps-container">
      <h1 className="rps-title">Rock, Paper, Scissors</h1>
      <div className="rps-choices">
        <button key="Rock" className="rps-button" onClick={() => handleChoice('Rock')}>
          <GiRock /> Rock
        </button>
        <button key="Paper" className="rps-button" onClick={() => handleChoice('Paper')}>
          <LiaHandPaper /> Paper
        </button>
        <button key="Scissors" className="rps-button" onClick={() => handleChoice('Scissors')}>
          <LiaHandScissors /> Scissors
        </button>
      </div>
      <strong className='result'>{result}!</strong>
      {userChoice && (
        
        <div className="rps-result">
         
          <div className="rps-player-box">
            <h3>You chose:</h3>
            {choiceIcons[userChoice]}
          </div>
          <div className="rps-player-box">
            <h3>Computer chose:</h3>
            {React.cloneElement(choiceIcons[computerChoice], {
              className: `rps-icon ${['Rock', 'Scissors'].includes(computerChoice) ? 'rps-icon-rotate' : ''}`
            })}
          </div>
          
        </div>
      )}
      <div className="rps-scoreboard">
        <p>User Wins: <span className="rps-score">{scores.user}</span></p>
        <p>Computer Wins: <span className="rps-score">{scores.computer}</span></p>
        <p>Draws: <span className="rps-score">{scores.draws}</span></p>
      </div>
      <button className="rps-restart" onClick={handleRestart}>Restart Game</button>
    </div>
  );
};

export default RockPaperScissors;
