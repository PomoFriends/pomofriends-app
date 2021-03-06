import AddIcon from '@mui/icons-material/Add';
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  List,
  Modal,
  Tooltip,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useTasks } from '../../hooks/useTasks';
import { TaskData } from '../../utils/types/userTypes';
import Card from './Card';
import Form from './Form';
import { ScrollArea } from '@mantine/core';
import Loader from '../elements/Loader';

const useStyles = makeStyles((theme: any) => ({
  typography: {
    marginLeft: 16,
    marginTop: 12,
  },
  addTask: {
    backgroundColor: theme.palette.secondary.main,
  },
  addBox: {
    paddingRight: 16,
  },
  addTaskModal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '2px solid #000',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 8,
    borderColor: theme.palette.primary.main,
  },
}));

const Tasks: React.FC = () => {
  const classes = useStyles();
  const { getTasks } = useTasks();
  const { user } = useAuth();

  const [taskList, setTaskList] = useState<TaskData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [currentTaskId, setCurrentTaskId] = useState<string>('1');

  useEffect(() => {
    let isSubscribed = true;

    getTasks(setTaskList, setCurrentTaskId, isSubscribed);

    return () => {
      setIsLoading(false);
      isSubscribed = false;
    };
  }, [user]);

  useEffect(() => {
    if (taskList.length !== 0 && !user) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [taskList]);

  let body;
  if (isLoading) {
    body = (
      <Box my={11}>
        <Loader />
      </Box>
    );
  } else if (taskList.length === 0 && !isLoading) {
    body = (
      <Typography variant="h6" className={classes.typography}>
        No tasks, add new task!
      </Typography>
    );
  } else {
    body = (
      <Box>
        <ScrollArea style={{ height: '16rem' }}>
          <List>
            {taskList.map((task: TaskData) => (
              <div key={task.id}>
                {currentTaskId === task.id ? (
                  <Card task={task} current={true} />
                ) : (
                  <Card task={task} current={false} />
                )}
              </div>
            ))}
          </List>
        </ScrollArea>
      </Box>
    );
  }

  return (
    <>
      <Box>
        <Grid container direction="row">
          <Grid item xs={9}>
            <Typography variant="h5" className={classes.typography}>
              Tasks
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            container
            justifyContent={'right'}
            className={classes.addBox}
          >
            <Tooltip title="Add Task">
              <IconButton edge="end" aria-label="add-task" onClick={handleOpen}>
                <Avatar className={classes.addTask}>
                  <AddIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className={classes.addTaskModal}>
                <Form handleClose={handleClose} />
              </Box>
            </Modal>
          </Grid>
        </Grid>
      </Box>

      <>{body}</>
    </>
  );
};

export default Tasks;
