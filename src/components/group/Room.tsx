import LogoutIcon from '@mui/icons-material/Logout';
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ScrollArea } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useGroup } from '../../hooks/useGroup';
import { useParticipants } from '../../hooks/useParticipants';
import { GroupData } from '../../utils/types/groupTypes';
import RoomButtons from '../buttons/RoomButtons';
import Chat from '../chat/Chat';
import Participants from '../participants/Participants';
import { useAuth } from '../../hooks/useAuth';
import { notification } from '../../utils/notification';

const useStyles = makeStyles((theme: any) => ({
  typography: {
    marginLeft: 16,
    marginTop: 12,
  },
  addGroup: {
    backgroundColor: theme.palette.secondary.main,
  },
  addBox: {
    paddingRight: 16,
  },
  addGroupModal: {
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

interface GroupProps {
  group: GroupData;
}

const GroupRoom: React.FC<GroupProps> = ({ group }) => {
  const classes = useStyles();

  const { user } = useAuth();
  const { leaveGroup } = useGroup();
  const { getAdmin, getMutedUser } = useParticipants();
  const [clickedButton, setClicked] = useState<boolean>(false);

  const handleLeaveGroup = async () => {
    if (clickedButton === false) {
      setClicked(true);
      await leaveGroup(group.id);
    }
  };

  const [isChat, setIsChat] = useState<boolean>(true);

  const changeComponent = () => {
    setIsChat(!isChat);
  };

  const [adminId, setAdminId] = useState<string>('');
  const [mutedUsers, setMutedUsers] = useState<string[]>([]);

  // automatically check db for new participants
  useEffect(() => {
    let isSubscribed = true;

    getMutedUser(setMutedUsers, isSubscribed);

    return () => {
      isSubscribed = false;
    };
  }, []);

  // automatically check db for new participants
  useEffect(() => {
    let isSubscribed = true;

    getAdmin(group.id, setAdminId, isSubscribed);

    return () => {
      isSubscribed = false;
    };
  }, []);

  useEffect(() => {
    if (adminId === user!.id) {
      notification({
        title: 'You are now an admin of the group',
        message: '',
        color: 'yellow',
      });
    }
  }, [adminId]);

  return (
    <>
      <Box>
        <Grid container direction="row">
          <Grid item xs={9}>
            <ScrollArea offsetScrollbars>
              <Typography
                variant="h5"
                className={classes.typography}
                sx={{ overflow: 'hidden' }}
                display="block"
              >
                {group.name}
              </Typography>
            </ScrollArea>
          </Grid>
          <Grid
            item
            xs={3}
            container
            justifyContent={'right'}
            className={classes.addBox}
          >
            <Tooltip title="Leave Group">
              <IconButton
                edge="end"
                aria-label="leave-group"
                onClick={handleLeaveGroup}
              >
                <Avatar className={classes.addGroup}>
                  <LogoutIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>

      <RoomButtons isChat={isChat} changeComponent={changeComponent} />

      {isChat ? (
        <Chat groupId={group.id} mutedUsers={mutedUsers} />
      ) : (
        <Participants
          groupId={group.id}
          adminId={adminId}
          mutedUsers={mutedUsers}
        />
      )}
    </>
  );
};

export default GroupRoom;
