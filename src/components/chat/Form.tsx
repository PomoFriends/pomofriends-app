import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '../buttons/Button';
import { ChatForm as Form } from '../../utils/types';
import { useGroup } from '../../hooks/useGroup';

interface ChatFormProps {
  groupId: string;
}

const ChatForm: React.FC<ChatFormProps> = ({ groupId }) => {
  const { sendMessage } = useGroup();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Form>();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<Form> = async (data: Form) => {
    setIsLoading(true);
    return await sendMessage(data).then(() => {
      setIsLoading(false);
    });
  };

  return (
    <div>
      <div className="sm:mx-auto sm:w-full max-w-md">
        <div className="bg-white shadow sm:rounded-lg p-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-md">
              <div className="mt-1 rounded-md">
                <input
                  type="text"
                  id="message"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 shadow-sm"
                  {...register('message', {
                    required: 'Please enter a group name',
                  })}
                />
                {errors.message && (
                  <div className="mt-2 text-xs text-red-600">
                    {errors.message.message}
                  </div>
                )}
              </div>
              <span className="mt-2 block w-full rounded-md shadow-sm">
                <Button
                  onClick={() => setValue('groupId', `${groupId}`)}
                  title="send message"
                  type="submit"
                  isLoading={isLoading}
                />
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatForm;
