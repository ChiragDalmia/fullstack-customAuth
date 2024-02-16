import { signOut } from 'next-auth/react';
import React from 'react';
import useCurrentUser from '@/hook/useCurrentUser';

interface User {
  name: string;
}

interface UserDisplayProps {
  user: User | null;
}

const UserDisplay: React.FC<UserDisplayProps> = ({ user }) => {
  if (!user) return null;

  return (
    <div className="flex flex-row gap-3 items-center w-full px-3">
      <img className="w-8 rounded-md" src="/images/default-blue.png" alt="User Profile" />
      <p className="text-white text-sm hover:underline">{user.name}</p>
    </div>
  );
};

const SignOutButton: React.FC = () => (
  <div onClick={() => signOut()} className="px-3 text-center text-white text-sm hover:underline cursor-pointer">
    Sign out of Netflix
  </div>
);

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data: currentUser, error } = useCurrentUser();

  if (!visible) return null;
  if (error) return <p>Error loading user data.</p>;

  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex flex-col border-2 border-gray-800">
      <UserDisplay user={currentUser} />
      <hr className="bg-gray-600 border-0 h-px my-4" />
      <SignOutButton />
    </div>
  );
};

export default AccountMenu;
