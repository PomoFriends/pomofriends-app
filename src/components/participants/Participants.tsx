import { Box, List } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParticipants } from '../../hooks/useParticipants';
import { GroupParticipant } from '../../utils/types/groupTypes';
import DisplayParticipant from './Display';
import { ScrollArea } from '@mantine/core';

interface ParticipantsProps {
  groupId: string;
  adminId: string;
  mutedUsers: string[];
}

const Participants: React.FC<ParticipantsProps> = ({
  groupId,
  adminId,
  mutedUsers,
}) => {
  const { getParticipants } = useParticipants();

  const [participants, setParticipants] = useState<GroupParticipant[]>([]);

  // automatically check db for new participants
  useEffect(() => {
    let isSubscribed = true;

    getParticipants(groupId, setParticipants, isSubscribed);
    console.log();

    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <>
      <Box>
        <ScrollArea style={{ height: '36rem' }}>
          <List>
            {participants.map((participant: GroupParticipant) => {
              return (
                <div key={participant.id}>
                  {adminId === participant.id ? (
                    <>
                      {mutedUsers.includes(participant.id) ? (
                        <DisplayParticipant
                          participant={participant}
                          admin={true}
                          muted={true}
                          adminId={adminId}
                          groupId={groupId}
                        />
                      ) : (
                        <DisplayParticipant
                          participant={participant}
                          admin={true}
                          muted={false}
                          adminId={adminId}
                          groupId={groupId}
                        />
                      )}
                    </>
                  ) : (
                    <>
                      {mutedUsers.includes(participant.id) ? (
                        <DisplayParticipant
                          participant={participant}
                          admin={false}
                          muted={true}
                          adminId={adminId}
                          groupId={groupId}
                        />
                      ) : (
                        <DisplayParticipant
                          participant={participant}
                          admin={false}
                          muted={false}
                          adminId={adminId}
                          groupId={groupId}
                        />
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </List>
        </ScrollArea>
      </Box>
    </>
  );
};

export default Participants;
