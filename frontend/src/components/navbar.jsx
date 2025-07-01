import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav>
      <div className="flex flex-row justify-evenly fixed bottom-0 left-0 bg-neutral-900 dark:bg-neutral-500 w-full h-10 text-neutral-50 text-lg font-medium">
        <Link
          to="/books"
          className={`flex justify-center items-center w-full hover:bg-purple-950 dark:hover:bg-purple-300 hover:cursor-pointer ${
            currentPath === "/books" ? "border-t-4 border-purple-600 dark:border-purple-800" : ""
          }`}
        >
          Books
        </Link>
        <Link
          to="/profile"
          className={`flex justify-center items-center w-full hover:bg-purple-950 dark:hover:bg-purple-300 hover:cursor-pointer ${
            currentPath === "/profile" ? "border-t-4 border-purple-600 dark:border-purple-800" : ""
          }`}
        >
          Profile
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;