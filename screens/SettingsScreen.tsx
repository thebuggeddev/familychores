import React from 'react';
import { Bell, Volume2, Moon, Shield, ChevronRight, LogOut, User as UserIcon, Edit3 } from 'lucide-react';
import { RoughHeaderShape } from '../components/RoughShapes';
import Card from '../components/Card';
import { User } from '../types';

interface SettingsScreenProps {
    currentUser: User;
}

const Toggle: React.FC<{ label: string, icon: React.ReactNode, initial?: boolean }> = ({ label, icon, initial = false }) => {
    const [isOn, setIsOn] = React.useState(initial);
    return (
        <div 
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setIsOn(!isOn)}
        >
            <div className="flex items-center gap-3">
                <div className="text-gray-600">{icon}</div>
                <span className="font-bold text-gray-800">{label}</span>
            </div>
            {/* Hand-drawn Toggle Switch */}
            <div className={`
                w-12 h-7 rounded-full border-2 border-black flex items-center p-0.5 transition-colors duration-300
                ${isOn ? 'bg-accentGreen' : 'bg-gray-200'}
            `}>
                <div className={`
                    w-5 h-5 bg-white border-2 border-black rounded-full shadow-sm transform transition-transform duration-300
                    ${isOn ? 'translate-x-5' : 'translate-x-0'}
                `}></div>
            </div>
        </div>
    );
};

const SettingsScreen: React.FC<SettingsScreenProps> = ({ currentUser }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 md:px-12 pt-10 pb-36 md:pb-12 flex flex-col gap-8 min-h-full">
       
        {/* Header */}
        <div className="flex flex-col items-center mb-4">
            <div className="relative pt-2 pb-1 px-8">
                <RoughHeaderShape className="text-black" />
                <h1 className="text-2xl md:text-3xl font-bold relative z-10 text-black">Settings</h1>
            </div>
        </div>

        <div className="max-w-3xl mx-auto w-full space-y-8">
            {/* Profile Section */}
            <Card className="flex items-center gap-6 !p-8 bg-gradient-to-br from-white to-cream">
                <div className="w-20 h-20 rounded-full border-[2.5px] border-black p-0.5 bg-white">
                    <img src={currentUser.avatar} alt="Profile" className="w-full h-full rounded-full object-cover border border-gray-200" />
                </div>
                <div className="flex-1">
                    <h2 className="text-2xl font-black text-primary">{currentUser.name}</h2>
                    <p className="text-base font-bold text-gray-500">Family Admin</p>
                </div>
                <button className="p-3 hover:bg-gray-100 rounded-full border border-transparent hover:border-black transition-all">
                    <Edit3 size={24} className="text-gray-600" />
                </button>
            </Card>

            {/* App Settings */}
            <div className="space-y-8">
                <div>
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 ml-2">Preferences</h3>
                    <Card noPadding className="overflow-hidden">
                        <Toggle label="Push Notifications" icon={<Bell size={24} />} initial={true} />
                        <div className="h-0.5 bg-gray-100 mx-4"></div>
                        <Toggle label="Sound Effects" icon={<Volume2 size={24} />} initial={true} />
                        <div className="h-0.5 bg-gray-100 mx-4"></div>
                        <Toggle label="Dark Mode" icon={<Moon size={24} />} initial={false} />
                    </Card>
                </div>

                <div>
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 ml-2">Account</h3>
                    <Card noPadding className="overflow-hidden">
                        <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors text-left">
                            <div className="flex items-center gap-3">
                                <UserIcon size={24} className="text-gray-600" />
                                <span className="font-bold text-gray-800">Manage Family Members</span>
                            </div>
                            <ChevronRight size={20} className="text-gray-400" />
                        </button>
                        <div className="h-0.5 bg-gray-100 mx-4"></div>
                        <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors text-left">
                            <div className="flex items-center gap-3">
                                <Shield size={24} className="text-gray-600" />
                                <span className="font-bold text-gray-800">Privacy & Security</span>
                            </div>
                            <ChevronRight size={20} className="text-gray-400" />
                        </button>
                    </Card>
                </div>

                <button className="w-full p-5 mt-4 rounded-2xl border-2 border-red-100 text-red-500 font-bold flex items-center justify-center gap-2 hover:bg-red-50 hover:border-red-200 transition-all text-lg">
                    <LogOut size={24} />
                    Sign Out
                </button>

                <div className="text-center text-xs font-bold text-gray-300 mt-4">
                    Version 1.0.2 • Family Chore Tracker
                </div>
            </div>
        </div>
    </div>
  );
};

export default SettingsScreen;