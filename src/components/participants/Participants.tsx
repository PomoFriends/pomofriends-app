import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { GroupParticipant } from '../../utils/types';
import DisplayParticipants from './Display';

interface ParticipantsProps {
  groupId: string;
}

const Participants: React.FC<ParticipantsProps> = ({ groupId }) => {
  const [participants, setParticipants] = useState<GroupParticipant[]>([]);
  // const [newMessage, setNewMessage] = useState('');

  // // automatically check db for new messages
  useEffect(() => {
    let cancel = false;

    db.collection('participants')
      .doc(groupId)
      .collection('participants')
      .orderBy('joinedAt')
      .limit(100)
      .onSnapshot((querySnapShot) => {
        // get all documents from collection with id
        const data = querySnapShot.docs.map((doc) => ({
          ...doc.data(),
        }));

        //   update state
        if (cancel) return;

        setParticipants(data as GroupParticipant[]);
      });

    return () => {
      cancel = true;
    };
  }, []);

  return (
    <div>
      <DisplayParticipants participants={participants} />
    </div>
  );
};

export default Participants;
