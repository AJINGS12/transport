import { Link } from "react-router-dom";

const ProfileDropdown = ({ isProfileOpen }) => {
  if (!isProfileOpen) return null;

  return (
    <div className="absolute mt-4 right-0 z-10 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition">
      <Link
        to="/"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        My Profile
      </Link>
      <Link
        to="/"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Settings
      </Link>
      <Link
        to="/regis/login"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Log out
      </Link>
    </div>
  );
};

export default ProfileDropdown;
