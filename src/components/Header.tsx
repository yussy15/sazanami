import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-white shadow-sm p-4 text-white flex items-center z-50">
      <Link href="/Top" className="flex items-center">
        <img src="/sazanami_dev.svg" alt="Logo" className="h-10" />
      </Link>
      <nav className="ml-auto">
        <ul className="flex space-x-4">
          <li>
            <Link href="/Top" className="text-gray-500 rounded-lg p-2 hover:bg-black hover:text-white transition duration-500 ease-in-out">
              <span className="mx-3">Top</span>
            </Link>
          </li>
          <li>
            <Link href="/Member" className="text-gray-500  rounded-lg p-2 hover:bg-black hover:text-white transition duration-300 ease-in-out">
            <span className="mx-3">Member</span>
            </Link>
          </li>
          <li>
            <Link href="/Project" className="text-gray-500  rounded-lg p-2 hover:bg-black hover:text-white transition duration-300 ease-in-out">
            <span className="mx-3">Project</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
