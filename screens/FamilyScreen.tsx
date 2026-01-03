import React from 'react';
import { User } from '../types';
import Avatar from '../components/Avatar';
import { RoughHeaderShape } from '../components/RoughShapes';
import Card from '../components/Card';
import { Plus, Trophy, Sparkles } from 'lucide-react';

interface FamilyScreenProps {
  users: User[];
  onAddMember: () => void;
  onUserClick?: (userId: string) => void;
}

const FamilyScreen: React.FC<FamilyScreenProps> = ({ users, onAddMember, onUserClick }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 md:px-12 pt-10 pb-36 md:pb-12 flex flex-col items-center gap-10 min-h-full">
      
      {/* Header */}
      <div className="relative pt-2 pb-1 px-8 mb-4">
        <RoughHeaderShape className="text-black" />
        <h1 className="text-2xl md:text-3xl font-bold relative z-10 text-black">Our Squad</h1>
        <div className="absolute -top-3 -right-6 text-accentYellow rotate-12 text-4xl">★</div>
      </div>

      {/* Grid updated: removed xl:grid-cols-4 to allow cards to be wider on large screens (keeping max 3 cols) */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Add Member Card */}
          <div 
            onClick={onAddMember}
            className="flex flex-col items-center justify-center min-h-[280px] rounded-[30px] border-4 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all cursor-pointer group"
          >
             <div className="w-24 h-24 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                 <Plus size={40} className="text-gray-400" />
             </div>
             <span className="font-bold text-gray-400 text-xl">Add Member</span>
          </div>

          {/* User Cards */}
          {users.map((user, idx) => (
             <div 
                key={user.id} 
                className="relative group hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
                onClick={() => onUserClick && onUserClick(user.id)}
             >
                <Card className={`flex flex-col items-center p-6 h-full justify-between min-h-[280px] ${idx % 2 === 0 ? 'border-black' : 'border-black'}`}>
                    
                    {/* Role Badge */}
                    <div className="absolute top-4 right-4">
                        {user.role === 'Parent' && (
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide border border-yellow-200">Parent</span>
                        )}
                        {user.role === 'Kid' && (
                            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide border border-blue-200">Kid</span>
                        )}
                        {(!user.role || user.role === 'Other') && (
                            <span className="bg-gray-100 text-gray-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide border border-gray-200">Family</span>
                        )}
                    </div>

                    <div className="flex flex-col items-center mt-6">
                        <div className="relative">
                             <Avatar user={user} size="xl" className="!w-28 !h-28" />
                             {idx === 0 && <div className="absolute -top-6 -left-4 text-5xl -rotate-12">👑</div>}
                        </div>
                        <h2 className="mt-6 text-3xl font-black text-primary">{user.name}</h2>
                    </div>

                    <div className="w-full mt-6 space-y-3">
                        <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between border border-gray-100">
                             <div className="flex items-center gap-2 text-gray-500">
                                 <Trophy size={18} />
                                 <span className="text-xs font-bold uppercase">Points</span>
                             </div>
                             <span className="font-black text-xl">{user.totalPoints}</span>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between border border-gray-100">
                             <div className="flex items-center gap-2 text-gray-500">
                                 <Sparkles size={18} />
                                 <span className="text-xs font-bold uppercase">Chores</span>
                             </div>
                             <span className="font-black text-xl">{user.choresDone}</span>
                        </div>
                    </div>
                </Card>
             </div>
          ))}
      </div>
    </div>
  );
};

export default FamilyScreen;