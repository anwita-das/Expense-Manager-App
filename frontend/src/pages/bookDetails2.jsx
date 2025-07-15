import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faArrowRight, faBuildingColumns } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteLoanStatus } from "@/api/loanStatus";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import EntryCardLS from "@/components/entryCardLS";
import { getLoanStatusByBookId } from "@/api/loanStatus";
import { getBookById } from "@/api/books";
import { fetchCategories } from '@/api/categories';
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

function BookDetails2() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allEntries, setAllEntries] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [visibleCount, setVisibleCount] = useState(10);
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");


  const handleNewLoanClick = () => {
    navigate(`/entryls/${id}`, { state: { type: "newloan", bookId: id } });
  };

  const handleEMIPaymentClick = () => {
    navigate(`/entryls/${id}`, { state: { type: "emipayment", bookId: id } });
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookData = await getBookById(id);
        setBook(bookData);
      } catch (err) {
        console.error("Failed to fetch book details", err);
      }
    };
    fetchBook();
  }, [id]);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCats();
  }, []);


  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await getLoanStatusByBookId(id);
        setAllEntries(res.data);
        setEntries(res.data);
      } catch (err) {
        console.error("Error fetching loan entries:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const bottomReached = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (bottomReached) {
        setVisibleCount((prev) => prev + 10);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setVisibleCount(10);
  }, [searchTerm, filterType]);

  const filteredEntries = [...entries]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .filter((entry) => {
      if (filterType !== "All" && entry.entry_type !== filterType) return false;
      if (categoryFilter && entry.category !== categoryFilter) return false;

      const search = searchTerm.toLowerCase();
      return (
        entry.description.toLowerCase().includes(search)
      );
    });

  const totalLoan = filteredEntries
    .filter((e) => e.entry_type === "newloan")
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const totalEMIPaid = filteredEntries
    .filter((e) => e.entry_type === "emipayment")
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const remainingLoan = totalLoan - totalEMIPaid;

  return (
    <div className="bg-neutral-800 min-h-screen dark:bg-neutral-200 pb-20 dark:text-neutral-900">
      <div className='sticky top-0 z-40 flex flex-row items-center p-2 bg-orange-300 space-x-2'>
        <Link to="/books">
          <FontAwesomeIcon icon={faChevronLeft} className="text-2xl cursor-pointer" />
        </Link>
        <div className='flex flex-row justify-between items-center w-full'>
          <h1 className='text-3xl font-medium'>{book?.title || "Loading..."}</h1>
          <div className='text-xl'>Loan Status</div>
        </div>
        <FontAwesomeIcon icon={faBuildingColumns} className="text-2xl mr-3"/>
      </div>

      <div className="sticky top-0 z-40 bg-transparent flex flex-col justify-between items-center w-full">
        <div className="w-full px-4 py-2">
          <Input
            type="text"
            placeholder="Search entries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-neutral-300 text-neutral-800 dark:bg-neutral-300 dark:border-2 dark:border-neutral-400 dark:text-neutral-900"
          />
        </div>
        <div className='flex flex-row justify-between'>
            <div className="mr-3 mt-1">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button className="bg-neutral-700 dark:bg-neutral-300 rounded-full shadow-lg">
                    <Filter className="w-6 h-6 text-white dark:text-black" />
                    <span className="text-white dark:text-black text-sm">
                        {filterType === "newloan"
                        ? "New Loan"
                        : filterType === "emipayment"
                        ? "EMI Payment"
                        : "Type"}
                    </span>
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40 mr-5 bg-neutral-300 dark:bg-neutral-100 text-black">
                <DropdownMenuItem onClick={() => setFilterType("All")}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("emipayment")}>EMI Payment</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("newloan")}>New Loan</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </div>
            <div className="mr-3 mt-1">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>   
                <Button className="bg-neutral-700 dark:bg-neutral-300 rounded-full shadow-lg">
                    <Filter className="w-6 h-6 text-white dark:text-black" />
                    <span className="text-white dark:text-black text-sm">
                        {categoryFilter || "Category"}
                    </span>
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-neutral-300 dark:bg-neutral-100 text-black max-h-60 overflow-y-auto">
                <DropdownMenuItem onClick={() => setCategoryFilter("")}>All</DropdownMenuItem>
                {categories.map((cat) => (
                    <DropdownMenuItem key={cat.id} onClick={() => setCategoryFilter(cat.name)}>
                    {cat.name}
                    </DropdownMenuItem>
                ))}
                </DropdownMenuContent>
            </DropdownMenu>
            </div>
        </div>
      </div>  

      {/* <div className='mt-3'>
        <div className='text-sm text-neutral-300 ml-6 font-medium dark:text-neutral-800'>Description</div>
        <div className='bg-neutral-700 dark:bg-neutral-300 p-3 m-3 rounded-2xl font-medium text-neutral-50 dark:text-neutral-800'>
          {book?.description || "Loading..."}
        </div>
      </div> */}

      <div className='mt-3'>
        <div className='text-sm text-neutral-300 ml-6 font-medium dark:text-neutral-800'>Summary</div>
        <div className='flex flex-col bg-neutral-700 dark:bg-neutral-300 p-3 m-3 rounded-2xl font-medium text-neutral-50 dark:text-neutral-800 space-y-2'>
          <div className='flex flex-row justify-between'>   
            <div>Remaining Loan Amount:</div>
            <div>Rs. {remainingLoan}</div>
          </div>
          <div className='flex flex-row justify-between'>   
            <div>Total EMI Paid:</div>
            <div>Rs. {totalEMIPaid}</div>
          </div>
          {/* <Link to="/summaryls">
            <Button className='flex flex-row justify-center w-full space-x-1 bg-neutral-800 dark:bg-neutral-400 text-neutral-50 dark:text-neutral-900 rounded-2xl p-2'>
              <p>View Detailed Summary</p>
              <FontAwesomeIcon icon={faArrowRight} className='text-xl mt-1' />  
            </Button>
          </Link>  */}
        </div>
      </div>

      <div className='mt-3'>
        <div className='flex flex-row justify-between text-sm text-neutral-300 ml-6 mr-6 font-medium mt-3 dark:text-neutral-800'>Entries <span>({filteredEntries.length} of {allEntries.length})</span></div> 
        {loading ? (
          <p className="text-center text-neutral-400 mt-4">Loading...</p>
        ) : allEntries.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-10 text-center text-neutral-400 dark:text-neutral-600">
            <img
              src="/emptyEntries.svg"
              alt="No entries yet"
              className="w-60 h-60 mb-4 opacity-100"
            />
            <p className="text-xl font-semibold mb-2">No entries yet</p>
            <p className="text-sm">Start by adding a new loan or EMI payment.</p>
          </div>
        ) : filteredEntries.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center text-neutral-400 dark:text-neutral-600">
            <img
              src="/notFound.svg"
              alt="No matching entries"
              className="w-60 h-60 mb-4 opacity-100"
            />
            <p className="text-xl font-semibold mb-2">No matching results</p>
            <p className="text-sm">Try adjusting your search or filters.</p>
          </div>
        ) : (
          filteredEntries.slice(0, visibleCount)
          .map((entry) => (
            <EntryCardLS key={entry.id} {...entry} 
            onDelete={async (idToDelete) => {
              try {
                  await deleteLoanStatus(idToDelete);
                  const updatedEntries = entries.filter((e) => e.id !== idToDelete);
                  setEntries(updatedEntries);
              } catch (err) {
                  alert("Failed to delete entry.");
              }
            }}
            />
          ))
        )}
      </div>

      <div className="flex flex-row justify-center fixed bottom-4 z-50 w-full">
        <Button onClick={handleEMIPaymentClick} className="bg-green-500 text-white rounded-l-full h-12 w-[40%] text-xl shadow-lg p-0">
          EMI Payment
        </Button>
        <Button onClick={handleNewLoanClick} className="bg-red-500 text-white rounded-r-full h-12 w-[40%] text-xl shadow-lg p-0">
          New Loan
        </Button>
      </div>
    </div>
  );
}

export default BookDetails2;