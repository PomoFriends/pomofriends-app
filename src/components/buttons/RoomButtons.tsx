import React, { useState } from 'react';
import { Container, Tabs, Tab } from '@mui/material';

interface RoomButtonsProps {
  changeComponent: () => void;
  isChat: boolean;
}

const RoomButtons: React.FC<RoomButtonsProps> = ({
  changeComponent,
  isChat,
}) => {
  const [value, setValue] = useState(isChat ? 0 : 1);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    changeComponent();
  };

  return (
    <Container>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Chat" />
        <Tab label="Participants" />
      </Tabs>
    </Container>
  );
};

export default RoomButtons;
