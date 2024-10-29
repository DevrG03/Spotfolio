import React from 'react';
import { Home, Search, Library, Plus, Heart, Download, User } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="w-64 bg-black h-screen flex flex-col">
      <div className="p-6">
        <h1 className="text-white text-3xl font-bold mb-8">Portfolio</h1>
        
        <nav className="space-y-4">
          <a href="#" className="text-gray-400 hover:text-white flex items-center gap-4">
            <Home size={24} />
            <span className="font-semibold">Home</span>
          </a>
          <a href="#" className="text-gray-400 hover:text-white flex items-center gap-4">
            <Search size={24} />
            <span className="font-semibold">Search</span>
          </a>
          <a href="#" className="text-gray-400 hover:text-white flex items-center gap-4">
            <Library size={24} />
            <span className="font-semibold">Your Library</span>
          </a>
        </nav>

        <div className="mt-8 space-y-4">
          <button className="text-gray-400 hover:text-white flex items-center gap-4">
            <Plus className="bg-gray-400 text-black p-1 rounded-sm" size={24} />
            <span className="font-semibold">Create Playlist</span>
          </button>
          <button className="text-gray-400 hover:text-white flex items-center gap-4">
            <Heart className="bg-gradient-to-r from-indigo-500 to-purple-500 p-1 rounded-sm text-white" size={24} />
            <span className="font-semibold">Liked Songs</span>
          </button>
        </div>
      </div>

      <div className="mt-auto p-6">
        <button className="text-gray-400 hover:text-white flex items-center gap-4">
          <Download size={20} />
          <span className="text-sm font-semibold">Install App</span>
        </button>
      </div>
    </div>
  );
}