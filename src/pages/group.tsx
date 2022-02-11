import React from 'react';
import GroupForm from '../components/group/Form';
import GroupList from '../components/group/List';

const group: React.FC = () => {
  return (
    <div>
      <GroupList />
      <GroupForm />
    </div>
  );
};

export default group;
