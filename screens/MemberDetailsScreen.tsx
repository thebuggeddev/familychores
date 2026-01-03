import React from 'react';
import { ArrowLeft, CheckCircle2, Circle, Gift, Trophy, Star, Award, Zap, Flame } from 'lucide-react';
import { User, Chore } from '../types';
import Avatar from '../components/Avatar';
import { RoughHeaderShape, StrikeThrough } from '../components/RoughShapes';
import Card from '../components/Card';

interface MemberDetailsScreenProps {
  user: User;
  chores: Chore[];
  onBack: () => void;
  onChoreClick: (choreId: string) => void;
}

const MemberDetailsScreen: React.FC<MemberDetailsScreenProps> = ({ user, chores, onBack, onChoreClick }) => {
  // Filter chores for this user
  const userChores = chores.filter(c => c.assigneeId === user.id);
  const completedCount = userChores.filter(c => c.completed).length;
  
  // Calculate progress
  const progressPercent = Math.min(100, Math.round((user.totalPoints / (user.rewardGoalPoints || 1000)) * 100));

  return (
    <div className="w-full max-w-6xl mx-auto px-6 md:px-12 pt-10 pb-24 md:pb-12 flex flex-col gap-8 min-h-full">
      
      {/* Cool Header with Background */}
      <div className="relative rounded-[40px] bg-primary overflow-hidden text-white p-8 md:p-12 shadow-xl mb-6">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accentGreen opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accentYellow opacity-20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>

            <button onClick={onBack} className="absolute top-6 left-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition backdrop-blur-md z-20">
                <ArrowLeft size={24} className="text-white" />
            </button>

            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-10">
                 <div className="relative">
                     <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-accentYellow to-accentGreen">
                        <img src={user.avatar} className="w-full h-full object-cover rounded-full border-4 border-primary" alt={user.name} />
                     </div>
                     <div className="absolute -bottom-3 -right-3 bg-white text-primary p-2 rounded-xl shadow-lg border-2 border-black transform rotate-3">
                         <span className="text-2xl font-black">{user.role === 'Kid' ? '🚀' : '👑'}</span>
                     </div>
                 </div>
                 
                 <div className="flex-1 text-center md:text-left space-y-2">
                     <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20 mb-2">
                        {user.role} Level 5
                     </div>
                     <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none">{user.name}</h1>
                     <div className="flex items-center justify-center md:justify-start gap-4 text-white/80 font-bold text-sm">
                        <span className="flex items-center gap-1"><Flame size={16} className="text-orange-400" /> 12 Day Streak</span>
                        <span className="flex items-center gap-1"><Star size={16} className="text-yellow-400" /> Top Earner</span>
                     </div>
                 </div>

                 <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex flex-col items-center min-w-[120px]">
                     <span className="text-xs font-bold uppercase tracking-widest text-white/60">Total Points</span>
                     <span className="text-4xl font-black text-accentYellow">{user.totalPoints}</span>
                 </div>
            </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Goal & Stats */}
        <div className="lg:col-span-1 space-y-6">
            
            {/* Current Goal Card */}
            <Card className="bg-[#FFFBEB] relative overflow-hidden group">
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-accentYellow drop-shadow-sm">
                            <Gift size={20} />
                            <span className="text-xs font-black uppercase tracking-widest text-gray-400">Target Reward</span>
                        </div>
                        <span className="bg-white px-2 py-1 rounded-lg text-xs font-bold text-gray-400 border">{progressPercent}%</span>
                    </div>
                    
                    <h3 className="text-2xl font-black text-primary leading-tight mb-4 group-hover:text-accentGreen transition-colors">{user.rewardGoal}</h3>
                    
                    <div className="flex justify-between items-end mb-1.5">
                         <span className="font-bold text-3xl text-primary">{user.totalPoints}</span>
                         <span className="font-bold text-xs text-gray-400 mb-1.5">/ {user.rewardGoalPoints} pts</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="h-4 w-full bg-white rounded-full border-2 border-black/10 overflow-hidden p-0.5">
                        <div 
                            className="h-full bg-gradient-to-r from-accentGreen to-emerald-300 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${progressPercent}%` }}
                        ></div>
                    </div>
                </div>
                {/* Decorative background icon */}
                <Gift className="absolute -bottom-4 -right-4 text-accentYellow/20 w-32 h-32 rotate-12 group-hover:scale-110 transition-transform" />
            </Card>

            {/* Badges Section */}
            <div>
                 <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Recent Badges</h3>
                 <div className="grid grid-cols-3 gap-2">
                     {[
                         { icon: <Zap size={20} />, color: 'bg-yellow-100 text-yellow-600', label: 'Fast' },
                         { icon: <Award size={20} />, color: 'bg-purple-100 text-purple-600', label: 'Super' },
                         { icon: <Trophy size={20} />, color: 'bg-blue-100 text-blue-600', label: 'Winner' },
                     ].map((badge, i) => (
                         <div key={i} className={`aspect-square rounded-2xl ${badge.color} flex flex-col items-center justify-center gap-1 border-2 border-white shadow-sm`}>
                             {badge.icon}
                             <span className="text-[10px] font-bold uppercase">{badge.label}</span>
                         </div>
                     ))}
                 </div>
            </div>

            {/* Mini Stats */}
            <div className="grid grid-cols-2 gap-4">
                <Card className="flex flex-col items-center justify-center py-6 bg-green-50/50">
                     <span className="text-3xl font-black text-primary">{completedCount}</span>
                     <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Done</span>
                </Card>
                <Card className="flex flex-col items-center justify-center py-6">
                     <span className="text-3xl font-black text-primary">{userChores.length - completedCount}</span>
                     <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">To Do</span>
                </Card>
            </div>
        </div>

        {/* Right Column: Task List */}
        <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
                 <h3 className="text-xl font-bold flex items-center gap-2">
                    <Trophy size={24} className="text-accentYellow" />
                    Assigned Tasks
                </h3>
                <span className="text-xs font-bold text-gray-400 bg-white px-2 py-1 rounded-lg border">{userChores.length} Tasks</span>
            </div>

            {userChores.length === 0 ? (
                <div className="text-center py-16 border-3 border-dashed border-gray-200 rounded-3xl bg-white/50 flex flex-col items-center justify-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
                        <CheckCircle2 size={32} />
                    </div>
                    <p className="text-gray-400 font-bold text-lg">No tasks assigned yet!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {userChores.map(chore => (
                        <div 
                            key={chore.id} 
                            onClick={() => onChoreClick(chore.id)}
                            className={`
                                flex items-center justify-between p-5 bg-white border-[2.5px] shape-hand-sm cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] group
                                ${chore.completed ? 'border-accentGreen/30 opacity-60 bg-gray-50' : 'border-black hover:border-accentYellow shadow-sm hover:shadow-md'}
                            `}
                        >
                             <div className="flex items-center gap-4">
                                <div className={`
                                    w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-colors
                                    ${chore.completed ? 'bg-accentGreen border-accentGreen text-white' : 'border-gray-200 text-transparent group-hover:border-accentYellow'}
                                `}>
                                    <CheckCircle2 size={20} />
                                </div>
                                <div>
                                    <h4 className={`font-bold text-lg md:text-xl relative inline-block ${chore.completed ? 'text-gray-500' : 'text-primary'}`}>
                                        {chore.title}
                                        {chore.completed && <StrikeThrough className="text-accentGreen" />}
                                    </h4>
                                    <div className="flex gap-2 mt-1">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${chore.type === 'daily' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                                            {chore.type}
                                        </span>
                                        <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                                            <Star size={10} className="fill-current" /> {chore.points} pts
                                        </span>
                                    </div>
                                </div>
                             </div>
                             
                             <div className="text-gray-300 hidden sm:block group-hover:translate-x-1 transition-transform">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                             </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default MemberDetailsScreen;