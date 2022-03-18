import React, { useState } from 'react';
import { useGroup } from '../../hooks/useGroup';
import Chat from '../chat/Chat';
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Typography,
  Tooltip,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { makeStyles } from '@mui/styles';
import RoomButtons from '../buttons/RoomButtons';
import Participants from '../participants/Participants';

const useStyles = makeStyles((theme: any) => ({
  groupList: {
    overflow: 'auto',
    maxHeight: '36rem',
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
  group: any;
}

const GroupRoom: React.FC<GroupProps> = ({ group }) => {
  const classes = useStyles();

  const { leaveGroup } = useGroup();

  const handleLeaveGroup = async () => {
    await leaveGroup(group.id);
  };

  const [isChat, setIsChat] = useState<boolean>(true);

  const changeComponent = () => {
    setIsChat(!isChat);
  };

  return (
    <>
      <Box>
        <Grid container direction="row">
          <Grid item xs={9}>
            <Typography variant="h5" className={classes.typography}>
              {group.name}
            </Typography>
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

      {/* <Chat groupId={group.id} /> */}
      {isChat ? (
        <Chat groupId={group.id} />
      ) : (
        <Participants groupId={group.id} />
      )}
    </>
  );
};

export default GroupRoom;
