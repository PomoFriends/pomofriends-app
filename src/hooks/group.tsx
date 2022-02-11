import uniqid from 'uniqid';
import { db } from '../firebase/firebase';
import { GroupData, GroupForm, useGroupType } from '../utils/types';
import { useAuth } from './useAuth';

export const useGroup = (): useGroupType => {
  const { user } = useAuth();

  const createGroup = async (group: GroupForm): Promise<GroupData | any> => {
    if (user) {
      const groupData: GroupData = {
        id: uniqid(),
        name: group.name,
        description: group.description,
      };

      try {
        await db.collection('groups').doc(groupData.id).set(groupData);
        return groupData;
      } catch (error) {
        return { error };
      }
    }
  };

  // const getGroups = async () => {
  //   const snapshot = await db.collection('groups').get();

  //   const groupList: Array<GroupData> = snapshot.docs.map((group) => {
  //     return {
  //       id: group.id,
  //       name: group.data().name,
  //       description: group.data().description,
  //     };
  //   });

  //   return groupList;
  // };

  return {
    // getGroups,
    createGroup,
  };
};
