import React, { useState, useEffect } from 'react';
import { Container, Tabs, Tab } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: any) => ({
  tabs: {
    [theme.breakpoints.up('sm')]: {
      minHeight: '1.5rem',
      height: '1.5rem',
    },
    [theme.breakpoints.down('md')]: {
      minHeight: '2.25rem',
      height: '2.25rem',
    },
    [theme.breakpoints.up('md')]: {
      minHeight: '3rem',
      height: '3rem',
    },
    [theme.breakpoints.up('lg')]: {
      minHeight: '3rem',
      height: '3rem',
    },
    '& .MuiButtonBase-root.MuiTab-root': {
      fontSize: '0.875rem',
      [theme.breakpoints.up('sm')]: {
        fontSize: '0.5rem',
        minHeight: '1.5rem',
        height: '1.5rem',
      },
      [theme.breakpoints.down('md')]: {
        fontSize: '0.625rem',
        minHeight: '2.25rem',
        height: '2.25rem',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '0.875rem',
        minHeight: '3rem',
        height: '3rem',
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: '0.875rem',
        minHeight: '3rem',
        height: '3rem',
      },
    },
  },
}));

interface ButtonsProps {
  startPomodoro: () => void;
  startBreak: (boolean: boolean) => void;
  isBreak: boolean;
  isLongBreak: boolean;
}

const ButtonsType: React.FC<ButtonsProps> = ({
  startPomodoro,
  startBreak,
  isBreak,
  isLongBreak,
}) => {
  const classes = useStyles();

  const [value, setValue] = useState(!isBreak ? 0 : !isLongBreak ? 1 : 2);

  useEffect(() => {
    setValue(!isBreak ? 0 : !isLongBreak ? 1 : 2);
  }, [isBreak, isLongBreak]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    if (newValue === 0) {
      startPomodoro();
    } else if (newValue === 1) {
      startBreak(false);
    } else {
      startBreak(true);
    }
  };

  return (
    <Container>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        className={classes.tabs}
      >
        <Tab label="Pomodoro" />
        <Tab label="Short Break" />
        <Tab label="Long Break" />
      </Tabs>
    </Container>
  );
};

export default ButtonsType;
