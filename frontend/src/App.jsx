import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Books from "@/pages/books";
import Profile from "@/pages/profile";
import BookDetails from "./pages/bookDetails";
import BookDetails2 from "./pages/bookDetails2";
import BookDetails3 from "./pages/bookDetails3";
import AddEntryDE from "./pages/addentryDE";
import AddEntryLS from "./pages/addentryLS";
import AddEntryS from "./pages/addentryS";
import EntryDetailsDE from "./pages/entryDetailsDE";
import EntryDetailsLS from "./pages/entryDetailsLS";
import EntryDetailsS from "./pages/entryDetailsS";
import SummaryDE from "./pages/summaryDE";
import SummaryLS from "./pages/summaryLS";
import SummaryS from "./pages/summaryS";
import EditProfile from "./pages/editProfile";
import Settings from "./pages/settings";


function AppContent() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/books" element={<Books />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/detailsde/:id" element={<BookDetails />} />
        <Route path="/detailsls/:id" element={<BookDetails2 />} />
        <Route path="/detailss/:id" element={<BookDetails3 />} />
        <Route path="/entryde/:bookId" element={<AddEntryDE />} />
        <Route path="/entryls/:bookId" element={<AddEntryLS />} />
        <Route path="/entrys/:bookId" element={<AddEntryS />} />
        <Route path="/edetailsde/:id" element={<EntryDetailsDE />} />
        <Route path="/edetailsls/:id" element={<EntryDetailsLS />} />
        <Route path="/edetailss/:id" element={<EntryDetailsS />} />
        <Route path="/summaryde" element={<SummaryDE />} />
        <Route path="/summaryls" element={<SummaryLS />} />
        <Route path="/summarys" element={<SummaryS />} />
        <Route path="/editprof" element={<EditProfile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
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
