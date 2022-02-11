import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { app } from '../../firebase/firebase';
import { getFirestore, collection } from 'firebase/firestore';
import GroupPreview from './Preview';

const GroupList: React.FC = ({}) => {
  // const { getGroups } = useGroup();

  // const [groups, setGroups] = useState([] as GroupData[]);

  // useEffect(() => {
  //   // Create an scoped async function in the hook
  //   async () => {
  //     const groupList = await getGroups();

  //     console.log(groupList);

  //     setGroups(groupList);
  //   };
  // }, []);

  const [groups, groupsLoading, groupsError] = useCollection(
    collection(getFirestore(app), 'groups'),
    {}
  );

  // if (groups) {
  //   groups.docs.map((doc) => console.log(JSON.stringify(doc.data())));
  // }

  return (
    <div>
      <p>
        {groupsError && <strong>Error: {JSON.stringify(groupsError)}</strong>}
        {groupsLoading && <span>Collection: Loading...</span>}
        {groups && (
          <ul>
            {groups.docs.map((doc) => (
              <li key={doc.id}>
                <GroupPreview
                  group={{
                    id: doc.data().id,
                    name: doc.data().name,
                    description: doc.data().description,
                  }}
                />
              </li>
            ))}
          </ul>
        )}
      </p>
    </div>
  );
};

export default GroupList;
