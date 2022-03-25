import { useState, useEffect } from 'react';
import { Container, Tabs, Tab } from '@mui/material';

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
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Pomodoro" />
        <Tab label="Short Break" />
        <Tab label="Long Break" />
      </Tabs>
    </Container>
  );
};

export default ButtonsType;
