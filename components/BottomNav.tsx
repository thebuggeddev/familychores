import React from 'react';
import { Home, Award, Users, Settings } from 'lucide-react';
import { ViewState } from '../types';

interface BottomNavProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, onChangeView }) => {
  const navItems = [
    { id: 'HOME', icon: Home, label: 'Home' },
    { id: 'LEADERBOARD', icon: Award, label: 'Progress' },
    { id: 'FAMILY', icon: Users, label: 'Family' },
    { id: 'SETTINGS', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-2 pb-6 z-50 rounded-t-3xl shadow-[0_-5px_15px_rgba(0,0,0,0.03)]">
      <div className="flex justify-between items-center max-w-sm mx-auto">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id as ViewState)}
              className={`flex flex-col items-center gap-1 p-2 transition-colors duration-200 ${
                isActive ? 'text-primary' : 'text-gray-400'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-gray-100' : 'bg-transparent'}`}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} fill={isActive ? "currentColor" : "none"} className={isActive ? "text-gray-800" : "text-gray-400"} />
              </div>
              <span className={`text-[10px] font-bold ${isActive ? 'text-gray-800' : 'text-gray-400'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;