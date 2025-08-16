import  { useState, useEffect } from 'react';
import { RefreshCcw } from 'lucide-react';
import { useSelector } from 'react-redux';

function Game() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [gameState, setGameState] = useState('playing');
  const [winner, setWinner] = useState(null);
  const [playerSymbol, setPlayerSymbol] = useState('X');
  const [isComputerTurn, setIsComputerTurn] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [lastMove, setLastMove] = useState(null);

  const {user} = useSelector(store => store.auth);

  useEffect(() => {
    const randomSymbol = Math.random() < 0.5 ? 'X' : 'O';
    setPlayerSymbol(randomSymbol);
    setIsComputerTurn(randomSymbol === 'O');
  }, []);

  useEffect(() => {
    if (isComputerTurn && gameState === 'playing') {
      setIsThinking(true);
      const delay = Math.random() * 1000 + 500;
      
      const timeoutId = setTimeout(() => {
        makeComputerMove();
        setIsThinking(false);
      }, delay);

      return () => clearTimeout(timeoutId);
    }
  }, [isComputerTurn, gameState]);

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  const checkWinner = (squares) => {
    for (const [a, b, c] of winningCombinations) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const isBoardFull = (squares) => {
    return squares.every(square => square !== null);
  };

  const getComputerMove = (squares) => {
    const computerSymbol = playerSymbol === 'X' ? 'O' : 'X';
    
    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        const boardCopy = [...squares];
        boardCopy[i] = computerSymbol;
        if (checkWinner(boardCopy) === computerSymbol) return i;
      }
    }

    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        const boardCopy = [...squares];
        boardCopy[i] = playerSymbol;
        if (checkWinner(boardCopy) === playerSymbol) return i;
      }
    }

    if (!squares[4]) return 4;

    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(i => !squares[i]);
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }

    const availableSpaces = squares
      .map((square, index) => square === null ? index : null)
      .filter(index => index !== null);
    return availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
  };

  const makeComputerMove = () => {
    const computerSymbol = playerSymbol === 'X' ? 'O' : 'X';
    const computerMove = getComputerMove(board);
    const newBoard = [...board];
    newBoard[computerMove] = computerSymbol;
    setBoard(newBoard);
    setLastMove(computerMove);

    const computerWon = checkWinner(newBoard);
    if (computerWon) {
      setGameState('won');
      setWinner(computerSymbol);
      return;
    }

    if (isBoardFull(newBoard)) {
      setGameState('draw');
      return;
    }

    setIsComputerTurn(false);
  };

  const handleClick = (index) => {
    if (board[index] || gameState !== 'playing' || isComputerTurn || isThinking) return;

    const newBoard = [...board];
    newBoard[index] = playerSymbol;
    setBoard(newBoard);
    setLastMove(index);

    const playerWon = checkWinner(newBoard);
    if (playerWon) {
      setGameState('won');
      setWinner(playerSymbol);
      return;
    }

    if (isBoardFull(newBoard)) {
      setGameState('draw');
      return;
    }

    setIsComputerTurn(true);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setGameState('playing');
    setWinner(null);
    setLastMove(null);
    const randomSymbol = Math.random() < 0.5 ? 'X' : 'O';
    setPlayerSymbol(randomSymbol);
    setIsComputerTurn(randomSymbol === 'O');
    setIsThinking(false);
  };

  const renderSquare = (index) => {
    const isLastMove = lastMove === index;
    return (
      <button
        className={`w-20 h-20 border-2 border-gray-300 flex items-center justify-center text-4xl font-bold
          ${board[index] === 'X' ? 'text-blue-600' : 'text-red-600'}
          hover:bg-gray-100 transition-all duration-300
          ${isLastMove ? 'scale-110 shadow-lg' : 'scale-100'}
          ${isThinking ? 'cursor-not-allowed' : 'cursor-pointer'}
          transform-gpu`}
        onClick={() => handleClick(index)}
        disabled={gameState !== 'playing' || isComputerTurn || isThinking}
      >
        <span className={`transition-all duration-300
          ${isLastMove ? 'animate-bounce' : ''}
          ${board[index] ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
          {board[index]}
        </span>
      </button>
    );
  };

  return (
    <div className=" flex items-center justify-center">
      <div className=" h-full flex flex-col justify-center items-center bg-white p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Let&apos;s have some fun <span className='name text-purple-600'>{user?.fullname?.split(" ")[0]}</span> </h1>
        
        <div className="mb-6">
          {gameState === 'playing' && (
            <p className="text-lg text-gray-600 text-center">
              {isThinking ? (
                <span className="animate-pulse">Rick is thinking...</span>
              ) : (
                isComputerTurn ? 
                  "Rick's turn" :
                  `${user?.fullname?.split(" ")[0] || "Your"}s' turn (You are ${playerSymbol})`
              )}
            </p>
          )}
          {gameState === 'won' && (
            <p className="text-xl font-semibold text-center text-green-600">
              {winner === playerSymbol ? `${user?.fullname?.split(" ")[0]} You won!` : 'Rick won!'}
            </p>
          )}
          {gameState === 'draw' && (
            <p className="text-xl font-semibold text-center text-yellow-600">It&apos;s a draw!</p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(index => renderSquare(index))}
        </div>

        <button
          onClick={resetGame}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
            transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
        >
          <RefreshCcw className="animate-spin-slow" size={20} />
          New Game
        </button>
      </div>
    </div>
  );
}

export default Game;