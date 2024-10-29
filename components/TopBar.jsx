import React from 'react';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="flex justify-between items-center p-4 bg-black bg-opacity-60 backdrop-blur-md">
      <div className="flex gap-2">
        <button className="rounded-full bg-black p-2">
          <ChevronLeft className="text-gray-400 hover:text-white" size={24} />
        </button>
        <button className="rounded-full bg-black p-2">
          <ChevronRight className="text-gray-400 hover:text-white" size={24} />
        </button>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="bg-white text-black px-4 py-1 rounded-full font-semibold hover:scale-105 transition-transform">
          Upgrade
        </button>
        <button className="bg-black rounded-full p-2">
          <User className="text-white" size={24} />
        </button>
      </div>
    </div>
  );
}