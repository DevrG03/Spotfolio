import React, { useState } from 'react';
import { Music2, Gamepad } from 'lucide-react';
import TicTacToe from './TicTacToe';
import MemoryGame from './MemoryGame';

export default function GameSwitcher() {
  const [activeGame, setActiveGame] = useState('tictactoe');

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setActiveGame('tictactoe')}
          className={`flex-1 p-3 rounded-xl transition-all ${
            activeGame === 'tictactoe'
              ? 'bg-green-500 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Music2 size={20} />
            <span>Tic Tac Toe</span>
          </div>
        </button>
        <button
          onClick={() => setActiveGame('memory')}
          className={`flex-1 p-3 rounded-xl transition-all ${
            activeGame === 'memory'
              ? 'bg-green-500 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Gamepad size={20} />
            <span>Memory</span>
          </div>
        </button>
      </div>

      {activeGame === 'tictactoe' ? <TicTacToe /> : <MemoryGame />}
    </div>
  );
}