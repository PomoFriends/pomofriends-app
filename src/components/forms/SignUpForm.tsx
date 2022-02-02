import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useState } from 'react';
import { ErrorMessage, SignUpData } from '../../utils/types';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';
import Button from '../elements/Button';
import { getErrorMessage } from '../../utils/getErrorMessage';

/**
 *
 * @return {JSX.Element}
 *
 * SignUp Form
 */
const SignUpForm: React.FC = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>();

  const { signUp } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorMessage | null>(null);

  const onSubmit: SubmitHandler<SignUpData> = async (data: SignUpData) => {
    setIsLoading(true);
    setError(null);
    return await signUp(data).then((response) => {
      setIsLoading(false);
      setError(getErrorMessage(response.error));

      if (error === null) router.push('/dashboard');
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md shadow-sm">
        <label
          htmlFor="displayName"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Username
        </label>
        <input
          type="text"
          id="displayName"
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          {...register('displayName', {
            required: 'Please enter a username',
            maxLength: 20,
          })}
        />
        {errors.displayName && (
          <div className="mt-2 text-xs text-red-600">
            {errors.displayName.message}
          </div>
        )}
      </div>

      <div className="mt-6">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Email address
        </label>
        <div className="mt-1 rounded-md shadow-sm">
          <input
            type="email"
            id="email"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            {...register('email', {
              required: 'Please enter an email',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Not a valid email',
              },
            })}
          />
          {errors.email && (
            <div className="mt-2 text-xs text-red-600">
              {errors.email.message}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Password
        </label>
        <div className="mt-1 rounded-md shadow-sm">
          <input
            type="password"
            id="password"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            {...register('password', {
              required: 'Please enter a password',
              minLength: {
                value: 3,
                message: 'Should have at least 3 characters',
              },
            })}
          />
          {errors.password && (
            <div className="mt-2 text-xs text-red-600">
              {errors.password.message}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <span className="block w-full rounded-md shadow-sm">
          <Button title="Sign up" type="submit" isLoading={isLoading} />
        </span>
      </div>

      {error?.message && (
        <div className="mb-4 mt-6 text-red-500 text-center border-dashed border border-red-600 p-2 rounded">
          <span>{error.message}</span>
        </div>
      )}
    </form>
  );
};
export default SignUpForm;
