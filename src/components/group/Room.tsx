import React from 'react';
import { useGroup } from '../../hooks/useGroup';
import Chat from '../chat/Chat';
import Participants from '../participants/Participants';

interface GroupProps {
  group: any;
}

const GroupRoom: React.FC<GroupProps> = ({ group }) => {
  const { leaveGroup } = useGroup();

  const handleLeaveGroup = async () => {
    await leaveGroup(group.id);
  };

  console.log(group.id);

  let body;

  if (group) {
    body = (
      <div>
        <p>{group.id}</p>
        <p>{group.name}</p>
        <p>{group.description}</p>
        <button type="button" onClick={handleLeaveGroup} className="w-full">
          <div className="bg-gray-200 border-2 border-sky-500 m-2 rounded-md hover:bg-sky-400 hover:text-white">
            <div className="p-2">Leave Group</div>
          </div>
        </button>
      </div>
    );
  } else {
    body = null;
  }

  return (
    <div className="flex bg-gray-200">
      <div className="my-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white shadow sm:rounded-lg">{body}</div>
        <Chat groupId={group.id} />
        <Participants groupId={group.id} />
      </div>
    </div>
  );
};

export default GroupRoom;
