import React from 'react';
import { ArrowLeft, MoreHorizontal, Calendar, CheckCircle2, Edit3, Repeat, Check, Coins, Camera, History, Trash2 } from 'lucide-react';
import { Chore, User } from '../types';
import Avatar from '../components/Avatar';
import { RoughHeaderShape, RoughButtonShape } from '../components/RoughShapes';
import Card from '../components/Card';

interface DetailsScreenProps {
  chore: Chore;
  users: User[];
  onBack: () => void;
  onToggleComplete: (id: string) => void;
  onEdit: (chore: Chore) => void;
  onDelete: (id: string) => void;
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({ chore, users, onBack, onToggleComplete, onEdit, onDelete }) => {
  const assignee = users.find(u => u.id === chore.assigneeId);
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this chore?')) {
      onDelete(chore.id);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 md:px-12 pt-10 pb-24 md:pb-12 flex flex-col min-h-full">
        
        {/* Header - Full Width */}
        <div className="flex items-center justify-between relative mb-8">
            <button onClick={onBack} className="p-2 bg-white rounded-full border border-gray-200 hover:bg-gray-50 transition-transform hover:scale-105 group shadow-sm z-20">
                <ArrowLeft size={24} className="text-gray-700 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative pt-2 pb-1 px-8 hidden md:block pointer-events-auto">
                    <RoughHeaderShape className="text-black" />
                    <h1 className="font-bold text-xl relative z-10 text-black">Chore Details</h1>
                </div>
            </div>

            <button 
                onClick={handleDelete}
                className="p-2 bg-white rounded-full border border-gray-200 shadow-sm hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-colors z-20"
                title="Delete Chore"
            >
                <Trash2 size={24} />
            </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start w-full">
            
            {/* Main Column (Left) */}
            <div className="lg:col-span-2 flex flex-col gap-8">
                
                {/* Title Section */}
                <div className="relative">
                    <div className="flex items-start gap-4">
                        <div className={`w-16 h-16 rounded-xl border-[2.5px] border-black mt-1 shrink-0 flex items-center justify-center bg-white ${chore.completed ? 'bg-accentGreen border-accentGreen text-white' : ''} shadow-hand`}>
                            {chore.completed && <CheckCircle2 size={36} />}
                        </div>
                        <div>
                             <h2 className="text-4xl md:text-5xl font-black text-primary leading-tight mb-2">{chore.title}</h2>
                             <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-lg border border-gray-200">
                                <span className={`w-2.5 h-2.5 rounded-full ${chore.completed ? 'bg-accentGreen' : 'bg-accentYellow'}`}></span>
                                <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">
                                    {chore.completed ? 'Completed' : 'Active Task'}
                                </span>
                             </div>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <Card className="relative bg-white p-6">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-5 h-5 text-gray-400">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 6h16M4 12h16M4 18h7" /></svg>
                        </div>
                        <span className="text-xs font-bold text-gray-400 tracking-wide uppercase">DESCRIPTION</span>
                    </div>
                    <p className="text-gray-800 font-bold text-xl leading-relaxed">
                        {chore.description}
                    </p>
                </Card>

                {/* Photo Proof */}
                <div className="relative">
                    <div className="absolute -top-2.5 left-4 z-10 bg-cream px-2">
                         <span className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                            <Camera size={14} />
                            Photo Proof
                         </span>
                    </div>
                    
                    {chore.completed ? (
                         <div className="border-[3px] border-black rounded-3xl p-2 bg-white rotate-1 shadow-md">
                             <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-gray-100">
                                <img 
                                    src="https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&q=80&w=1000" 
                                    alt="Task Completed Proof" 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-4 right-4 bg-accentGreen text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
                                    <CheckCircle2 size={12} />
                                    Verified
                                </div>
                             </div>
                         </div>
                    ) : (
                        <div className="border-3 border-dashed border-gray-300 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 bg-white/50 hover:bg-white transition-colors cursor-pointer group min-h-[160px]">
                            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform">
                                <Camera size={28} />
                            </div>
                            <span className="text-base font-bold text-gray-400 group-hover:text-gray-600">Tap to upload a photo</span>
                        </div>
                    )}
                </div>

                {/* History Log */}
                <div className="border-t-2 border-dashed border-gray-200 pt-8">
                    <div className="flex items-center gap-2 mb-6">
                        <History size={18} className="text-gray-400" />
                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Activity</span>
                    </div>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold">M</div>
                            <div>
                                <p className="text-base font-bold text-gray-800">Mom created this task</p>
                                <p className="text-xs text-gray-400 font-bold">Oct 24, 9:00 AM</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                             <Avatar user={assignee} size="sm" className="!w-10 !h-10" />
                             <div>
                                <p className="text-base font-bold text-gray-800">Assigned to {assignee?.name}</p>
                                <p className="text-xs text-gray-400 font-bold">Oct 24, 9:05 AM</p>
                            </div>
                        </div>
                         {chore.completed && (
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                    <CheckCircle2 size={20} />
                                </div>
                                <div>
                                    <p className="text-base font-bold text-gray-800">Task completed</p>
                                    <p className="text-xs text-gray-400 font-bold">Just now</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {/* Sidebar Column (Right) */}
            <div className="lg:col-span-1 flex flex-col gap-6">
                
                {/* Action Buttons */}
                <div className="flex flex-col gap-4 order-last lg:order-first">
                     <button 
                        onClick={() => { onToggleComplete(chore.id); onBack(); }}
                        className="w-full h-[72px] relative flex items-center justify-center gap-2 group transform transition-transform active:scale-95"
                     >
                         <RoughButtonShape fill={chore.completed ? "#A0A0A0" : "#2E5C31"} className="drop-shadow-md" />
                         <div className="relative z-10 flex items-center gap-3 text-white font-bold text-xl tracking-tight">
                            <Check size={24} strokeWidth={3} />
                            {chore.completed ? 'Completed' : 'Mark Complete'}
                         </div>
                     </button>
                     
                     <button 
                        onClick={() => onEdit(chore)}
                        className="w-full h-[72px] relative flex items-center justify-center gap-2 group transform transition-transform active:scale-95"
                     >
                         <RoughButtonShape fill="#F4D06F" className="drop-shadow-md" />
                         <div className="relative z-10 flex items-center gap-3 text-primary font-bold text-xl tracking-tight">
                             <Edit3 size={24} />
                            Edit Task
                         </div>
                     </button>
                </div>

                 <Card className="flex items-center justify-between !py-4 bg-white">
                    <div className="flex items-center gap-4">
                        <Avatar user={assignee} size="md" />
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase block">Assigned To</span>
                            <span className="font-bold text-xl text-primary">{assignee?.name}</span>
                        </div>
                    </div>
                </Card>

                <Card className="flex items-center justify-between !py-4 bg-white">
                    <div className="flex items-center gap-4 px-2">
                        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                            <Calendar size={24} />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase block">Due By</span>
                            <span className="font-bold text-xl text-primary">Today, 5 PM</span>
                        </div>
                    </div>
                </Card>

                 <Card className="bg-white !p-6">
                    <div className="flex items-center gap-2 mb-4 text-gray-400">
                        <Repeat size={20} />
                        <span className="text-sm font-bold uppercase tracking-wide">REPEAT SCHEDULE</span>
                    </div>
                    <div className="flex justify-between items-center px-1">
                        {weekDays.map((day, idx) => {
                            const isRepeatDay = chore.repeat.includes(day);
                            const isActive = isRepeatDay;
                            return (
                                <div key={idx} className="flex flex-col items-center gap-1">
                                <div className={`
                                    w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm border-[2px] transition-all
                                    ${isActive
                                        ? 'bg-primary border-primary text-accentYellow shadow-sm' 
                                        : 'bg-white border-gray-100 text-gray-300'}
                                `}>
                                    {day}
                                </div>
                                </div>
                            )
                        })}
                    </div>
                </Card>

                 <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                     <Card className="flex flex-col items-center justify-center border-accentYellow bg-[#FFFBEB] py-6">
                        <div className="font-black text-4xl text-primary flex items-baseline gap-1">
                            {chore.points}
                            <span className="text-sm font-bold text-gray-400 uppercase">pts</span>
                        </div>
                        <div className="text-[10px] font-bold text-accentYellow uppercase tracking-widest mt-1">Reward</div>
                    </Card>

                    <Card className="flex flex-col items-center justify-center bg-green-50 border-[#2E5C31] py-6">
                        <div className="flex items-center gap-2">
                            <Coins size={20} className="text-[#2E5C31]" />
                            <div className="font-black text-4xl text-[#2E5C31]">$5</div>
                        </div>
                        <div className="text-[10px] font-bold text-[#2E5C31] opacity-60 uppercase tracking-widest mt-1">Value</div>
                    </Card>
                </div>
            </div>
        </div>
    </div>
  );
};

export default DetailsScreen;