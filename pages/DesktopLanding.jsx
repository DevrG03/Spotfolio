import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import GameSwitcher from '@/components/GameSwitcher';
import NowPlaying from '@/components/NowPlaying';
import PortfolioCard from '@/components/PortfolioCard';
import { Code, Gamepad, Briefcase, Mail, Search } from 'lucide-react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const portfolioItems = [
    {
      title: "Web Development",
      description: "Full-stack projects",
      icon: <Code className="text-blue-500" size={24} />,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=300&fit=crop",
      likes: 128,
      tags: ['React', 'Node.js', 'TypeScript', 'MongoDB']
    },
    {
      title: "Game Development",
      description: "Interactive experiences",
      icon: <Gamepad className="text-green-500" size={24} />,
      image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=300&h=300&fit=crop",
      likes: 95,
      tags: ['Unity', 'C#', 'Blender', '3D Modeling']
    },
    {
      title: "Professional Experience",
      description: "Work history",
      icon: <Briefcase className="text-purple-500" size={24} />,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=300&fit=crop",
      likes: 76,
      tags: ['Leadership', 'Agile', 'Team Management']
    },
    {
      title: "Contact",
      description: "Get in touch",
      icon: <Mail className="text-red-500" size={24} />,
      image: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=300&h=300&fit=crop",
      likes: 42,
      tags: ['Email', 'LinkedIn', 'Twitter']
    }
  ];

  const filteredItems = portfolioItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <TopBar />
        
        <div className="p-8">
          <div className="grid grid-cols-3 gap-6">
            {/* Left Column: Portfolio Items */}
            <div className="col-span-2 space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Portfolio Highlights</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search projects or skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-gray-900 text-white pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {filteredItems.map((item, index) => (
                  <PortfolioCard key={index} {...item} />
                ))}
              </div>
              {filteredItems.length === 0 && (
                <div className="text-center text-gray-400 py-8">
                  <p>No projects found matching your search.</p>
                </div>
              )}
            </div>

            {/* Right Column: Interactive Games */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Interactive Zone</h2>
              <div className="sticky top-6">
                <GameSwitcher />
              </div>
            </div>
          </div>
        </div>
      </main>

      <NowPlaying />
    </div>
  );
}

export default App;