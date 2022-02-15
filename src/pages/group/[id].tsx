import { doc, getFirestore } from 'firebase/firestore';
import { NextPage } from 'next';
import React from 'react';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import Spinner from '../../components/images/Spinner';
import { app } from '../../firebase/firebase';
import Room from '../../components/group/Room';
import { useRequireAuth } from '../../hooks/useRequireAuth';

// eslint-disable-next-line react/prop-types
const GroupRoom: NextPage<{ id: string }> = ({ id }) => {
  const {} = useRequireAuth();

  const [groupData, groupDataLoading, groupDataError] = useDocumentOnce(
    doc(getFirestore(app), 'groups', `${id}`)
  );

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

GroupRoom.getInitialProps = ({ query }) => {
  return {
    id: query.id as string,
  };
};
export default GroupRoom;
