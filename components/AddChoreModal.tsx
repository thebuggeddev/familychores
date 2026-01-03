import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { User, Chore } from '../types';
import Avatar from './Avatar';
import { RoughButtonShape } from './RoughShapes';
import Card from './Card';

interface AddChoreModalProps {
  users: User[];
  onClose: () => void;
  onSave: (chore: Omit<Chore, 'id' | 'completed'>) => void;
  initialData?: Chore;
}

const AddChoreModal: React.FC<AddChoreModalProps> = ({ users, onClose, onSave, initialData }) => {
  const [title, setTitle] = useState('');
  const [assigneeId, setAssigneeId] = useState(users[0]?.id || '');
  const [points, setPoints] = useState(10);
  const [type, setType] = useState<'daily' | 'weekly'>('daily');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setAssigneeId(initialData.assigneeId);
      setPoints(initialData.points);
      setType(initialData.type);
      setDescription(initialData.description);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !assigneeId) return;

    onSave({
      title,
      assigneeId,
      dueDate: new Date().toISOString(),
      points,
      repeat: type === 'daily' ? ['M', 'T', 'W', 'T', 'F'] : ['S'],
      description: description || 'No description',
      type
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md bg-cream p-6 rounded-[30px] border-[3px] border-black shadow-2xl relative animate-[wiggle_0.2s_ease-out] flex flex-col max-h-[90vh] overflow-y-auto hide-scrollbar">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-white border-2 border-black rounded-full flex items-center justify-center hover:bg-gray-100 z-10"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-black mb-6 text-center mt-2">
            {initialData ? 'Edit Chore' : 'Add New Chore'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Title Input */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-2">Chore Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Clean Room"
              className="w-full p-4 bg-white border-[2.5px] border-black shape-hand outline-none focus:border-accentYellow text-lg font-bold"
              autoFocus
            />
          </div>

          {/* Assignee */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-2">Assign To</label>
            {/* Added pt-4 to fix top padding clipping issue */}
            <div className="flex gap-3 overflow-x-auto pb-4 pt-4 px-2 hide-scrollbar -mx-2">
              {users.map(user => (
                <div key={user.id} onClick={() => setAssigneeId(user.id)} className="cursor-pointer relative shrink-0 transition-transform hover:scale-105">
                   <Avatar 
                     user={user} 
                     size="md" 
                     selected={assigneeId === user.id}
                   />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             {/* Points */}
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-2">Points</label>
                <div className="relative">
                    <input
                    type="number"
                    value={points}
                    onChange={(e) => setPoints(Number(e.target.value))}
                    className="w-full p-3 bg-white border-[2.5px] border-black shape-hand outline-none font-black text-xl text-center"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-accentYellow">★</span>
                </div>
            </div>

            {/* Type */}
             <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-2">Frequency</label>
                <select 
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full p-3 bg-white border-[2.5px] border-black shape-hand outline-none font-bold text-gray-700 appearance-none text-center"
                >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What needs to be done?"
              rows={2}
              className="w-full p-4 bg-white border-[2.5px] border-black shape-hand outline-none focus:border-accentYellow font-medium"
            />
          </div>

          {/* Save Button */}
          <button type="submit" className="mt-4 w-full h-[72px] relative flex items-center justify-center gap-2 group transform transition-transform active:scale-95">
             {/* Explicit fill to ensure visibility */}
             <RoughButtonShape fill="#1A1A1A" className="drop-shadow-md" />
             <div className="relative z-10 flex items-center gap-3 text-white font-bold text-xl tracking-tight">
                <Check size={24} strokeWidth={3} />
                {initialData ? 'Save Changes' : 'Save Task'}
             </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddChoreModal;