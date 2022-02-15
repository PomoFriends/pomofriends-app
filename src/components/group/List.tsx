import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { GroupData } from '../../utils/types';
import Spinner from '../images/Spinner';
import GroupPreview from './Preview';

const GroupList: React.FC = () => {
  // const [groups, groupsLoading, groupsError] = useCollectionOnce(
  //   collection(getFirestore(app), 'groups'),
  //   {}
  // );

  const [groupList, setGroupList] = useState<GroupData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let cancel = false;

    setIsLoading(true);

    db.collection('groups')
      .orderBy('createdAt')
      .limit(100)
      .onSnapshot((querySnapShot) => {
        // get all documents from collection with id
        const data = querySnapShot.docs.map((doc) => ({
          ...doc.data(),
        }));

        //   update state
        if (cancel) return;

        setGroupList(data as GroupData[]);
        setIsLoading(false);
      });

    return () => {
      setIsLoading(false);
      cancel = true;
    };
  }, []);

  let body;

  if (groupList.length === 0 && isLoading) {
    body = (
      <div className="flex justify-center py-8">
        <Spinner width="40" className="animate-spin" />
      </div>
    );
  } else {
    body = (
      <div className="flex w-full">
        <ul className="w-full">
          {groupList.map((group: GroupData) => (
            <li key={group.id}>
              <GroupPreview
                group={{
                  id: group.id,
                  name: group.name,
                  description: group.description,
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <div className="flex bg-gray-200">
        <div className="my-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white shadow sm:rounded-lg">
            <div>{body}</div>
            {/* <div>
              {groupsError && (
                <strong>Error: {JSON.stringify(groupsError)}</strong>
              )}

              {groupsLoading ? (
                <div className="flex justify-center py-8">
                  <Spinner width="40" className="animate-spin" />
                </div>
              ) : (
                <div className="flex w-full">
                  {groups && (
                    <ul className="w-full">
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
                </div>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupList;
