import { useState, useEffect } from 'react';
import "./HandCricket.css";

function HandCricket() {
  const [gamePhase, setGamePhase] = useState('toss');
  const [battingFirst, setBattingFirst] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [targetScore, setTargetScore] = useState(0);
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');

  useEffect(() => {
    const toss = Math.random() < 0.5 ? 'user' : 'computer';
    setBattingFirst(toss);
    setGamePhase('firstInnings');
  }, []);

  const handleUserChoice = (selectedNumber) => {
    if (gamePhase === 'firstInnings') {
      if (battingFirst === 'user') {
        // User batting, computer bowling
        const compChoice = Math.floor(Math.random() * 6) + 1;
        setUserChoice(selectedNumber);
        setComputerChoice(compChoice);

        if (selectedNumber === compChoice) {
          setTargetScore(userScore);
          setGamePhase('secondInnings');
        } else {
          setUserScore(prev => prev + selectedNumber);
        }
      } else {
        // Computer batting, user bowling
        const compChoice = Math.floor(Math.random() * 6) + 1;
        setUserChoice(selectedNumber);
        setComputerChoice(compChoice);

        if (selectedNumber === compChoice) {
          setTargetScore(computerScore);
          setGamePhase('secondInnings');
        } else {
          setComputerScore(prev => prev + compChoice);
        }
      }
    } else if (gamePhase === 'secondInnings') {
      if (battingFirst === 'user') {
        // Computer batting, user bowling
        const compChoice = Math.floor(Math.random() * 6) + 1;
        setUserChoice(selectedNumber);
        setComputerChoice(compChoice);

        if (selectedNumber === compChoice) {
          if (computerScore > targetScore) {
            setResult('Computer wins!');
          } else {
            setResult('You win!');
          }
          setGamePhase('result');
        } else {
          const newScore = computerScore + compChoice;
          setComputerScore(newScore);
          if (newScore > targetScore) {
            setResult('Computer wins!');
            setGamePhase('result');
          }
        }
      } else {
        // User batting, computer bowling
        const compChoice = Math.floor(Math.random() * 6) + 1;
        setUserChoice(selectedNumber);
        setComputerChoice(compChoice);

        if (selectedNumber === compChoice) {
          if (userScore > targetScore) {
            setResult('You win!');
          } else {
            setResult('Computer wins!');
          }
          setGamePhase('result');
        } else {
          const newScore = userScore + selectedNumber;
          setUserScore(newScore);
          if (newScore > targetScore) {
            setResult('You win!');
            setGamePhase('result');
          }
        }
      }
    }
  };

  const restartGame = () => {
    setGamePhase('toss');
    setBattingFirst(null);
    setUserScore(0);
    setComputerScore(0);
    setTargetScore(0);
    setUserChoice(null);
    setComputerChoice(null);
    setResult('');

    const toss = Math.random() < 0.5 ? 'user' : 'computer';
    setBattingFirst(toss);
    setGamePhase('firstInnings');
  };

  return (
    <div className="game-container">
      <h1 className=' text-2xl font-semibold'>Hand Cricket</h1>
      
      {gamePhase !== 'result' && (
        <div>
          <p className='mt-4'>Toss Result: {battingFirst === 'user' ? 'You bat first!' : 'Computer bats first!'}</p>
          <div className="scores">
            <p>Your Score: {userScore}</p>
            <p>Computer Score: {computerScore}</p>
            {gamePhase === 'secondInnings' && <p>Target: {targetScore}</p>}
          </div>

          {gamePhase === 'firstInnings' && (
            battingFirst === 'user' ? (
              <div>
                <h3>Your Batting Innings</h3>
                <p>Choose your shot:</p>
                <div className="buttons">
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <button className='game-btn' key={num} onClick={() => handleUserChoice(num)}>
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <h3>Computer&apos;s Batting Innings</h3>
                <p>Choose your bowl:</p>
                <div className="buttons">
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <button className='game-btn' key={num} onClick={() => handleUserChoice(num)}>
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            )
          )}

          {gamePhase === 'secondInnings' && (
            battingFirst === 'user' ? (
              <div>
                <h3>Computer&apos;s Chase</h3>
                <p>Choose your bowl:</p>
                <div className="buttons">
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <button className='game-btn' key={num} onClick={() => handleUserChoice(num)}>
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <h3>Your Chase</h3>
                <p>Choose your shot:</p>
                <div className="buttons">
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <button className='game-btn' key={num} onClick={() => handleUserChoice(num)}>
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            )
          )}

          {userChoice !== null && computerChoice !== null && (
            <div className="result">
              <p>You chose {userChoice}, Computer chose {computerChoice}</p>
              {userChoice === computerChoice ? (
                <p>Out! 🚨</p>
              ) : (
                <p>
                  {gamePhase === 'firstInnings' 
                    ? battingFirst === 'user' 
                      ? `You scored ${userChoice} runs!`
                      : `Computer scored ${computerChoice} runs!`
                    : battingFirst === 'user'
                      ? `Computer scored ${computerChoice} runs!`
                      : `You scored ${userChoice} runs!`
                  }
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {gamePhase === 'result' && (
        <div className="final-result">
          <h2>{result}</h2>
          <button className='game-btn mt-10' onClick={restartGame}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default HandCricket;