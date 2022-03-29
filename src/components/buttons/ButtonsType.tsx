import { useState, useEffect } from 'react';
import { Container, Tabs, Tab } from '@mui/material';

interface ButtonsProps {
  startPomodoro: () => void;
  startBreak: (boolean: boolean) => void;
  isBreak: boolean;
  isLongBreak: boolean;
  admin: boolean;
}

const ButtonsType: React.FC<ButtonsProps> = ({
  startPomodoro,
  startBreak,
  isBreak,
  isLongBreak,
  admin,
}) => {
  const [value, setValue] = useState(!isBreak ? 0 : !isLongBreak ? 1 : 2);

  useEffect(() => {
    setValue(!isBreak ? 0 : !isLongBreak ? 1 : 2);
  }, [isBreak, isLongBreak]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    if (!admin) return;
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
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Pomodoro" disabled={!admin} />
        <Tab label="Short Break" disabled={!admin} />
        <Tab label="Long Break" disabled={!admin} />
      </Tabs>
    </Container>
  );
};

export default ButtonsType;
