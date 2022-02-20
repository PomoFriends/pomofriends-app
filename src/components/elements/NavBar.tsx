/* eslint-disable @next/next/link-passhref */
import React from 'react';
import UserDropdown from './UserDropdown';
import { useAuth } from '../../hooks/useAuth';
import Link from 'next/link';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="bg-blue-500 border-gray-200 px-2 sm:px-4 py-2.5">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <div className="flex">
          <Link href="/">
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              PomoFriends
            </span>
          </Link>
        </div>

        <div className="flex items-center sm:order-2">
          {user ? (
            <div className="justify-between items-center w-full sm:flex sm:w-auto ">
              <UserDropdown user={user} />
            </div>
          ) : (
            <div className="justify-between items-center w-full sm:flex sm:w-auto ">
              <ul className="flex flex-row space-x-2">
                <li>
                  <div className="py-2.5 px-5 text-black font-medium text-sm text-center sm:mt-5 hover:text-white">
                    <Link href="/login">Login</Link>
                  </div>
                </li>
                <li>
                  <div className="py-2.5 px-5 text-black font-medium text-sm text-center bg-violet-400 hover:bg-violet-300 focus:ring-4 focus:ring-violet-600 rounded-lg sm:mt-5">
                    <Link href="/register">Create Account</Link>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
        {/* <div className="justify-between items-center w-full sm:flex sm:w-auto sm:order-1">
          <ul className="flex flex-col mt-2 sm:flex-row sm:space-x-8 sm:mt-0 sm:text-sm sm:font-medium">
            <li>
              <Link
                to="/"
                className="block py-2 pr-4 pl-3 text-black border-b border-gray-100 hover:bg-gray-50 sm:hover:bg-transparent sm:border-0 hover:text-white sm:p-0"
              >
                Leaderboard
              </Link>
            </li>
            {user ? (
              <li>
                <Link
                  to="/dashboard"
                  className="block py-2 pr-4 pl-3 text-black border-b border-gray-100 hover:bg-gray-50 sm:hover:bg-transparent sm:border-0 hover:text-white sm:p-0 "
                >
                  My Dashboard
                </Link>
              </li>
            ) : null}
          </ul>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
