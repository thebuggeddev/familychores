import React, { useState } from 'react';
import { X, UserPlus, Gift } from 'lucide-react';
import { User } from '../types';
import { RoughButtonShape } from './RoughShapes';

interface AddMemberModalProps {
  onClose: () => void;
  onAdd: (member: Omit<User, 'id' | 'choresDone' | 'totalPoints'>) => void;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({ onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState<'Parent' | 'Kid' | 'Other'>('Kid');
  const [rewardGoal, setRewardGoal] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  
  // Quick avatar options
  const avatarOptions = [
    'https://images.unsplash.com/photo-1544717305-2782549b5136?fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1599566150163-29194dcaad36?fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fit=facearea&facepad=2&w=256&h=256&q=80',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    // Assign a random goal points between 500 and 2000 for the goal
    const randomGoalPoints = Math.floor(Math.random() * (2000 - 500 + 1) + 500);

    onAdd({
      name,
      avatar: avatarUrl || avatarOptions[Math.floor(Math.random() * avatarOptions.length)],
      color: 'ring-blue-400', // Default
      role,
      rewardGoal: rewardGoal || 'Surprise Reward',
      rewardGoalPoints: randomGoalPoints
    });
    onClose();
  };

  const roles = ['Parent', 'Kid', 'Other'];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md bg-cream p-6 rounded-[30px] border-[3px] border-black shadow-2xl relative animate-[wiggle_0.2s_ease-out] flex flex-col max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-white border-2 border-black rounded-full flex items-center justify-center hover:bg-gray-100"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-black mb-6 text-center">New Member</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Name Input */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Grandma"
              className="w-full p-4 bg-white border-[2.5px] border-black shape-hand outline-none focus:border-accentYellow text-lg font-bold"
              autoFocus
            />
          </div>

           {/* Reward Goal Input */}
           <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-2 flex items-center gap-1">
                <Gift size={12} /> Reward Goal
            </label>
            <input
              type="text"
              value={rewardGoal}
              onChange={(e) => setRewardGoal(e.target.value)}
              placeholder="e.g. New LEGO Set"
              className="w-full p-4 bg-white border-[2.5px] border-black shape-hand outline-none focus:border-accentYellow text-lg font-bold"
            />
            <p className="text-[10px] text-gray-400 font-bold ml-2 mt-1">We'll assign points to this goal automatically!</p>
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-2">Role in Family</label>
            <div className="flex gap-2">
                {roles.map((r) => (
                    <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r as any)}
                        className={`
                            flex-1 py-3 px-2 rounded-xl border-[2px] font-bold text-sm transition-all
                            ${role === r 
                                ? 'bg-primary border-primary text-white shadow-md transform -translate-y-0.5' 
                                : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}
                        `}
                    >
                        {r}
                    </button>
                ))}
            </div>
          </div>

          {/* Avatar Selection */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-2">Choose Avatar</label>
            <div className="flex gap-4 overflow-x-auto pb-4 pt-2 px-1 hide-scrollbar">
               {avatarOptions.map((url, i) => (
                   <div 
                    key={i} 
                    onClick={() => setAvatarUrl(url)}
                    className={`
                        w-16 h-16 shrink-0 rounded-full border-2 cursor-pointer transition-all
                        ${avatarUrl === url ? 'border-accentGreen ring-2 ring-accentGreen scale-110' : 'border-gray-200 opacity-60 hover:opacity-100'}
                    `}
                   >
                       <img src={url} className="w-full h-full rounded-full object-cover" alt="avatar option" />
                   </div>
               ))}
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="mt-4 w-full h-[72px] relative flex items-center justify-center gap-2 group transform transition-transform active:scale-95">
             <RoughButtonShape fill="#1A1A1A" className="drop-shadow-md" />
             <div className="relative z-10 flex items-center gap-3 text-white font-bold text-xl tracking-tight">
                <UserPlus size={24} strokeWidth={3} />
                Add to Family
             </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMemberModal;