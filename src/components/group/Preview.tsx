import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
  IconButton,
  ListItem,
  ListItemText,
  Tooltip,
  Divider,
} from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useGroup } from '../../hooks/useGroup';
import { GroupData } from '../../utils/types';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: any) => ({
  join: {
    color: theme.palette.primary.main,
  },
  info: {
    color: theme.palette.secondary.main,
  },
}));

interface GroupPreviewProps {
  group: GroupData;
}

const GroupPreview: React.FC<GroupPreviewProps> = ({ group }) => {
  const classes = useStyles();

  const { joinGroup } = useGroup();
  const router = useRouter();

  return (
    <>
      <ListItem
        secondaryAction={
          <>
            <Tooltip title="More info">
              <IconButton
                edge="end"
                aria-label="more-info"
                onClick={async () => {
                  await joinGroup(group.id);
                  router.push(`/group/${group.id}`);
                }}
                className={classes.info}
              >
                <MoreHorizIcon />
              </IconButton>
            </Tooltip>
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
