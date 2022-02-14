import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useGroup } from '../../hooks/useGroup';
import Button from '../elements/Button';
import { GroupForm as Form } from '../../utils/types';

const GroupForm: React.FC = () => {
  const { createGroup } = useGroup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<Form> = async (data: Form) => {
    setIsLoading(true);
    return await createGroup(data).then(() => {
      setIsLoading(false);
      //   console.log(response);
    });
  };

  return (
    <div>
      <div className="min-h-screen flex bg-gray-200">
        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="rounded-md">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Group name
                </label>
                <div className="mt-1 rounded-md">
                  <input
                    type="text"
                    id="name"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 shadow-sm"
                    {...register('name', {
                      required: 'Please enter a group name',
                    })}
                  />
                  {errors.name && (
                    <div className="mt-2 text-xs text-red-600">
                      {errors.name.message}
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-md">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Group description
                </label>
                <div className="mt-1 rounded-md">
                  <input
                    type="text"
                    id="description"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 shadow-sm"
                    {...register('description', {
                      required: 'Please enter a description of the group',
                    })}
                  />
                  {errors.description && (
                    <div className="mt-2 text-xs text-red-600">
                      {errors.description.message}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <span className="block w-full rounded-md shadow-sm">
                  <Button
                    title="Create Group"
                    type="submit"
                    isLoading={isLoading}
                  />
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupForm;
