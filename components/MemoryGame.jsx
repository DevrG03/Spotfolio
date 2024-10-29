import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

const EMOJIS = ['🎮', '🎵', '💻', '🎨', '📱', '🚀', '🎯', '🎪'];

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const initializeCards = () => {
    const duplicatedEmojis = [...EMOJIS, ...EMOJIS];
    const shuffledEmojis = duplicatedEmojis.sort(() => Math.random() - 0.5);
    return shuffledEmojis.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));
  };

  useEffect(() => {
    setCards(initializeCards());
  }, []);

  const resetGame = () => {
    setCards(initializeCards());
    setFlippedCards([]);
    setMoves(0);
    setIsWon(false);
  };

  const handleCardClick = (cardId) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(cardId) ||
      cards[cardId].isMatched
    ) {
      return;
    }

    const newCards = [...cards];
    newCards[cardId].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(m => m + 1);
      const [firstId, secondId] = newFlippedCards;

      if (cards[firstId].emoji === cards[secondId].emoji) {
        newCards[firstId].isMatched = true;
        newCards[secondId].isMatched = true;
        setCards(newCards);
        setFlippedCards([]);

        if (newCards.every(card => card.isMatched)) {
          setIsWon(true);
        }
      } else {
        setTimeout(() => {
          newCards[firstId].isFlipped = false;
          newCards[secondId].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Memory Game</h3>
          <p className="text-green-400 font-medium">
            {isWon ? `Won in ${moves} moves!` : `Moves: ${moves}`}
          </p>
        </div>
        <button
          onClick={resetGame}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          title="Reset game"
        >
          <RefreshCw className="text-gray-400 hover:text-white" size={20} />
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {cards.map(card => (
          <button
            key={card.id}
            className={`
              w-14 h-14 rounded-lg text-2xl
              ${card.isFlipped || card.isMatched ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'}
              ${card.isMatched ? 'opacity-50' : ''}
              transition-all duration-200 transform hover:scale-105
              flex items-center justify-center
            `}
            onClick={() => handleCardClick(card.id)}
          >
            {(card.isFlipped || card.isMatched) && card.emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;