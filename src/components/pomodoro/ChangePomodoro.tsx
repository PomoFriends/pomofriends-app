import { GroupAdmin } from '../../utils/types/groupTypes';
import { UserData } from '../../utils/types/userTypes';
import Pomodoro from './Pomodoro';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import { getFirestore, doc } from 'firebase/firestore';
import { app } from '../../firebase/firebase';
import { Box } from '@mui/material';
import Loader from '../elements/Loader';
import { useState, useEffect } from 'react';
import { useParticipants } from '../../hooks/useParticipants';

interface ChangePomodoroProps {
  user: UserData | null;
  groupId: string | null;
}

const ChangePomodoro: React.FC<ChangePomodoroProps> = ({ user, groupId }) => {
  const [adminData, adminLoading] = useDocumentOnce(
    doc(getFirestore(app), 'admins', `${groupId}`)
  );
  const { getAdmin } = useParticipants();
  const [adminId, setAdminId] = useState<string>('');

  // automatically check db for new participants
  useEffect(() => {
    let isSubscribed = true;

    if (groupId) getAdmin(groupId, setAdminId, isSubscribed);
    else setAdminId('');

    return () => {
      isSubscribed = false;
    };
  }, [adminData]);

  let body = null;

  if (adminLoading) {
    body = (
      <Box my={18}>
        <Loader />
      </Box>
    );
  } else {
    if (user) {
      if (adminData !== undefined && groupId) {
        const admin: GroupAdmin = adminData.data() as GroupAdmin;

        if (admin && adminId) {
          if (adminId === user.id) {
            body = (
              <Pomodoro
                user={user}
                groupId={groupId}
                isAdmin={true}
                isGroup={true}
              />
            );
          } else {
            body = (
              <Pomodoro
                user={user}
                groupId={groupId}
                isAdmin={false}
                isGroup={true}
              />
            );
          }
        } else {
          body = (
            <Box my={18}>
              <Loader />
            </Box>
          );
        }
      } else {
        body = (
          <Pomodoro user={user} groupId={null} isAdmin={true} isGroup={false} />
        );
      }
    } else {
      body = (
        <Pomodoro user={null} groupId={null} isAdmin={true} isGroup={false} />
      );
    }
  }

  return <>{body}</>;
};

export default ChangePomodoro;
