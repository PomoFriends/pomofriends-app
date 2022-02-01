import Link from 'next/link';
import React from 'react';
import SignUpForm from '../components/forms/SignUpForm';

const SignUpPage: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-gray-200">
      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mt-4">
          <h2 className="text-center text-3xl leading-9 font-extrabold text-gray-900">
            Sign up
          </h2>
          <p className="mt-2 text-center text-md text-gray-600">
            {'Already have an account? '}
            <Link href="/login">
              <a href="#" className="text-blue-500">
                Log in
              </a>
            </Link>
          </p>
        </div>
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
