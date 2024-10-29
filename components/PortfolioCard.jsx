import React, { useState } from 'react';
import { ExternalLink, Heart } from 'lucide-react';

const PortfolioCard = ({ title, description, icon, image, likes = 0, tags = [] }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <div
      className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer shadow-xl group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-lg mb-4 shadow-md transition-transform duration-300 group-hover:brightness-75"
        />
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="bg-green-500 text-white p-2 rounded-full hover:scale-110 transition-transform">
              <ExternalLink size={20} />
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {icon}
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-gray-400 text-sm">{description}</p>
          </div>
        </div>
        <button
          onClick={handleLike}
          className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <Heart
            size={16}
            className={`transition-colors ${isLiked ? 'fill-red-500 text-red-500' : ''}`}
          />
          <span>{likeCount}</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PortfolioCard;