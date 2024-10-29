import React from 'react';
import { Play, SkipBack, SkipForward, Repeat, Shuffle, Volume2 } from 'lucide-react';

export default function NowPlaying() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black bg-gradient-to-t from-black to-transparent p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img 
            src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=50&h=50&fit=crop" 
            alt="Album art" 
            className="w-14 h-14 rounded"
          />
          <div>
            <h4 className="text-white font-semibold">Interactive Beats</h4>
            <p className="text-gray-400 text-sm">Tic Tac Toe Mix</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-6">
            <Shuffle className="text-gray-400 hover:text-white cursor-pointer" size={20} />
            <SkipBack className="text-gray-400 hover:text-white cursor-pointer" size={24} />
            <button className="bg-white rounded-full p-2 hover:scale-105 transition-transform">
              <Play className="text-black" size={24} fill="black" />
            </button>
            <SkipForward className="text-gray-400 hover:text-white cursor-pointer" size={24} />
            <Repeat className="text-gray-400 hover:text-white cursor-pointer" size={20} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">2:14</span>
            <div className="w-96 h-1 bg-gray-600 rounded-full">
              <div className="w-1/3 h-full bg-white rounded-full"></div>
            </div>
            <span className="text-xs text-gray-400">3:45</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Volume2 className="text-gray-400" size={20} />
          <div className="w-24 h-1 bg-gray-600 rounded-full">
            <div className="w-2/3 h-full bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}