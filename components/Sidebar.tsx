import React from 'react';
import { Home, Award, Users, Settings, LogOut } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, className = '' }) => {
  const navItems = [
    { id: 'HOME', icon: Home, label: 'Home' },
    { id: 'LEADERBOARD', icon: Award, label: 'Progress' },
    { id: 'FAMILY', icon: Users, label: 'Family' },
    { id: 'SETTINGS', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className={`flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-0 p-6 ${className}`}>
      {/* Logo Area */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-accentYellow rounded-xl border-2 border-black flex items-center justify-center shadow-hand">
            <span className="text-xl">🏠</span>
        </div>
        <h1 className="font-bold text-xl tracking-tight leading-none">Family<br/>Chores</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id as ViewState)}
              className={`
                w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 group
                ${isActive 
                  ? 'bg-cream text-primary font-bold shadow-sm ring-1 ring-black/5' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              <Icon 
                size={22} 
                strokeWidth={isActive ? 2.5 : 2}
                className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} 
              />
              <span className="text-sm">{item.label}</span>
              {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accentGreen"></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Profile */}
      <div className="mt-auto pt-6 border-t border-gray-100">
        <button className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-gray-50 transition-colors text-left group">
            <div className="w-10 h-10 rounded-full bg-gray-200 border border-gray-300 overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">Mom</p>
                <p className="text-xs text-gray-500 truncate">Admin</p>
            </div>
            <LogOut size={18} className="text-gray-400 group-hover:text-red-400 transition-colors" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;