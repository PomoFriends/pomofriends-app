import FlagIcon from '@mui/icons-material/Flag';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TimerIcon from '@mui/icons-material/Timer';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  Modal,
  Popover,
  Tooltip,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { MouseEvent, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useParticipants } from '../../hooks/useParticipants';
import { GroupParticipant } from '../../utils/types/groupTypes';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { UnstyledButton } from '@mantine/core';
import ReportForm from './ReportForm';
import AssignmentIcon from '@mui/icons-material/Assignment';
import moment from 'moment';
import TaskCard from './TaskCard';
import { TaskData } from '../../utils/types/userTypes';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import { ScrollArea } from '@mantine/core';

const useStyles = makeStyles((theme: any) => ({
  actionButton: {
    color: theme.palette.primary.main,
  },
  report: {
    color: theme.palette.error.main,
  },
  popover: {
    // maxHeight: '20rem',
    '&: .MuiPopover-root': {
      overflow: 'hidden',
    },
  },
  listItem: {
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: 'rgba(187, 134, 252, 0.08)',
    },
  },
  listDetails: {
    fontSize: '1rem',
  },
  spanColor: {
    color: theme.palette.primary.main,
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
  reportModal: {
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

interface DisplayProps {
  participant: GroupParticipant;
  admin?: boolean;
  muted?: boolean;
  adminId: string;
  groupId: string;
}

const DisplayParticipant: React.FC<DisplayProps> = ({
  participant,
  admin,
  muted,
  adminId,
  groupId,
}) => {
  const classes = useStyles();
  const { changeAdmin, kickUser, muteUser, unmuteUser } = useParticipants();
  const { user } = useAuth();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openActions = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeActions = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'group-actions' : undefined;

  const [detailsAnchorEl, setDetailsAnchorEl] =
    useState<HTMLButtonElement | null>(null);
  const openDetails = (event: MouseEvent<HTMLButtonElement>) => {
    setDetailsAnchorEl(event.currentTarget);
  };
  const closeDetails = () => {
    setDetailsAnchorEl(null);
  };
  const detailsOpen = Boolean(detailsAnchorEl);
  const detailsId = detailsOpen ? 'group-actions' : undefined;

  const [openReport, setOpenReport] = useState(false);
  const handleOpen = () => setOpenReport(true);
  const handleClose = () => {
    setOpenReport(false);
    closeActions();
  };

  const handleChangeAdmin = () => {
    changeAdmin(groupId, participant.id);
    closeActions();
  };

  const handleKickUser = () => {
    kickUser(groupId, participant.id);
    closeActions();
  };

  const handleMute = () => {
    if (muted) {
      unmuteUser(participant.id);
    } else {
      muteUser(participant.id);
    }
    closeActions();
  };

  let popover = null;

  if (user!.id === adminId) {
    popover = (
      <>
        <UnstyledButton style={{ width: '100%' }}>
          <ListItem
            className={classes.listItem}
            onClick={handleKickUser}
            sx={{ mb: '0.45rem' }}
          >
            <Box className={classes.actionButton}>
              <PersonRemoveIcon color={'error'} />
            </Box>
            <Typography position={'inherit'} ml={'0.5rem'} color={'error'}>
              Kick
            </Typography>
          </ListItem>
        </UnstyledButton>
        <Divider />
        <UnstyledButton style={{ width: '100%' }}>
          <ListItem
            className={classes.listItem}
            onClick={handleChangeAdmin}
            sx={{ mt: '0.45rem' }}
          >
            <Box className={classes.actionButton}>
              <TimerIcon color={'primary'} />
            </Box>
            <Typography position={'inherit'} ml={'0.5rem'} color={'primary'}>
              Make Admin
            </Typography>
          </ListItem>
        </UnstyledButton>
      </>
    );
  }

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
              marginLeft: '0.5rem',
              marginTop: '0.2rem',
              color: participant.color,
              wordBreak: 'break-all',
            }}
            display="block"
            variant="h6"
          >
            {participant.username}
          </Typography>
          {admin ? (
            <Box sx={{ marginTop: '0.3rem' }} className={classes.actionButton}>
              <Tooltip title="admin">
                <TimerIcon />
              </Tooltip>
            </Box>
          ) : null}
        </Box>

        <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
          <Tooltip title="View Details">
            <IconButton
              edge="end"
              onClick={openDetails}
              aria-label="details-button"
              className={classes.actionButton}
            >
              <AssignmentIcon />
            </IconButton>
          </Tooltip>
          <Popover
            id={detailsId}
            open={detailsOpen}
            anchorEl={detailsAnchorEl}
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
            <Box>
              {participant.activityVisible || participant.id === user!.id ? (
                <ScrollArea style={{ maxHeight: '20rem' }}>
                  <List sx={{ width: '20rem' }}>
                    <ListItem className={classes.listDetails}>
                      <CalendarTodayIcon color="primary" />
                      <Typography position={'inherit'} ml={'0.5rem'}>
                        Joined{' '}
                        <span className={classes.spanColor}>
                          {moment(new Date(participant.joinedAt)).fromNow(true)}{' '}
                        </span>
                        ago
                      </Typography>
                    </ListItem>
                    <ListItem className={classes.listDetails}>
                      <TimerIcon color="primary" />
                      <Typography position={'inherit'} ml={'0.5rem'}>
                        Pomodoro Done:{' '}
                        <span className={classes.spanColor}>
                          {participant.pomodoros}
                        </span>
                      </Typography>
                    </ListItem>
                    {participant.tasksVisible || participant.id === user!.id ? (
                      <>
                        <ListItem className={classes.listDetails}>
                          <AssignmentReturnedIcon color="primary" />
                          <Typography position={'inherit'} ml={'0.5rem'}>
                            Current task:{' '}
                            {participant.currentTask ? null : (
                              <span className={classes.spanColor}>N/A</span>
                            )}
                          </Typography>
                        </ListItem>
                        {participant.currentTask ? (
                          <Box sx={{ width: '18rem', marginLeft: '1rem' }}>
                            <TaskCard task={participant.currentTask} />
                          </Box>
                        ) : null}
                        <ListItem className={classes.listDetails}>
                          <CheckCircleIcon color="primary" />
                          <Typography position={'inherit'} ml={'0.5rem'}>
                            Completed Tasks:{' '}
                            {participant.tasksComplited &&
                            participant.tasksComplited.length > 0 ? null : (
                              <span className={classes.spanColor}>N/A</span>
                            )}
                          </Typography>
                        </ListItem>
                        {participant.tasksComplited &&
                        participant.tasksComplited.length > 0 ? (
                          <Box sx={{ width: '18rem', marginLeft: '1rem' }}>
                            <List>
                              {participant.tasksComplited.map(
                                (task: TaskData) => (
                                  <div key={task.id}>
                                    <TaskCard task={task} />
                                  </div>
                                )
                              )}
                            </List>
                          </Box>
                        ) : null}
                      </>
                    ) : null}
                  </List>
                </ScrollArea>
              ) : (
                <ScrollArea style={{ maxHeight: '20rem' }}>
                  <List sx={{ width: '20rem' }}>
                    <ListItem className={classes.listDetails}>
                      <CalendarTodayIcon color="primary" />
                      <Typography position={'inherit'} ml={'0.5rem'}>
                        Joined{' '}
                        <span className={classes.spanColor}>
                          {moment(new Date(participant.joinedAt)).fromNow(true)}{' '}
                        </span>
                        ago
                      </Typography>
                    </ListItem>
                    <ListItem className={classes.listDetails}>
                      <Typography
                        position={'inherit'}
                        ml={'0.5rem'}
                        color={'error'}
                      >
                        This user disabled visibility of their activity
                      </Typography>
                    </ListItem>
                  </List>
                </ScrollArea>
              )}
            </Box>
          </Popover>
          {participant.id === user!.id ? null : (
            <>
              <Tooltip title="Action">
                <IconButton
                  edge="end"
                  onClick={openActions}
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
                onClose={closeActions}
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
                <List sx={{ width: '10rem' }}>
                  <UnstyledButton style={{ width: '100%' }}>
                    <ListItem className={classes.listItem} onClick={handleOpen}>
                      <Box className={classes.report}>
                        <FlagIcon />
                      </Box>
                      <Typography
                        position={'inherit'}
                        ml={'0.5rem'}
                        color={'error'}
                      >
                        Report
                      </Typography>
                    </ListItem>
                  </UnstyledButton>
                  <UnstyledButton style={{ width: '100%' }}>
                    <ListItem className={classes.listItem} onClick={handleMute}>
                      <Box className={classes.actionButton}>
                        <VisibilityOffIcon sx={{ color: 'yellow' }} />
                      </Box>
                      <Typography
                        position={'inherit'}
                        ml={'0.5rem'}
                        color={'yellow'}
                      >
                        {muted ? 'Unmute' : 'Mute'}
                      </Typography>
                    </ListItem>
                  </UnstyledButton>
                  {popover}
                </List>
              </Popover>
            </>
          )}
        </ListItemSecondaryAction>
      </ListItem>
      <Modal open={openReport} onClose={handleClose}>
        <Box className={classes.reportModal}>
          <ReportForm handleClose={handleClose} userId={participant.id} />
        </Box>
      </Modal>
    </>
  );
};

export default DisplayParticipant;
