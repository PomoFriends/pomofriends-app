import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import {
  Divider,
  IconButton,
  List,
  ListItem,
  Popover,
  Tooltip,
  Typography,
  ListItemSecondaryAction,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import { MouseEvent, useState } from 'react';
import { useGroup } from '../../hooks/useGroup';
import { GroupData } from '../../utils/types/groupTypes';

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
      minWidth: '20rem',
      maxWidth: '20rem',
      widht: '20rem',
    },
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
  joining: boolean;
}

const GroupPreview: React.FC<GroupPreviewProps> = ({ group, joining }) => {
  const classes = useStyles();

  const { joinGroup } = useGroup();

  const [clickedButton, setClicked] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openDetails = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeDetails = () => {
    setAnchorEl(null);
  };

  const handleJoin = async () => {
    if (!joining) {
      if (!clickedButton) {
        setClicked(true);
        await joinGroup(group.id);
      }
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'group-details' : undefined;

  return (
    <>
      <ListItem className={classes.listItem}>
        <Typography sx={{ wordBreak: 'break-all' }} display="block" pr={'6rem'}>
          <Typography component="span">{group.name}</Typography>
        </Typography>
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            className={classes.participantsIcon}
            disabled={true}
          >
            <PeopleAltIcon />
            <Typography
              sx={{
                color: 'white',
                marginLeft: '0.5rem',
                marginRight: '1rem',
              }}
            >
              {group.participantsCount}
            </Typography>
          </IconButton>

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
                      <Typography sx={{ color: 'white', marginLeft: '0.5rem' }}>
                        {group.participantsCount}
                      </Typography>
                    </IconButton>
                  </>
                }
              >
                <Typography
                  sx={{ wordBreak: 'break-all' }}
                  pr={'1rem'}
                  display="block"
                >
                  {group.name}
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <Typography
                  sx={{ wordBreak: 'break-all' }}
                  pr={'1rem'}
                  display="block"
                >
                  Description:{' '}
                  <span className={classes.description}>
                    {group.description}
                  </span>
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <Typography>
                  Online for {moment(new Date(group.createdAt!)).fromNow(true)}
                </Typography>
              </ListItem>
            </List>
          </Popover>
          <Tooltip title={`Join ${group.name}`}>
            <IconButton
              edge="end"
              aria-label="join-group"
              onClick={handleJoin}
              className={classes.join}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Tooltip>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  );
};

export default GroupPreview;
