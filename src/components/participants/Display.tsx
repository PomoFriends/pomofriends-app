import React, { useState, MouseEvent } from 'react';
import {
  ListItem,
  ListItemSecondaryAction,
  Divider,
  Tooltip,
  IconButton,
  List,
  Popover,
  Box,
  Typography,
  Avatar,
} from '@mui/material';
import { GroupParticipant } from '../../utils/types';
import { makeStyles } from '@mui/styles';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FlagIcon from '@mui/icons-material/Flag';

const useStyles = makeStyles((theme: any) => ({
  actionButton: {
    color: theme.palette.primary.main,
  },
  popover: {
    '& .MuiPopover-paper': {
      border: '1px solid black',
      borderColor: theme.palette.secondary.main,
    },
  },
  listItem: {
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: 'rgba(187, 134, 252, 0.08)',
    },
  },
  list: {
    minHeight: '1.5rem',
    '&:hover': {
      backgroundColor: 'rgba(187, 134, 252, 0.08)',
    },
    '&:hover $listItemSecondaryAction': {
      visibility: 'inherit',
    },
  },
  listItemSecondaryAction: {
    visibility: 'hidden',
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
}));
interface DisplayProps {
  participant: GroupParticipant;
  groupId: string;
}

const DisplayParticipant: React.FC<DisplayProps> = ({
  participant,
  groupId,
}) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openDetails = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeDetails = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'group-details' : undefined;

  return (
    <>
      <ListItem
        classes={{
          container: classes.list,
        }}
      >
        <Box className={classes.box}>
          <Avatar alt={participant.username} src={participant.profilePic!} />
          <Typography
            sx={{
              color: participant.color,
              marginLeft: '0.5rem',
              marginTop: '0.2rem',
            }}
            variant="h6"
          >
            {participant.username}
          </Typography>
        </Box>

        <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
          <Tooltip title="action">
            <IconButton
              edge="end"
              onClick={openDetails}
              aria-label="action-button"
              className={classes.actionButton}
            >
              <MoreHorizIcon />
            </IconButton>
          </Tooltip>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={closeDetails}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            className={classes.popover}
          >
            <List>
              <ListItem className={classes.listItem}>
                Report
                <Box className={classes.actionButton}>
                  <FlagIcon />
                </Box>
              </ListItem>
            </List>
          </Popover>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  );
};

export default DisplayParticipant;
