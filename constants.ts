import { User, Chore } from './types';

export const USERS: User[] = [
  { id: 'u1', name: 'Mom', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', choresDone: 15, totalPoints: 1200, color: 'ring-emerald-400', role: 'Parent', rewardGoal: 'Spa Day', rewardGoalPoints: 5000 },
  { id: 'u2', name: 'Dad', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', choresDone: 6, totalPoints: 450, color: 'ring-blue-400', role: 'Parent', rewardGoal: 'New Golf Clubs', rewardGoalPoints: 8000 },
  { id: 'u3', name: 'Leo', avatar: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', choresDone: 12, totalPoints: 890, color: 'ring-accentYellow', role: 'Kid', rewardGoal: 'Video Game Console', rewardGoalPoints: 2000 },
  { id: 'u4', name: 'Mia', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', choresDone: 8, totalPoints: 600, color: 'ring-pink-400', role: 'Kid', rewardGoal: 'Lego Castle Set', rewardGoalPoints: 1500 },
  { id: 'u5', name: 'Adc', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', choresDone: 2, totalPoints: 100, color: 'ring-purple-400', role: 'Other', rewardGoal: 'Pizza Party', rewardGoalPoints: 500 },
];

export const CHORES: Chore[] = [
  {
    id: 'c1',
    title: 'Walk the Dog',
    assigneeId: 'u3',
    dueDate: '2023-10-24T17:00:00',
    points: 30,
    completed: true,
    repeat: ['M', 'W', 'F'],
    description: 'Take Buster for a 20 minute walk around the neighborhood.',
    type: 'daily'
  },
  {
    id: 'c2',
    title: 'Take out Trash',
    assigneeId: 'u2',
    dueDate: '2023-10-24T20:00:00',
    points: 20,
    completed: false,
    repeat: ['T', 'F'],
    description: 'Empty all bins in the kitchen and bathrooms.',
    type: 'daily'
  },
  {
    id: 'c3',
    title: 'Start Laundry',
    assigneeId: 'u1',
    dueDate: '2023-10-24T10:00:00',
    points: 40,
    completed: false,
    repeat: ['S'],
    description: 'Wash and fold the whites.',
    type: 'daily'
  },
  {
    id: 'c4',
    title: 'Clean Playroom',
    assigneeId: 'u3',
    dueDate: '2023-10-24T17:00:00',
    points: 50,
    completed: false,
    repeat: ['W', 'S'],
    description: 'Put all LEGO blocks back in their bins.',
    type: 'weekly'
  },
  {
    id: 'c5',
    title: 'Wash Dishes',
    assigneeId: 'u4',
    dueDate: '2023-10-24T19:00:00',
    points: 25,
    completed: true,
    repeat: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    description: 'Load the dishwasher after dinner.',
    type: 'daily'
  },
  {
    id: 'c6',
    title: 'Water Plants',
    assigneeId: 'u4',
    dueDate: '2023-10-24T09:00:00',
    points: 15,
    completed: false,
    repeat: ['M', 'F'],
    description: 'Water the fern and the peace lily in the living room.',
    type: 'weekly'
  },
  {
    id: 'c7',
    title: 'Mow Lawn',
    assigneeId: 'u2',
    dueDate: '2023-10-28T10:00:00',
    points: 100,
    completed: false,
    repeat: ['S'],
    description: 'Mow the front and back yard.',
    type: 'weekly'
  },
  {
    id: 'c8',
    title: 'Make Bed',
    assigneeId: 'u3',
    dueDate: '2023-10-24T08:00:00',
    points: 10,
    completed: true,
    repeat: ['M', 'T', 'W', 'T', 'F'],
    description: 'Make your bed before school.',
    type: 'daily'
  },
  {
    id: 'c9',
    title: 'Clean Windows',
    assigneeId: 'u1',
    dueDate: '2023-10-29T14:00:00',
    points: 60,
    completed: false,
    repeat: ['S'],
    description: 'Wipe down the living room windows inside and out.',
    type: 'weekly'
  },
  {
    id: 'c10',
    title: 'Feed Cat',
    assigneeId: 'u5',
    dueDate: '2023-10-24T07:30:00',
    points: 10,
    completed: false,
    repeat: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    description: 'Fill the bowl with one scoop of dry food.',
    type: 'daily'
  },
  {
    id: 'c11',
    title: 'Sweep Porch',
    assigneeId: 'u3',
    dueDate: '2023-10-24T16:00:00',
    points: 20,
    completed: false,
    repeat: ['W'],
    description: 'Sweep the leaves off the front porch.',
    type: 'weekly'
  },
  {
    id: 'c12',
    title: 'Organize Books',
    assigneeId: 'u4',
    dueDate: '2023-10-24T16:30:00',
    points: 30,
    completed: false,
    repeat: ['F'],
    description: 'Straighten up the bookshelf in the den.',
    type: 'weekly'
  },
  {
    id: 'c13',
    title: 'Empty Dishwasher',
    assigneeId: 'u3',
    dueDate: '2023-10-24T07:00:00',
    points: 20,
    completed: true,
    repeat: ['M', 'W', 'F'],
    description: 'Put away all clean dishes.',
    type: 'daily'
  },
   {
    id: 'c14',
    title: 'Fold Towels',
    assigneeId: 'u4',
    dueDate: '2023-10-24T18:00:00',
    points: 25,
    completed: false,
    repeat: ['S'],
    description: 'Help mom fold the laundry towels.',
    type: 'weekly'
  }
];