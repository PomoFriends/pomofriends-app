import AddIcon from '@mui/icons-material/Add';
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  List,
  Typography,
  Tooltip,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { GroupData } from '../../utils/types';
import Spinner from '../images/Spinner';
import GroupPreview from './Preview';

const useStyles = makeStyles((theme: any) => ({
  timer: {
    height: 'full',
    verticalAlign: 'middle',
    color: theme.palette.background.default,
    [theme.breakpoints.up('sm')]: {
      fontSize: '6rem',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '6rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '7.2rem',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '7.2rem',
    },
  },
  pomodoro: {
    margin: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '13rem',
    height: '13rem',
    backgroundColor: theme.palette.primary.main,
  },
  shortBreak: {
    margin: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '13rem',
    height: '13rem',
    backgroundColor: theme.palette.secondary.main,
  },
  longBreak: {
    margin: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '13rem',
    height: '13rem',
    backgroundColor: theme.palette.secondary.main,
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
}));

const GroupList: React.FC = () => {
  // const [groups, groupsLoading, groupsError] = useCollectionOnce(
  //   collection(getFirestore(app), 'groups'),
  //   {}
  // );
  const classes = useStyles();

  const [groupList, setGroupList] = useState<GroupData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let cancel = false;

    setIsLoading(true);

    db.collection('groups')
      .orderBy('createdAt')
      .limit(100)
      .onSnapshot((querySnapShot) => {
        // get all documents from collection with id
        const data = querySnapShot.docs.map((doc) => ({
          ...doc.data(),
        }));

        //   update state
        if (cancel) return;

        setGroupList(data as GroupData[]);
        setIsLoading(false);
      });

    return () => {
      setIsLoading(false);
      cancel = true;
    };
  }, []);

  let body;

  if (groupList.length === 0 && isLoading) {
    body = (
      <div className="flex justify-center py-8">
        <Spinner width="40" className="animate-spin" />
      </div>
    );
  } else {
    body = (
      <Box style={{ overflow: 'auto', maxHeight: '17rem' }}>
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
              <IconButton edge="end" aria-label="add-group">
                <Avatar className={classes.addGroup}>
                  <AddIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>

      <>{body}</>
    </>
  );
};

export default GroupList;
