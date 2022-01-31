import { useForm, SubmitHandler } from 'react-hook-form';
import React from 'react';

interface SignUpData {
  username: string;
  email: string;
  password: string;
}

const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>();

  const onSubmit: SubmitHandler<SignUpData> = (data: SignUpData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md shadow-sm">
        <label
          htmlFor="username"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          {...register('username', {
            required: 'Please enter a username',
            maxLength: 20,
          })}
        />
        {errors.username && (
          <div className="mt-2 text-xs text-red-600">
            {errors.username.message}
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
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
          >
            Sign up
          </button>
        </span>
      </div>
    </form>
  );
};
export default SignUpForm;
