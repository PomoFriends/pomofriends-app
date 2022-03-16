import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { TaskData } from '../../utils/types';

const useStyles = makeStyles((theme: any) => ({
  join: {
    color: theme.palette.primary.main,
  },
  details: {
    color: theme.palette.secondary.main,
  },
  popover: {
    '& .MuiPopover-paper': {
      border: '1px solid black',
      borderColor: theme.palette.secondary.main,
      minWidth: '20rem',
      maxWidth: '20rem',
      widht: '20rem',
      minHeight: '10rem',
      // height: '10rem',
    },
  },
  participants: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
  },
  participantsIcon: {
    marginTop: '1rem',
    color: theme.palette.primary.main,
  },
  description: {
    color: theme.palette.text.secondary,
  },
}));

interface TaskCardProps {
  task: TaskData;
  current: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, current }) => {
  const classes = useStyles();

  return (
    <>
      <ListItem
        secondaryAction={
          <>
            <Tooltip title="Open details">
              <IconButton
                edge="end"
                aria-label="open-details"
                // onClick={openDetails}
                className={classes.details}
              >
                <MoreHorizIcon />
              </IconButton>
            </Tooltip>
          </>
        }
      >
        <ListItemText primary={task.title} />
      </ListItem>
      <Divider />
    </>
  );
};

export default TaskCard;
