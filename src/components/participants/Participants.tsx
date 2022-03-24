import React, { useEffect, useState } from 'react';
import { useParticipants } from '../../hooks/useParticipants';
import { useGroup } from '../../hooks/useGroup';
import { GroupParticipant } from '../../utils/types';
import DisplayParticipant from './Display';
import { makeStyles } from '@mui/styles';
import { Box, List } from '@mui/material';

const useStyles = makeStyles(() => ({
  participants: {
    overflow: 'auto',
    maxHeight: '30rem',
    height: '30rem',
    marginBottom: '0.5rem',
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
}));

interface ParticipantsProps {
  groupId: string;
}

const Participants: React.FC<ParticipantsProps> = ({ groupId }) => {
  const classes = useStyles();
  const { getParticipants } = useParticipants();
  const { getAdmin } = useGroup();

  const [participants, setParticipants] = useState<GroupParticipant[]>([]);
  const [adminId, setAdminId] = useState<string>('');

  // automatically check db for new participants
  useEffect(() => {
    let isSubscribed = true;

    getParticipants(groupId, setParticipants, isSubscribed);
    getAdmin(groupId, setAdminId, isSubscribed);

    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <>
      <Box className={classes.participants}>
        <List>
          {participants.map((participant: GroupParticipant) => {
            return (
              <div key={participant.id}>
                {adminId === participant.id ? (
                  <DisplayParticipant participant={participant} admin={true} />
                ) : (
                  <DisplayParticipant participant={participant} />
                )}
              </div>
            );
          })}
        </List>
      </Box>
    </>
  );
};

export default Participants;
