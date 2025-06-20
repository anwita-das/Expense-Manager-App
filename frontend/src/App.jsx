import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Books from "@/pages/books";
import Profile from "@/pages/profile";
import BookDetails from "./pages/bookDetails";
import BookDetails2 from "./pages/bookDetails2";
import BookDetails3 from "./pages/bookDetails3";
import AddEntryLS from "./pages/addentryLS";
import AddEntryS from "./pages/addentryS";
import EntryDetailsDE from "./pages/entryDetailsDE";

function Navbar() {
  const location = useLocation();
  const hideNavbarRoutes = ["/detailsde","/detailsls","/detailss","/", "/signup","/entryde", "/entryls", "/entrys", "/edetailsde"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  if (!shouldShowNavbar) return null;

  return (
    <nav>
      <div className="flex flex-row justify-evenly fixed bottom-0 left-0 bg-neutral-900 dark:bg-neutral-500 dark:text-neutral-900 w-full h-10 text-neutral-50 text-lg font-medium">
        <Link
          to="/books"
          className={`flex justify-center items-center w-full hover:bg-purple-950 dark:hover:bg-purple-300 hover:cursor-pointer ${
            location.pathname === "/books" ? "border-t-4 border-purple-600 dark:border-purple-800" : ""
          }`}
        >
          Books
        </Link>
        <Link
          to="/profile"
          className={`flex justify-center items-center w-full hover:bg-purple-950 dark:hover:bg-purple-300 hover:cursor-pointer ${
            location.pathname === "/profile" ? "border-t-4 border-purple-600 dark:border-purple-800" : ""
          }`}
        >
          Profile
        </Link>
      </div>
    </nav>
  );
}

function AppContent() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/books" element={<Books />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/detailsde" element={<BookDetails />} />
        <Route path="/detailsls" element={<BookDetails2 />} />
        <Route path="/detailss" element={<BookDetails3 />} />
        <Route path="/entryls" element={<AddEntryLS />} />
        <Route path="/entrys" element={<AddEntryS />} />
        <Route path="/edetailsde" element={<EntryDetailsDE />} />
      </Routes>
      <Navbar />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
