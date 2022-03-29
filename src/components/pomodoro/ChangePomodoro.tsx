import React from 'react';
import { GroupAdmin } from '../../utils/types/groupTypes';
import { UserData } from '../../utils/types/userTypes';
import AdminPomodoro from './AdminPomodoro';
// import Pomodoro from './Pomodoro';

interface ChangePomodoroProps {
  user: UserData | null;
  groupId: string | null;
  admin: GroupAdmin | null;
}

const ChangePomodoro: React.FC<ChangePomodoroProps> = ({
  user,
  groupId,
  admin,
}) => {
  let body = null;
  if (user && admin && groupId) {
    if (admin.userId === user.id) {
      console.log('admin');
      body = (
        <AdminPomodoro
          user={user}
          groupId={groupId}
          isAdmin={true}
          isGroup={true}
        />
      );
    } else {
      console.log('participant');
      body = (
        <AdminPomodoro
          user={user}
          groupId={groupId}
          isAdmin={false}
          isGroup={true}
        />
      );
    }
  } else if (user && groupId === null) {
    console.log('loner');
    body = (
      <AdminPomodoro
        user={user}
        groupId={null}
        isAdmin={true}
        isGroup={false}
      />
    );
  } else {
    console.log('nobody');
    body = (
      <AdminPomodoro
        user={null}
        groupId={null}
        isAdmin={true}
        isGroup={false}
      />
    );
  }

  return <>{body}</>;
};

export default ChangePomodoro;
