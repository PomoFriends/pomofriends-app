import React from 'react';
import { GroupParticipant } from '../../utils/types';

interface DisplayProps {
  participants: GroupParticipant[];
}

const DisplayParticipants: React.FC<DisplayProps> = ({ participants }) => {
  console.log(participants);

  return (
    <div>
      <div className="flex">
        <ul>
          {participants.map((participant: GroupParticipant) => (
            <li key={participant.id}>
              {/* <section>
              {message.profilePic ? (
                <Image
                  src={message.profilePic}
                  alt="Avatar"
                  width={45}
                  height={45}
                />
              ) : null}
            </section> */}

              <section>
                {/* display user name */}
                <span>{participant.name}</span>
                <br />
              </section>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DisplayParticipants;
