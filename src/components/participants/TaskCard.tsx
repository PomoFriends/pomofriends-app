import {
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { TaskData } from '../../utils/types/userTypes';

const useStyles = makeStyles((theme: any) => ({
  pomodoroCount: {
    color: theme.palette.secondary.main,
  },
  listItem: {
    '&:hover': {
      backgroundColor: 'rgba(187, 134, 252, 0.08)',
    },
  },
}));

interface TaskCardProps {
  task: TaskData;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const classes = useStyles();
  return (
    <>
      <ListItem
        secondaryAction={
          <>
            <Tooltip title="Pomodoros done/goal">
              <IconButton edge="end" className={classes.pomodoroCount}>
                <Typography>
                  {task.pomodorosDone} / {task.pomodorosTotal}
                </Typography>
              </IconButton>
            </Tooltip>
          </>
        }
        className={classes.listItem}
      >
        <ListItemText
          primary={task.title}
          secondary={task.description}
          sx={{ wordBreak: 'break-all', paddingRight: '0.5rem' }}
        />
      </ListItem>
      <Divider />
    </>
  );
};

export default TaskCard;
