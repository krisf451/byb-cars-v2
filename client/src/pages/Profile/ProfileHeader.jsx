import { useSelector } from 'react-redux';

const ProfileHeader = () => {
  const { currentUser } = useSelector((state) => state.auth);
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start w-full relative px-4 sm:px-14 py-6 gap-2">
      <img
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
        alt="profile"
        className="shadow-xl animate-slowfade h-64 w-64 rounded-full border-4 border-white z-10 mt-6"
      />
      <div className="flex flex-col gap-2 z-10 mt-2 sm:mt-[150px] items-center">
        <p className="text-4xl font-bold dark:text-white whitespace-nowrap text-gray-800">Welcome Back,</p>
        <p className="text-2xl font-semibold animate-slideleft text-gray-600 dark:text-gray-300">
          {currentUser?.fullName}
        </p>
        <p className="text-lg text-gray-400">{currentUser?.email}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
