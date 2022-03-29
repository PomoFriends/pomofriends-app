import React from 'react';
import { GroupAdmin } from '../../utils/types/groupTypes';
import { UserData } from '../../utils/types/userTypes';
import AdminPomodoro from './AdminPomodoro';
import GroupPomodoro from './GroupPomodoro';
import AuthPomodoro from './AuthPomodoro';
import Pomodoro from './Pomodoro';

interface ChangePomodoroProps {
  user: UserData | null;
  groupId: string | null | undefined;
  admin: GroupAdmin;
}

const ChangePomodoro: React.FC<ChangePomodoroProps> = ({
  user,
  groupId,
  admin,
}) => {
  let body = null;
  if (user && admin && groupId) {
    if (admin.userId === user.id) {
      body = <AdminPomodoro groupId={groupId} />;
    } else {
      body = <GroupPomodoro groupId={groupId} />;
    }
  } else if (user && groupId === null) {
    body = <AuthPomodoro user={user} />;
  } else {
    body = <Pomodoro />;
  }

  return <>{body}</>;
};

export default ChangePomodoro;
