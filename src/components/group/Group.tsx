import React from 'react';
import GroupForm from './Form';
// import GroupForm from './Form';
import GroupList from './List';

interface GroupProps {}

const Group: React.FC<GroupProps> = ({}) => {
  return (
    <div>
      <GroupList />
      <GroupForm />
    </div>
  );
};

export default Group;
