import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
  IconButton,
  ListItem,
  ListItemText,
  Tooltip,
  Divider,
  Popover,
  Typography,
  Box,
  List,
} from '@mui/material';
import React from 'react';
import { useGroup } from '../../hooks/useGroup';
import { GroupData } from '../../utils/types';
import { makeStyles } from '@mui/styles';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import moment from 'moment';

const useStyles = makeStyles((theme: any) => ({
  join: {
    color: theme.palette.primary.main,
    marginLeft: '1rem',
  },
  details: {
    color: theme.palette.secondary.main,
  },
  popover: {
    '& .MuiPopover-paper': {
      border: '1px solid black',
      borderColor: theme.palette.secondary.main,
      minWidth: '20rem',
      maxWidth: '20rem',
      widht: '20rem',
    },
  },
  participants: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
  },
  participantsIcon: {
    color: theme.palette.primary.main,
    '&.Mui-disabled': {
      color: theme.palette.primary.main,
    },
  },
  description: {
    color: theme.palette.text.secondary,
  },
  listItem: {
    '&:hover': {
      backgroundColor: 'rgba(187, 134, 252, 0.08)',
    },
  },
}));

interface GroupPreviewProps {
  group: GroupData;
}

const GroupPreview: React.FC<GroupPreviewProps> = ({ group }) => {
  const classes = useStyles();

  const { joinGroup } = useGroup();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openDetails = (event: React.MouseEvent<HTMLButtonElement>) => {
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
        className={classes.listItem}
        secondaryAction={
          <>
            <Tooltip title="Open details">
              <IconButton
                edge="end"
                aria-label="open-details"
                onClick={openDetails}
                className={classes.details}
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
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              className={classes.popover}
            >
              <List>
                <ListItem
                  secondaryAction={
                    <>
                      <IconButton
                        edge="end"
                        className={classes.participantsIcon}
                        disabled={true}
                      >
                        <PeopleAltIcon />
                        <Typography
                          sx={{ color: 'white', marginLeft: '0.5rem' }}
                        >
                          {group.participantsCount}
                        </Typography>
                      </IconButton>
                    </>
                  }
                >
                  <Typography>{group.name}</Typography>
                </ListItem>
                <Divider />
                <ListItem>
                  <Typography>
                    Description:{' '}
                    <span className={classes.description}>
                      {group.description}
                    </span>
                  </Typography>
                </ListItem>
                <Divider />
                <ListItem>
                  <Typography>
                    Online for{' '}
                    {moment(new Date(group.createdAt!)).fromNow(true)}
                  </Typography>
                </ListItem>
              </List>
            </Popover>
            <Tooltip title={`Join ${group.name}`}>
              <IconButton
                edge="end"
                aria-label="join-group"
                onClick={async () => {
                  await joinGroup(group.id);
                }}
                className={classes.join}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Tooltip>
          </>
        }
      >
        <ListItemText
          primary={group.name}
          secondary={
            <Box className={classes.participants}>
              <Box className={classes.participantsIcon}>
                <PeopleAltIcon />
              </Box>

              <Typography sx={{ marginLeft: '0.5rem' }}>
                {group.participantsCount}
              </Typography>
            </Box>
          }
        />
      </ListItem>
      <Divider />
    </>
  );
};

export default GroupPreview;
