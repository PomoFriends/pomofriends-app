import React from 'react';
import { GroupData } from '../../utils/types';

interface GroupPreviewProps {
  group: GroupData;
}

const GroupPreview: React.FC<GroupPreviewProps> = ({ group }) => {
  return <p>{group.name}</p>;
};

export default GroupPreview;
