import React from 'react';
import { Sun, Check, Trash2, WashingMachine, Plus, UserPlus, Gift, Plane, Star, ArrowRightLeft } from 'lucide-react';
import { User, Chore } from '../types';
import Avatar from '../components/Avatar';
import { RoughHeaderShape, StrikeThrough } from '../components/RoughShapes';
import Card from '../components/Card';

interface HomeScreenProps {
  users: User[];
  chores: Chore[];
  onChoreClick: (choreId: string) => void;
  onAddChore: () => void;
  onNavigateToFamily: () => void;
  onUserClick?: (userId: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ users, chores, onChoreClick, onAddChore, onNavigateToFamily, onUserClick }) => {
  const pendingCount = chores.filter(c => !c.completed).length;
  // Faking logged in user as the first user (Mom)
  const loggedInUserId = users[0].id;

  // Custom Icon mapping helper
  const getIcon = (title: string) => {
      const t = title.toLowerCase();
      if(t.includes('trash')) return <Trash2 size={18} className="text-[#A52A2A]" />;
      if(t.includes('laundry')) return <WashingMachine size={18} className="text-[#A52A2A]" />;
      return null;
  }

  // Helper for chore colors based on image
  const getChoreStyles = (chore: Chore) => {
      if (chore.completed) return { bg: 'bg-white', border: 'border-accentGreen', text: 'text-gray-300' };
      const t = chore.title.toLowerCase();
      if (t.includes('trash')) return { bg: 'bg-white', border: 'border-accentYellow', text: 'text-primary' };
      if (t.includes('laundry')) return { bg: 'bg-white', border: 'border-accentYellow', text: 'text-primary' };
      return { bg: 'bg-white', border: 'border-accentGreen', text: 'text-primary' };
  };

  const otherRewards = [
      { emoji: '🍦', title: 'Ice Cream Trip', points: 200 },
      { emoji: '🎬', title: 'Movie Night', points: 500 },
      { emoji: '🎢', title: 'Theme Park', points: 3000 },
      { emoji: '🎮', title: 'New Game', points: 1500 },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-6 md:px-12 pt-10 pb-36 md:pb-12 flex flex-col gap-8 min-h-full relative">
      
      {/* Header Section - Aligned Left */}
      <div className="flex flex-col items-start gap-8 relative w-full">
          
          <div className="relative pt-2 pb-1 pr-8 pl-4">
            <RoughHeaderShape className="text-black" />
            <h1 className="text-2xl md:text-3xl font-bold relative z-10 text-black">My Family</h1>
            
            <div className="absolute top-0 -left-6 text-accentRed rotate-[-15deg]">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
            </div>
             <div className="absolute -top-2 -right-2 text-accentYellow rotate-12">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
            </div>
          </div>

        {/* Family Avatars List - Bigger circles */}
        <div className="flex gap-6 overflow-x-auto hide-scrollbar py-2 px-1 items-start max-w-full">
            {users.map((user, idx) => (
               <div 
                key={user.id} 
                className="shrink-0 cursor-pointer transition-transform hover:scale-105"
                onClick={() => onUserClick && onUserClick(user.id)}
               >
                    <Avatar 
                        user={user} 
                        showName 
                        size="xl" 
                        selected={user.id === loggedInUserId}
                    />
               </div>
            ))}
            {/* Button to Navigate to Family Page */}
            <div className="flex flex-col items-center gap-2 min-w-[5rem]">
                <button 
                  onClick={onNavigateToFamily}
                  className="w-24 h-24 rounded-full bg-[#EAEAEA] flex items-center justify-center text-gray-400 hover:bg-gray-200 transition border-2 border-transparent hover:border-gray-300"
                >
                    <UserPlus size={36} />
                </button>
                <span className="text-base font-bold text-gray-400">Add</span>
            </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Main Content Area */}
        <div className="flex-1 w-full">
            <div className="flex justify-between items-center mb-6 px-2">
                <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-black">Today's Chores</h2>
                    <Sun className="text-accentYellow fill-accentYellow animate-spin-slow" size={24} />
                </div>
                
                <div className="bg-[#FFF8E1] text-[#8B6E28] px-4 py-2 rounded-full text-sm font-bold border border-[#F4D06F]/50 shadow-sm">
                     {pendingCount} Left!
                </div>
            </div>

            <div className="flex flex-col gap-4">
            {chores.length === 0 && (
                <div className="text-center py-12 text-gray-400 font-bold border-2 border-dashed border-gray-300 rounded-2xl text-lg">
                    No chores yet! Click the + button to start.
                </div>
            )}
            {chores.map(chore => {
                const assignee = users.find(u => u.id === chore.assigneeId);
                const style = getChoreStyles(chore);
                
                return (
                <div 
                    key={chore.id} 
                    onClick={() => onChoreClick(chore.id)}
                    className={`
                    relative p-5 border-[2.5px] shape-hand shadow-sm transition-transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer group bg-white
                    ${style.border}
                    `}
                >
                    <div className="flex items-center gap-5">
                        {/* Checkbox / Status Icon */}
                        <div className={`
                            w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors border-2
                            ${chore.completed 
                                ? 'bg-accentGreen border-accentGreen text-white' 
                                : `bg-white border-transparent ${chore.title.includes('Dog') ? 'text-accentGreen' : 'text-accentYellow'}`}
                        `}>
                            {chore.completed 
                                ? <Check size={24} strokeWidth={4} /> 
                                : (getIcon(chore.title) || (
                                    <div className="w-6 h-6 rounded-md border-2 border-accentGreen bg-accentGreen/20 flex items-center justify-center">
                                        <Check size={16} className="text-accentGreen" />
                                    </div>
                                  ))
                            }
                        </div>

                        <div className="flex-1 min-w-0 relative py-1">
                            {/* Title with strikethrough logic */}
                            <h3 className={`font-bold text-xl leading-tight ${style.text} relative inline-block`}>
                                {chore.title}
                                {chore.completed && (
                                    <StrikeThrough className="text-accentGreen top-1/2 -translate-y-1/2 scale-110" />
                                )}
                            </h3>
                            
                            <div className="flex items-center gap-2 mt-2">
                                <Avatar user={assignee} size="sm" className="!w-6 !h-6" />
                                <span className="text-sm font-bold text-gray-500">{assignee?.name}</span>
                                <span className="text-gray-300 text-xs">•</span>
                                <span className="text-xs font-bold text-gray-400">{chore.points} pts</span>
                            </div>
                        </div>

                        {/* Right side tick box for uncompleted */}
                        {!chore.completed && (
                            <div className={`w-8 h-8 border-2 rounded-lg ${style.border.replace('border-', 'border-')}`}></div>
                        )}
                        {chore.completed && (
                           <div className="w-8 h-8 bg-accentGreen rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                               <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                           </div>
                        )}
                    </div>
                </div>
                );
            })}
            </div>
        </div>

        {/* Sidebar Rewards */}
        <div className="w-full lg:w-96 shrink-0 flex flex-col gap-6">
             <Card className="bg-[#FFFBEB] relative">
                <div className="text-center space-y-4">
                    <h3 className="text-gray-400 text-xs font-bold tracking-[0.2em] uppercase">WEEKLY FAMILY GOAL</h3>
                    
                    <div className="flex flex-col items-center">
                        <div className="text-7xl font-black text-primary tracking-tighter flex items-center gap-2">
                            480 <div className="flex flex-col items-start leading-none"><span className="text-xs font-bold text-gray-400 uppercase">Total</span><span className="text-xs font-bold text-gray-400 uppercase">Points</span></div>
                        </div>
                    </div>
                    
                    {/* Stars */}
                    <div className="flex justify-center gap-3 my-2">
                        {[1,2,3].map(i => (
                            <div key={i} className={`transform ${i===2 ? '-translate-y-2 scale-110' : ''}`}>
                                <svg className="w-8 h-8 text-accentYellow drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                            </div>
                        ))}
                    </div>

                    <div className="relative pt-2">
                        <div className="relative h-4 bg-white rounded-full border border-gray-200 overflow-hidden">
                            <div className="absolute top-0 left-0 h-full w-[70%] bg-[#407B45] rounded-full"></div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-center gap-1 mt-1">
                        <span className="text-xs font-bold text-gray-500">Only 20 pts to Pizza Night!</span>
                        <span className="text-lg">🍕</span>
                    </div>
                </div>
            </Card>

            {/* Yearly Reward - Enhanced Style */}
            <Card className="bg-white overflow-hidden relative group cursor-pointer" noPadding>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                <img 
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600" 
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="Vacation" 
                />
                
                <div className="absolute bottom-0 left-0 right-0 p-5 z-20 text-white">
                    <div className="flex items-center gap-2 mb-1">
                         <div className="p-1.5 bg-white/20 backdrop-blur-md rounded-lg text-white">
                            <Plane size={16} />
                         </div>
                         <h3 className="font-black text-xl leading-none shadow-black drop-shadow-md">Yearly Reward</h3>
                    </div>
                    <p className="text-xs font-bold text-white/80 uppercase tracking-wide mb-3">Family Vacation to Hawaii</p>
                    
                    <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold">
                            <span>Progress</span>
                            <span>45%</span>
                        </div>
                         <div className="relative h-2.5 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm">
                            <div className="absolute top-0 left-0 h-full w-[45%] bg-accentYellow rounded-full"></div>
                        </div>
                    </div>
                </div>
            </Card>

            <Card className="bg-white">
                 <div className="flex items-center justify-between mb-4">
                     <h3 className="font-black text-lg text-primary">Other Rewards</h3>
                     <Star size={20} className="text-accentYellow fill-accentYellow" />
                 </div>
                 <ul className="space-y-3">
                     {otherRewards.map((reward, i) => (
                        <li key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group/item">
                            <div className="flex items-center gap-3">
                                <span className="text-xl">{reward.emoji}</span>
                                <div>
                                    <span className="font-bold text-sm block leading-tight">{reward.title}</span>
                                    <span className="text-[10px] font-bold text-gray-400 bg-white px-1.5 py-0.5 rounded border mt-1 inline-block">{reward.points} pts</span>
                                </div>
                            </div>
                            
                            <button className="opacity-0 group-hover/item:opacity-100 p-2 text-gray-400 hover:text-accentGreen hover:bg-green-50 rounded-full transition-all" title="Swap Goal">
                                <ArrowRightLeft size={16} />
                            </button>
                        </li>
                     ))}
                 </ul>
            </Card>
        </div>
      </div>

      {/* Floating Action Button for Adding Chores */}
      <button 
        onClick={onAddChore}
        className="fixed bottom-24 right-5 md:bottom-10 md:right-10 w-20 h-20 bg-black text-accentYellow rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-[100] border-4 border-white"
        aria-label="Add Chore"
      >
        <Plus size={40} strokeWidth={3} />
      </button>

    </div>
  );
};

export default HomeScreen;