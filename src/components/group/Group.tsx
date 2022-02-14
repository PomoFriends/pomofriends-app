import React from 'react';
import GroupForm from './Form';
// import GroupForm from './Form';
import GroupList from './List';

interface GroupProps {}

const Group: React.FC<GroupProps> = ({}) => {
  // const { user } = useAuth();

  // const [groupData, groupDataLoading, groupDataError] = useDocumentOnce(
  //   doc(getFirestore(app), 'groups', `${user?.groupId}`)
  // );

  // let body;

  // if (user?.groupId && groupDataLoading === false) {
  //   body = (
  //     <>
  //       {groupDataLoading ? (
  //         <div className="flex justify-center py-8">
  //           <Spinner width="40" className="animate-spin" />
  //         </div>
  //       ) : (
  //         <GroupRoom group={groupData?.data()} />
  //       )}
  //     </>
  //   );
  // } else {
  //   body = (
  //     <>
  //       <GroupList />
  //       <GroupForm />
  //     </>
  //   );
  // }

  return (
    <div>
      <GroupList />
      <GroupForm />
    </div>
  );
};

export default Group;
