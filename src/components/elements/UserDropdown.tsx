/* eslint-disable @next/next/link-passhref */
import { Menu, Transition } from '@headlessui/react';
import {
  UserIcon,
  CalendarIcon,
  CogIcon,
  LogoutIcon,
} from '@heroicons/react/solid';
import { Fragment } from 'react';
import { UserData } from '../../utils/types';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';

interface UserDropdownProps {
  user: UserData;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ user }) => {
  const { signOut } = useAuth();

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex text-sm rounded-full focus:ring-4 focus:ring-blue-300 border-blue-400 border-2">
            <div className="w-8 h-8 rounded-full relative">
              <Image
                src={user?.profilePic!}
                alt="user photo"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 border-b-2">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? ' text-white' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <LogoutIcon
                        className="w-5 h-5 mr-2 text-white"
                        aria-hidden="true"
                      />
                    ) : (
                      <LogoutIcon
                        className="w-5 h-5 mr-2 text-white"
                        aria-hidden="true"
                      />
                    )}
                    <div className="flex">
                      <Link href="/profile">
                        <span className="block text-black text-md font-bold">
                          {`${user?.username}`}
                        </span>
                      </Link>
                    </div>
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1 border-b-2">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <UserIcon
                        className="w-5 h-5 mr-2 text-white"
                        aria-hidden="true"
                      />
                    ) : (
                      <UserIcon
                        className="w-5 h-5 mr-2 text-blue-500"
                        aria-hidden="true"
                      />
                    )}
                    Profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <CalendarIcon
                        className="w-5 h-5 mr-2 text-white"
                        aria-hidden="true"
                      />
                    ) : (
                      <CalendarIcon
                        className="w-5 h-5 mr-2 text-blue-500"
                        aria-hidden="true"
                      />
                    )}
                    My Dashboard
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <CogIcon
                        className="w-5 h-5 mr-2 text-white"
                        aria-hidden="true"
                      />
                    ) : (
                      <CogIcon
                        className="w-5 h-5 mr-2 text-blue-500"
                        aria-hidden="true"
                      />
                    )}
                    Settings
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => signOut()}
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <LogoutIcon
                        className="w-5 h-5 mr-2 text-white"
                        aria-hidden="true"
                      />
                    ) : (
                      <LogoutIcon
                        className="w-5 h-5 mr-2 text-blue-500"
                        aria-hidden="true"
                      />
                    )}
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default UserDropdown;
