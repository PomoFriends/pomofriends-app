import { Box, Avatar, IconButton, Typography, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Form from './Form';

const useStyles = makeStyles((theme: any) => ({
  taskList: {
    overflow: 'auto',
    // maxHeight: '36rem',
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey',
      borderRadius: 8,
    },
  },
  typography: {
    marginLeft: 16,
    marginTop: 12,
  },
  addButton: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    maxWidth: '34rem',
    padding: 0,
  },
  addTask: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const Tasks: React.FC = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let addTask = null;

  if (open) {
    addTask = <Form handleClose={handleClose} />;
  } else {
    addTask = (
      <Box className={classes.addButton}>
        <Tooltip title="Add Task">
          <IconButton edge="end" aria-label="add-group" onClick={handleOpen}>
            <Avatar className={classes.addTask}>
              <AddIcon />
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
    );
  }

  return (
    <>
      <Typography variant="h5" className={classes.typography}>
        Tasks
      </Typography>
      {addTask}
    </>
  );
};

export default Tasks;
