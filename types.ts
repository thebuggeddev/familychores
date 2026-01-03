export interface User {
  id: string;
  name: string;
  avatar: string;
  choresDone: number;
  totalPoints: number;
  color: string; // Tailwind ring color class
  role?: 'Parent' | 'Kid' | 'Other';
  rewardGoal?: string; // The name of the reward they want
  rewardGoalPoints?: number; // How many points needed
}

export interface Chore {
  id: string;
  title: string;
  assigneeId: string;
  dueDate: string; // ISO string or simplified string for demo
  points: number;
  completed: boolean;
  repeat: string[]; // ['M', 'T', 'W', etc.]
  description: string;
  type: 'daily' | 'weekly';
}

export type ViewState = 'HOME' | 'DETAILS' | 'LEADERBOARD' | 'SETTINGS' | 'FAMILY' | 'MEMBER_DETAILS';