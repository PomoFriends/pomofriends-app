import { serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { GroupData, GroupForm, useGroupType } from '../utils/types';
import { useAuth } from './useAuth';

export const useGroup = (): useGroupType => {
  const { user } = useAuth();

  /**
   *
   * @param {GroupForm} group
   * @return {Promise<GroupData | any>}
   *
   * Creates group
   * Creates new 'admins' doc with the same is as the group
   * Creates new 'participants' doc with the same is as the group
   * Creates new 'messages' doc with the same is as the group
   *
   */
  const createGroup = async (group: GroupForm): Promise<GroupData | any> => {
    if (user) {
      try {
        // Create a group doc with randomly generated id
        const newGroup = db.collection('groups').doc();

        // Set values to the group
        const res = await newGroup.set({
          id: newGroup.id,
          name: group.name,
          description: group.description,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        // Create admins doc with the same id as the group
        db.collection('admins').doc(newGroup.id).set({ userId: user.id });

        // Create participants doc with the same id as the group
        db.collection('participants').doc(newGroup.id).set({});

        // Create messages doc with the same id as the group
        db.collection('messages').doc(newGroup.id).set({});

        return res;
      } catch (error) {
        return { error };
      }
    }
  };

  return {
    // getGroups,
    createGroup,
  };
};
