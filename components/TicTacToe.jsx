import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isGameOver, setIsGameOver] = useState(false);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [a, b, c];
      }
    }
    return null;
  };

  const findWinningMove = (squares, player) => {
    for (let i = 0; i < 9; i++) {
      if (!squares[i]) {
        const boardCopy = [...squares];
        boardCopy[i] = player;
        if (calculateWinner(boardCopy)) return i;
      }
    }
    return -1;
  };

  const getAIMove = (squares) => {
    // Try to win
    const move = findWinningMove(squares, 'O');
    if (move !== -1) return move;

    // Block player's winning move
    const blockMove = findWinningMove(squares, 'X');
    if (blockMove !== -1) return blockMove;

    // Take center if available
    if (!squares[4]) return 4;

    // Take corners
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(i => !squares[i]);
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }

    // Take any available space
    const availableSpaces = squares.map((square, i) => !square ? i : -1).filter(i => i !== -1);
    return availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
  };

  const handleClick = (i) => {
    if (board[i] || isGameOver) return;
    
    const newBoard = [...board];
    newBoard[i] = 'X';
    setBoard(newBoard);

    // AI's turn
    setTimeout(() => {
      if (!calculateWinner(newBoard) && !newBoard.every(square => square)) {
        const aiMove = getAIMove(newBoard);
        newBoard[aiMove] = 'O';
        setBoard([...newBoard]);
      }
    }, 300);
  };

  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner || board.every(square => square)) {
      setIsGameOver(true);
    }
  }, [board]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsGameOver(false);
  };

  const winner = calculateWinner(board);
  const winningLine = winner || [];
  const status = winner 
    ? 'You lost!'
    : board.every(square => square) 
    ? "It's a draw!"
    : 'Your turn';

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Tic Tac Toe vs AI</h3>
          <p className="text-green-400 font-medium">{status}</p>
        </div>
        <button 
          onClick={resetGame}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          title="Reset game"
        >
          <RefreshCw className="text-gray-400 hover:text-white" size={20} />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {board.map((square, i) => (
          <button
            key={i}
            className={`
              w-16 h-16 rounded-lg text-2xl font-bold
              ${!square ? 'hover:bg-gray-700 bg-gray-800' : 'bg-gray-700'}
              ${winningLine.includes(i) ? 'bg-green-600 hover:bg-green-700' : ''}
              transition-all duration-200 transform hover:scale-105
              flex items-center justify-center
            `}
            onClick={() => handleClick(i)}
          >
            <span className={
              square === 'X' 
                ? 'text-blue-400' 
                : square === 'O' 
                ? 'text-red-400' 
                : ''
            }>
              {square}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TicTacToe;