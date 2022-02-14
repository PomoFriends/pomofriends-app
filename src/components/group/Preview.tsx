import Link from 'next/link';
import React from 'react';
import { useGroup } from '../../hooks/useGroup';
import { GroupData } from '../../utils/types';

interface GroupPreviewProps {
  group: GroupData;
}

const GroupPreview: React.FC<GroupPreviewProps> = ({ group }) => {
  const { joinGroup } = useGroup();

  return (
    <div>
      <button
        type="button"
        onClick={async () => {
          await joinGroup(group.id);
        }}
        className="w-full"
      >
        <div className="bg-gray-200 border-2 border-sky-500 m-2 rounded-md hover:bg-sky-400 hover:text-white">
          <Link href={`/group/${group.id}`} passHref>
            <div className="p-2">{group.name}</div>
          </Link>
        </div>
      </button>
    </div>
  );
};

export default GroupPreview;
