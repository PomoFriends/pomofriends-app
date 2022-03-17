import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useTasks } from '../../hooks/useTasks';
import { TaskData } from '../../utils/types';

const useStyles = makeStyles((theme: any) => ({
  detailsButton: {
    color: theme.palette.secondary.main,
    marginLeft: '1rem',
  },
  editButton: {
    color: theme.palette.primary.main,
  },
  completeButton: {
    color: theme.palette.primary.main,
  },
  notCompleteButton: {
    color: 'gray',
  },
  pomodoroCount: {
    '&.Mui-disabled': {
      color: theme.palette.primary.main,
    },
  },
}));

interface TaskCardProps {
  task: TaskData;
  current: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, current }) => {
  const classes = useStyles();
  const { setCurrentTask, completeTask, uncompleteTask } = useTasks();

  const taskId = task.id;

  const handleSetCurrentTask = async () => await setCurrentTask(taskId);

  const handleCompleteTask = async () => {
    if (task.complete !== true) {
      await completeTask(taskId);
    } else {
      await uncompleteTask(taskId);
    }
  };

  // const handleDeleteTask = async () => {
  //   await deleteTask(taskId);
  // };

  return (
    <>
      <ListItem
        secondaryAction={
          <>
            <IconButton
              edge="end"
              className={classes.pomodoroCount}
              disabled={true}
            >
              <Typography>
                {task.pomodorosDone} / {task.pomodorosTotal}
              </Typography>
            </IconButton>
            <Tooltip title="Open details">
              <IconButton
                edge="end"
                aria-label="open-details"
                // onClick={openDetails}
                className={classes.detailsButton}
              >
                <MoreHorizIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton
                edge="end"
                aria-label="edit-task"
                // onClick={openEditForm}
                className={classes.editButton}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </>
        }
        // sx={{ border: '3px solid rgba(200,200,200)' }}
        onClick={handleSetCurrentTask}
        selected={current}
      >
        <Tooltip title="Complete">
          <IconButton
            edge="start"
            aria-label="complete-task"
            onClick={handleCompleteTask}
            className={
              task.complete === true
                ? classes.completeButton
                : classes.notCompleteButton
            }
          >
            <CheckCircleIcon />
          </IconButton>
        </Tooltip>
        <ListItemText primary={task.title} secondary={task.description} />
      </ListItem>
      <Divider />
    </>
  );
};

export default TaskCard;
