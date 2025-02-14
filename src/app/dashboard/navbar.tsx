import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-white px-6 py-4 shadow-md">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div className="flex items-center space-x-3">
        <span className="text-gray-600">Prashant Shukla</span>
        <Image
          src="/user-profile.jpg" // Replace with actual user image
          alt="User Profile"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default Navbar;
