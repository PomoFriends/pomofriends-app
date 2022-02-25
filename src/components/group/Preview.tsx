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
  Grid,
} from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useGroup } from '../../hooks/useGroup';
import { GroupData } from '../../utils/types';
import { makeStyles } from '@mui/styles';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import moment from 'moment';

const useStyles = makeStyles((theme: any) => ({
  join: {
    color: theme.palette.primary.main,
  },
  info: {
    color: theme.palette.secondary.main,
  },
  popover: {
    '& .MuiPopover-paper': {
      border: '1px solid black',
      borderColor: theme.palette.secondary.main,
      minWidth: '20rem',
      maxWidth: '20rem',
      widht: '20rem',
      minHeight: '10rem',
      // height: '10rem',
    },
  },
  participants: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
  },
  participantsIcon: {
    marginTop: '1rem',
    color: theme.palette.primary.main,
  },
  description: {
    color: theme.palette.text.secondary,
  },
}));

interface GroupPreviewProps {
  group: GroupData;
}

const GroupPreview: React.FC<GroupPreviewProps> = ({ group }) => {
  const classes = useStyles();

  const { joinGroup } = useGroup();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const openInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeInfo = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'group-info' : undefined;

  return (
    <>
      <ListItem
        secondaryAction={
          <>
            <Tooltip title="More info">
              <IconButton
                edge="end"
                aria-label="more-info"
                onClick={openInfo}
                className={classes.info}
              >
                <MoreHorizIcon />
              </IconButton>
            </Tooltip>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={closeInfo}
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
              <Box>
                <Grid container>
                  <Grid item xs={9}>
                    <Typography sx={{ p: 2 }}>{group.name}</Typography>
                  </Grid>
                  <Grid item xs={3} className={classes.participants}>
                    <Box className={classes.participantsIcon}>
                      <PeopleAltIcon />
                    </Box>

                    <Typography sx={{ p: 2 }}>
                      {group.participantsCount}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider />
                <Typography sx={{ p: 2 }}>
                  Description:{' '}
                  <span className={classes.description}>
                    {group.description}
                  </span>
                </Typography>
                <Divider />
                <Typography sx={{ p: 2 }}>
                  Online for {moment(new Date(group.createdAt!)).fromNow(true)}
                </Typography>
              </Box>
            </Popover>
            <Tooltip title={`Join ${group.name}`}>
              <IconButton
                edge="end"
                aria-label="join-group"
                onClick={async () => {
                  await joinGroup(group.id);
                  router.push(`/group/${group.id}`);
                }}
                className={classes.join}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Tooltip>
          </>
        }
      >
        <ListItemText primary={group.name} />
      </ListItem>
      <Divider />
    </>
  );
};

export default GroupPreview;
