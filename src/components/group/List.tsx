import React from 'react';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import { app } from '../../firebase/firebase';
import { getFirestore, collection } from 'firebase/firestore';
import GroupPreview from './Preview';
import Spinner from '../images/Spinner';

const GroupList: React.FC = () => {
  const [groups, groupsLoading, groupsError] = useCollectionOnce(
    collection(getFirestore(app), 'groups'),
    {}
  );

  return (
    <div>
      <div className="flex bg-gray-200">
        <div className="my-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white shadow sm:rounded-lg">
            <div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupList;
