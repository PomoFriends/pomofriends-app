// import { db } from '../firebase/firebase';
import { TaskForm, useTasksType } from '../utils/types';
// import { useAuth } from './useAuth';

export const useTasks = (): useTasksType => {
  // const { user, setUpdate } = useAuth();

  const createTask = async (task: TaskForm) => {
    return false;
  };

  const editTask = async (task: TaskForm, taskId: string) => {
    return false;
  };
  const deleteTask = async (taskId: string) => {
    return false;
  };
  const setCurrentTask = async (taskId: string) => {
    return false;
  };
  const completeTask = async (taskId: string) => {
    return false;
  };
  const uncompleteTask = async (taskId: string) => {
    return false;
  };
  const getTasks = (userId: string) => {
    console.log(userId);
  };

  return {
    createTask,
    editTask,
    deleteTask,
    setCurrentTask,
    completeTask,
    uncompleteTask,
    getTasks,
  };
};
