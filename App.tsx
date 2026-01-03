import React, { useState } from 'react';
import { USERS, CHORES } from './constants';
import { ViewState, Chore, User } from './types';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import FamilyScreen from './screens/FamilyScreen';
import SettingsScreen from './screens/SettingsScreen';
import MemberDetailsScreen from './screens/MemberDetailsScreen';
import AddChoreModal from './components/AddChoreModal';
import AddMemberModal from './components/AddMemberModal';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [selectedChoreId, setSelectedChoreId] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  
  // State for data
  const [chores, setChores] = useState<Chore[]>(CHORES);
  const [users, setUsers] = useState<User[]>(USERS);
  
  // Modals
  const [isAddChoreModalOpen, setIsAddChoreModalOpen] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  
  // Edit State
  const [editingChore, setEditingChore] = useState<Chore | undefined>(undefined);

  const handleChoreClick = (choreId: string) => {
    setSelectedChoreId(choreId);
    setCurrentView('DETAILS');
  };

  const handleUserClick = (userId: string) => {
      setSelectedUserId(userId);
      setCurrentView('MEMBER_DETAILS');
  };

  const handleToggleComplete = (choreId: string) => {
    setChores(prev => prev.map(c => 
      c.id === choreId ? { ...c, completed: !c.completed } : c
    ));
  };

  const handleDeleteChore = (choreId: string) => {
      setChores(prev => prev.filter(c => c.id !== choreId));
      setCurrentView('HOME');
      setSelectedChoreId(null);
  };

  const handleSaveChore = (choreData: Omit<Chore, 'id' | 'completed'>) => {
    if (editingChore) {
      // Update existing
      setChores(prev => prev.map(c => 
        c.id === editingChore.id ? { ...c, ...choreData } : c
      ));
      setEditingChore(undefined);
    } else {
      // Create new
      const newChore: Chore = {
        ...choreData,
        id: `c${Date.now()}`,
        completed: false
      };
      setChores(prev => [newChore, ...prev]);
    }
  };

  const handleAddMember = (newMemberData: Omit<User, 'id' | 'choresDone' | 'totalPoints'>) => {
    const newMember: User = {
        ...newMemberData,
        id: `u${Date.now()}`,
        choresDone: 0,
        totalPoints: 0
    };
    setUsers(prev => [...prev, newMember]);
  };

  const handleEditClick = (chore: Chore) => {
    setEditingChore(chore);
    setIsAddChoreModalOpen(true);
  };

  const handleCloseChoreModal = () => {
    setIsAddChoreModalOpen(false);
    setEditingChore(undefined);
  };

  const renderView = () => {
    if (currentView === 'DETAILS' && selectedChoreId) {
      const chore = chores.find(c => c.id === selectedChoreId);
      if (!chore) return <HomeScreen 
          users={users} 
          chores={chores} 
          onChoreClick={handleChoreClick} 
          onAddChore={() => setIsAddChoreModalOpen(true)}
          onNavigateToFamily={() => setCurrentView('FAMILY')}
          onUserClick={handleUserClick}
      />;
      
      return (
        <DetailsScreen 
          chore={chore} 
          users={users} 
          onBack={() => setCurrentView('HOME')}
          onToggleComplete={handleToggleComplete}
          onEdit={handleEditClick}
          onDelete={handleDeleteChore}
        />
      );
    }

    if (currentView === 'MEMBER_DETAILS' && selectedUserId) {
        const user = users.find(u => u.id === selectedUserId);
        if (!user) return <HomeScreen 
            users={users} 
            chores={chores} 
            onChoreClick={handleChoreClick} 
            onAddChore={() => setIsAddChoreModalOpen(true)}
            onNavigateToFamily={() => setCurrentView('FAMILY')}
            onUserClick={handleUserClick}
        />;

        return (
            <MemberDetailsScreen
                user={user}
                chores={chores}
                onBack={() => setCurrentView('HOME')} // Or back to wherever they came from, simpler for now
                onChoreClick={handleChoreClick}
            />
        );
    }

    switch (currentView) {
      case 'HOME':
        return <HomeScreen 
            users={users} 
            chores={chores} 
            onChoreClick={handleChoreClick} 
            onAddChore={() => setIsAddChoreModalOpen(true)}
            onNavigateToFamily={() => setCurrentView('FAMILY')}
            onUserClick={handleUserClick}
        />;
      case 'LEADERBOARD':
        return <LeaderboardScreen users={users} chores={chores} onUserClick={handleUserClick} />;
      case 'FAMILY':
         return <FamilyScreen users={users} onAddMember={() => setIsAddMemberModalOpen(true)} onUserClick={handleUserClick} />;
      case 'SETTINGS':
        return <SettingsScreen currentUser={users[0]} />;
      default:
        return <HomeScreen 
            users={users} 
            chores={chores} 
            onChoreClick={handleChoreClick} 
            onAddChore={() => setIsAddChoreModalOpen(true)}
            onNavigateToFamily={() => setCurrentView('FAMILY')}
            onUserClick={handleUserClick}
        />;
    }
  };

  return (
    <div className="h-[100dvh] flex font-sans bg-cream text-primary overflow-hidden">
        {/* Desktop Sidebar */}
        <Sidebar 
          currentView={currentView} 
          onChangeView={setCurrentView} 
          className="hidden md:flex shrink-0 z-50 h-full w-72"
        />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col relative h-full overflow-y-auto scroll-smooth">
            <div className="flex-1 w-full max-w-full">
                {renderView()}
            </div>

            {/* Mobile Bottom Navigation */}
            {currentView !== 'DETAILS' && currentView !== 'MEMBER_DETAILS' && (
                <BottomNav currentView={currentView} onChangeView={setCurrentView} />
            )}
        </main>

        {/* Add/Edit Chore Modal */}
        {isAddChoreModalOpen && (
          <AddChoreModal 
            users={users} 
            onClose={handleCloseChoreModal} 
            onSave={handleSaveChore}
            initialData={editingChore}
          />
        )}

        {/* Add Member Modal */}
        {isAddMemberModalOpen && (
            <AddMemberModal
                onClose={() => setIsAddMemberModalOpen(false)}
                onAdd={handleAddMember}
            />
        )}
    </div>
  );
};

export default App;