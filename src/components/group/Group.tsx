import { doc, getFirestore } from 'firebase/firestore';
import React from 'react';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import Spinner from '../../components/images/Spinner';
import { app } from '../../firebase/firebase';
import Room from '../../components/group/Room';

interface GroupProps {
  id: string;
}

const Group: React.FC<GroupProps> = ({ id }) => {
  const [groupData, groupDataLoading, groupDataError] = useDocumentOnce(
    doc(getFirestore(app), 'groups', `${id}`)
  );

  console.log(groupData?.data());

  let body;

  if (!groupDataLoading && !groupData) {
    body = (
      <div>
        <div>You got query failed</div>
        <div>{groupDataError?.message}</div>
      </div>
    );
  } else {
    body = (
      <>
        {!groupData && groupDataLoading ? (
          <div className="flex justify-center py-8">
            <Spinner width="40" className="animate-spin" />
          </div>
        ) : (
          <>
            <Room group={groupData?.data()} />
          </>
        )}
      </>
    );
  }

  return <>{body}</>;
};

export default Group;
