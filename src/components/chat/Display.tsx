import React from 'react';
// import Image from 'next/image';
import { GroupMessage } from '../../utils/types';

interface DisplayMessageProps {
  messages: any;
}

const DisplayMessages: React.FC<DisplayMessageProps> = ({ messages }) => {
  return (
    <div className="flex">
      <ul>
        {messages.map((message: GroupMessage) => (
          <li key={message.id}>
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
              {/* display message text */}
              <p>{message.message}</p>

              {/* display user name */}
              {message.username ? <span>{message.username}</span> : null}
              <br />
              {/* display message date and time */}
              {message.createdAt ? <span>{message.createdAt}</span> : null}
            </section>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayMessages;
