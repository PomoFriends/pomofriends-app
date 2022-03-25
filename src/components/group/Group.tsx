import { doc, getFirestore } from 'firebase/firestore';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import Room from '../../components/group/Room';
import Spinner from '../../components/images/Spinner';
import { app } from '../../firebase/firebase';

interface GroupProps {
  id: string;
}

const Group: React.FC<GroupProps> = ({ id }) => {
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
          <div>
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
