import React, { useMemo } from 'react';
import { User, Chore } from '../types';
import Avatar from '../components/Avatar';
import { RoughHeaderShape } from '../components/RoughShapes';
import Card from '../components/Card';
import { Gift } from 'lucide-react';

interface LeaderboardScreenProps {
  users: User[];
  chores: Chore[];
  onUserClick?: (userId: string) => void;
}

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ users, chores, onUserClick }) => {
  // Calculate dynamic stats
  const stats = useMemo(() => {
    // Clone users to avoid mutation
    const usersWithStats = users.map(user => ({ ...user, choresDone: 0, totalPoints: 0 }));
    
    let totalChoresDone = 0;

    chores.forEach(chore => {
        if (chore.completed) {
            totalChoresDone++;
            const user = usersWithStats.find(u => u.id === chore.assigneeId);
            if (user) {
                user.choresDone += 1;
                user.totalPoints += chore.points;
            }
        }
    });

    // Add base stats from dummy data to make it look populated for demo
    // In a real app we'd only use computed stats
    usersWithStats.forEach((u, idx) => {
         const base = users[idx];
         u.choresDone += base.choresDone;
         u.totalPoints += base.totalPoints;
    });
    totalChoresDone += 118; // Base offset from image

    return {
        users: usersWithStats.sort((a, b) => b.choresDone - a.choresDone),
        totalChoresDone
    };
  }, [users, chores]);


  return (
    <div className="w-full max-w-6xl mx-auto px-6 md:px-12 pt-10 pb-36 md:pb-12 flex flex-col gap-10 min-h-full">
        {/* Header */}
      <div className="flex flex-col items-center mb-2 relative">
          <div className="absolute top-4 left-6 text-accentRed rotate-[-12deg] text-3xl">♥</div>
          <div className="absolute top-0 right-10 text-accentYellow rotate-12 text-3xl">★</div>

          <div className="relative pt-2 pb-1 px-8">
            <RoughHeaderShape className="text-black" />
            <h1 className="text-2xl md:text-3xl font-bold relative z-10 text-black">Family Leaderboard</h1>
          </div>
        
        <div className="mt-4">
            <span className="text-xs font-bold text-gray-500 tracking-widest uppercase">OCT 14 — OCT 20</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Total Stats Card (Sticky on desktop) */}
        <div className="md:col-span-1 md:sticky md:top-6">
            <Card className="bg-[#FFFBEB]">
                <div className="flex flex-col items-center justify-center text-center py-4">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">TOTAL CHORES</span>
                    <div className="flex items-center gap-3">
                        <span className="text-7xl font-black text-primary">{stats.totalChoresDone}</span>
                         <div className="flex flex-col items-start leading-none text-xs font-bold text-gray-400 uppercase">
                            <span>Chores</span>
                            <span>Completed</span>
                        </div>
                    </div>
                </div>
                {/* Decorative line */}
                <div className="w-full h-0.5 bg-black/10 mt-4 mb-2 mx-auto rounded-full"></div>
            </Card>
        </div>

        {/* Right: List */}
        <div className="md:col-span-2 flex flex-col gap-6">
            {stats.users.map((user, index) => {
                const isFirst = index === 0;
                const cardBorder = isFirst ? 'border-[#2E5C31]' : 'border-accentYellow';
                const avatarBorder = isFirst ? '#F4D06F' : index === 1 ? '#56AB5B' : index === 2 ? '#E57373' : undefined;

                return (
                <div 
                    key={user.id} 
                    className="relative group pl-4 cursor-pointer"
                    onClick={() => onUserClick && onUserClick(user.id)}
                >
                    {/* Rank Badge */}
                    <div className={`
                        absolute top-1/2 -translate-y-1/2 -left-2 w-12 h-12 rounded-full border-[2.5px] border-black flex items-center justify-center font-black text-2xl z-20 bg-white shadow-md group-hover:scale-110 transition-transform
                        ${index === 0 ? 'bg-accentYellow' : ''}
                    `}>
                        {index + 1}
                    </div>

                    {/* Card */}
                    <Card className={`relative pl-10 flex flex-col md:flex-row md:items-center justify-between transition-transform group-hover:translate-x-1 ${cardBorder}`}>
                        <div className="flex items-center gap-6 mb-4 md:mb-0">
                            <Avatar user={user} size="lg" borderColor={avatarBorder} />
                            
                            <div className="flex flex-col">
                                <span className="font-bold text-2xl text-primary">{user.name}</span>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{user.choresDone} CHORES DONE</span>
                                <div className="flex gap-1 mt-1.5">
                                    {[1,2,3,4,5].slice(0, Math.max(1, 5-index)).map(star => (
                                        <span key={star} className="text-accentYellow text-sm">★</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Reward Box for Top 3 */}
                            {index < 3 && user.rewardGoal && (
                                <div className="bg-gray-50 px-3 py-2 rounded-xl border border-gray-100 flex items-center gap-2 max-w-[140px]">
                                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-200 shrink-0 text-accentRed">
                                        <Gift size={16} />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide leading-none mb-0.5">Working on</span>
                                        <span className="text-xs font-bold text-primary truncate leading-tight">{user.rewardGoal}</span>
                                    </div>
                                </div>
                            )}

                            {/* Points Badge */}
                            <div className={`
                                w-16 h-16 rounded-full flex items-center justify-center font-black text-xl border-2 border-transparent shrink-0
                                ${index === 0 ? 'bg-accentYellow/30 text-primary border-accentYellow/50' : 
                                index === 1 ? 'bg-green-50 text-green-700' :
                                index === 2 ? 'bg-red-50 text-red-700' : 'bg-gray-50 text-gray-400'}
                            `}>
                                {Math.floor(user.totalPoints / 10)}
                            </div>
                        </div>
                        
                        {/* Decorative star for top cards */}
                        {index < 3 && (
                            <div className="absolute -top-3 -right-2 text-accentYellow rotate-12 text-3xl drop-shadow-sm">★</div>
                        )}
                    </Card>
                </div>
            )})}
        </div>

      </div>
    </div>
  );
};

export default LeaderboardScreen;