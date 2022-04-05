import firebase from 'firebase/compat/app';
import { useRouter } from 'next/router';
import { db } from '../firebase/firebase';
import { TaskForm } from '../utils/types/formTypes';
import { useTasksType } from '../utils/types/hookTypes';
import { TaskData } from '../utils/types/userTypes';
import { useAuth } from './useAuth';
import { notification } from '../utils/notification';

export const useTasks = (): useTasksType => {
  const { user, handleUpdate } = useAuth();
  const router = useRouter();

  const createTask = async (task: TaskForm) => {
    if (user) {
      try {
        // Create a task doc with randomly generated id
        const newTask = db
          .collection('tasks')
          .doc(user.id)
          .collection('tasks')
          .doc();

        // Set values to the task
        await newTask.set({
          id: newTask.id,
          ...task,
          pomodorosDone: 0,
          timeSpend: 0,
          complete: false,
          completedAt: null,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });

        // Change current task for the user
        await db
          .collection('users')
          .doc(user.id)
          .update({ currentTaskId: newTask.id });

        // Update user
        handleUpdate();
      } catch {
        console.log("Something went wrong, couldn't create the task");
      }
    } else {
      console.log('User is not logged in!');
      await router.push('/sign-in');
    }
  };

  const editTask = async (task: TaskForm, taskId: string) => {
    if (user) {
      try {
        // Set values to the task
        await db
          .collection('tasks')
          .doc(user.id)
          .collection('tasks')
          .doc(taskId)
          .update({
            ...task,
            updatedAt: Date.now(),
          });
      } catch {
        console.log("Something went wrong, couldn't update the task");
      }
    } else {
      console.log('User is not logged in!');
      await router.push('/sign-in');
    }
  };

  const deleteTask = async (taskId: string) => {
    if (user) {
      try {
        // Set values to the task
        await db
          .collection('tasks')
          .doc(user.id)
          .collection('tasks')
          .doc(taskId)
          .delete();

        if (user.currentTaskId === taskId) {
          await db
            .collection('users')
            .doc(user.id)
            .update({ currentTaskId: null });
        }
      } catch {
        console.log("Something went wrong, couldn't delete the task");
      }
    } else {
      console.log('User is not logged in!');
      await router.push('/sign-in');
    }
  };

  const setCurrentTask = async (taskId: string) => {
    if (user) {
      try {
        await db
          .collection('users')
          .doc(user.id)
          .update({ currentTaskId: taskId });

        // Update user
        handleUpdate();
      } catch {
        console.log("Something went wrong, couldn't set current task");
      }
    } else {
      console.log('User is not logged in!');
      await router.push('/sign-in');
    }
  };

  const completeTask = async (taskId: string) => {
    if (user) {
      try {
        // Set values to the task
        await db
          .collection('tasks')
          .doc(user.id)
          .collection('tasks')
          .doc(taskId)
          .update({
            complete: true,
            completedAt: Date.now(),
            updatedAt: Date.now(),
          });

        if (user.currentTaskId === taskId) {
          await db
            .collection('users')
            .doc(user.id)
            .update({ currentTaskId: null });
        }
        const task: TaskData = await db
          .collection('tasks')
          .doc(user.id)
          .collection('tasks')
          .doc(taskId)
          .get()
          .then((res) => {
            return res.data() as TaskData;
          });

        notification({
          title: "You've complited the task:",
          message: task.title,
          color: 'violet',
        });
      } catch {
        console.log("Something went wrong, couldn't complete the task");
      }
    } else {
      console.log('User is not logged in!');
      await router.push('/sign-in');
    }
  };

  const uncompleteTask = async (taskId: string) => {
    if (user) {
      try {
        // Set values to the task
        await db
          .collection('tasks')
          .doc(user.id)
          .collection('tasks')
          .doc(taskId)
          .update({
            complete: false,
            completedAt: null,
            updatedAt: Date.now(),
          });
      } catch {
        console.log("Something went wrong, couldn't uncomplete the task");
      }
    } else {
      console.log('User is not logged in!');
      await router.push('/sign-in');
    }
  };

  const addPomodoro = async () => {
    if (user && user.currentTaskId) {
      try {
        const taskId = user.currentTaskId;
        const taskRef = db
          .collection('tasks')
          .doc(user.id)
          .collection('tasks')
          .doc(taskId);

        // Increment pomodoro
        await taskRef.update({
          pomodorosDone: firebase.firestore.FieldValue.increment(+1),
        });

        // Complete task if pomodorosDone and pomodorosTotal is the same
        await taskRef.get().then(async (res) => {
          const task = res.data() as TaskData;
          if (task.pomodorosDone === task.pomodorosTotal) {
            await completeTask(taskId);
          }
        });
      } catch {
        console.log("Something went wrong, couldn't add pomodoro");
      }
    } else {
      console.log('User is not logged in!');
      await router.push('/sign-in');
    }
  };

  const getTasks = (
    setTaskList: any,
    setCurrentTaskId: any,
    isSubscribed: boolean
  ) => {
    if (!isSubscribed) return;

    if (user) {
      try {
        db.collection('tasks')
          .doc(user.id)
          .collection('tasks')
          .orderBy('createdAt')
          .onSnapshot((querySnapShot) => {
            // get all documents from collection with id
            const data = querySnapShot.docs.map((doc) => ({
              ...doc.data(),
            }));

            //   update state
            if (isSubscribed) {
              setTaskList(data as TaskData[]);
            }
          });

        setCurrentTaskId(user.currentTaskId);
      } catch (error) {
        console.log("Couldn't get tasks");
      }
    }
  };

  const updateTaskTime = async (time: number) => {
    if (user && user.currentTaskId) {
      try {
        const taskId = user.currentTaskId;
        const taskRef = db
          .collection('tasks')
          .doc(user.id)
          .collection('tasks')
          .doc(taskId);

        // Increment pomodoro
        await taskRef.update({
          timeSpend: firebase.firestore.FieldValue.increment(time),
        });
      } catch {
        console.log("Something went wrong, couldn't save time");
      }
    } else {
      console.log('User is not logged in!');
      await router.push('/sign-in');
    }
  };

  return {
    createTask,
    editTask,
    deleteTask,
    setCurrentTask,
    completeTask,
    uncompleteTask,
    addPomodoro,
    getTasks,
    updateTaskTime,
  };
};
