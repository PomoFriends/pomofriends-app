import AddIcon from '@mui/icons-material/Add';
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  List,
  Modal,
  Tooltip,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { useGroup } from '../../hooks/useGroup';
import { GroupData } from '../../utils/types/groupTypes';
import GroupForm from './Form';
import GroupPreview from './Preview';
import { ScrollArea } from '@mantine/core';
import Loader from '../elements/Loader';
import { UserData } from '../../utils/types/userTypes';

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

interface GroupListProps {
  user: UserData | null;
}

const GroupList: React.FC<GroupListProps> = ({ user }) => {
  const classes = useStyles();
  const { getGroupList } = useGroup();

  const [groupList, setGroupList] = useState<GroupData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [joining, setJoining] = useState<boolean>(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    if (!joining) setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    let isSubscribed = true;

    getGroupList(setGroupList, isSubscribed);
    setIsLoading(false);

    return () => {
      setIsLoading(false);
      isSubscribed = false;
    };
  }, []);

  let body;

  if (isLoading) {
    body = (
      <Box my={35}>
        <Loader />
      </Box>
    );
  } else if (groupList.length === 0 && !isLoading) {
    body = (
      <Typography variant="h6" className={classes.typography}>
        No groups at the moment, create your own!
      </Typography>
    );
  } else {
    body = (
      <Box>
        <ScrollArea style={{ height: '36rem' }}>
          <List>
            {groupList.map((group: GroupData) => (
              <div key={group.id}>
                <GroupPreview group={group} joining={joining} />
              </div>
            ))}
          </List>
        </ScrollArea>
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
                aria-label="create-group"
                onClick={handleOpen}
              >
                <Avatar className={classes.addGroup}>
                  <AddIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Modal open={open} onClose={handleClose}>
              <Box className={classes.addGroupModal}>
                <GroupForm handleClose={handleClose} setJoining={setJoining} />
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
