import { Box } from '@mui/material';
import { doc, getFirestore } from 'firebase/firestore';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import Room from '../../components/group/Room';
import { app } from '../../firebase/firebase';
import Loader from '../elements/Loader';

interface GroupProps {
  id: string;
}

const Group: React.FC<GroupProps> = ({ id }) => {
  const [groupData, groupDataLoading] = useDocumentOnce(
    doc(getFirestore(app), 'groups', `${id}`)
  );

  let body;

  if (!groupDataLoading && !groupData) {
    body = (
      <Box my={45}>
        <div>Something went wrong!</div>
      </Box>
    );
  } else {
    body = (
      <>
        {!groupData && groupDataLoading ? (
          <Box my={45}>
            <Loader />
          </Box>
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
