import AddIcon from '@mui/icons-material/Add';
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  List,
  Typography,
  Tooltip,
  Modal,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { GroupData } from '../../utils/types';
// import Spinner from '../images/Spinner';
import GroupPreview from './Preview';
import GroupForm from './Form';
import { useGroup } from '../../hooks/useGroup';

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

const GroupList: React.FC = () => {
  const classes = useStyles();
  const { getGroupList } = useGroup();

  const [groupList, setGroupList] = useState<GroupData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    let isSubscribed = true;

    setIsLoading(true);

    getGroupList(setGroupList, isSubscribed);
    // setIsLoading(false);

    return () => {
      setIsLoading(false);
      isSubscribed = false;
    };
  }, []);

  let body;

  if (groupList.length === 0 && isLoading) {
    // body = (
    //   <div className="flex justify-center py-8">
    //     <Spinner width="40" className="animate-spin" />
    //   </div>
    // );

    body = (
      <Typography variant="h6" className={classes.typography}>
        No groups at the moment, create your own!
      </Typography>
    );
  } else {
    body = (
      <Box className={classes.groupList}>
        <List>
          {groupList.map((group: GroupData) => (
            <div key={group.id}>
              <GroupPreview group={group} />
            </div>
          ))}
        </List>
      </Box>
    );
  }

  return (
    <>
      <Box>
        <Grid container direction="row">
          <Grid item xs={9}>
            <Typography variant="h5" className={classes.typography}>
              Groups
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            container
            justifyContent={'right'}
            className={classes.addBox}
          >
            <Tooltip title="Create Group">
              <IconButton
                edge="end"
                aria-label="add-group"
                onClick={handleOpen}
              >
                <Avatar className={classes.addGroup}>
                  <AddIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className={classes.addGroupModal}>
                <GroupForm handleClose={handleClose} />
              </Box>
            </Modal>
          </Grid>
        </Grid>
      </Box>

      <>{body}</>
    </>
  );
};

export default GroupList;
