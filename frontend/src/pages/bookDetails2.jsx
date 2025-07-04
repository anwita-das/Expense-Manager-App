import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faArrowRight, faBuildingColumns } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import EntryCardLS from "@/components/entryCardLS";
import { getLoanStatusByBookId } from "@/api/loanStatus";
import { getBookById } from "@/api/books";
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
    const fetchEntries = async () => {
      try {
        const res = await getLoanStatusByBookId(id);
        setEntries(res.data);
      } catch (err) {
        console.error("Error fetching loan entries:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [id]);

  return (
    <div className="bg-neutral-800 min-h-screen dark:bg-neutral-200 pb-20 dark:text-neutral-900">
      <div className='flex flex-row items-center p-2 bg-orange-300 space-x-2'>
        <Link to="/books">
          <FontAwesomeIcon icon={faChevronLeft} className="text-2xl cursor-pointer" />
        </Link>
        <div className='flex flex-row justify-between items-center w-full'>
          <h1 className='text-3xl font-medium'>{book?.title || "Loading..."}</h1>
          <div className='text-xl'>Loan Status</div>
        </div>
        <FontAwesomeIcon icon={faBuildingColumns} className="text-2xl mr-3"/>
      </div>

      <div className="sticky top-0 z-40 bg-transparent flex flex-row justify-between items-center w-full">
        <div className="w-full px-4 py-2">
          <Input
            type="text"
            placeholder="Search entries..."
            className="w-full bg-neutral-300 text-neutral-800 dark:bg-neutral-300 dark:border-2 dark:border-neutral-400 dark:text-neutral-900"
          />
        </div>
        <div className="mr-3 mt-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-neutral-700 dark:bg-neutral-300 rounded-full shadow-lg">
                <Filter className="w-6 h-6 text-white dark:text-black" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 mr-5 bg-neutral-300 dark:bg-neutral-100 text-black">
              <DropdownMenuItem>All</DropdownMenuItem>
              <DropdownMenuItem>Filter 1</DropdownMenuItem>
              <DropdownMenuItem>Filter 2</DropdownMenuItem>
              <DropdownMenuItem>Filter 3</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>  

      <div className='mt-3'>
        <div className='text-sm text-neutral-300 ml-6 font-medium dark:text-neutral-800'>Description</div>
        <div className='bg-neutral-700 dark:bg-neutral-300 p-3 m-3 rounded-2xl font-medium text-neutral-50 dark:text-neutral-800'>
          Recent Loans Taken
        </div>
      </div>

      <div className='mt-3'>
        <div className='text-sm text-neutral-300 ml-6 font-medium dark:text-neutral-800'>Summary</div>
        <div className='flex flex-col bg-neutral-700 dark:bg-neutral-300 p-3 m-3 rounded-2xl font-medium text-neutral-50 dark:text-neutral-800 space-y-2'>
          <div className='flex flex-row justify-between'>   
            <div>Remaining Loan Amount:</div>
            <div>Rs. 125000</div>
          </div>
          <div className='flex flex-row justify-between'>   
            <div>Total EMI Paid:</div>
            <div>Rs. 75000</div>
          </div>
          <Link to="/summaryls">
            <Button className='flex flex-row justify-center w-full space-x-1 bg-neutral-800 dark:bg-neutral-400 text-neutral-50 dark:text-neutral-900 rounded-2xl p-2'>
              <p>View Detailed Summary</p>
              <FontAwesomeIcon icon={faArrowRight} className='text-xl mt-1' />  
            </Button>
          </Link> 
        </div>
      </div>

      <div className='mt-3'>
        <div className='text-sm text-neutral-300 ml-6 font-medium mt-3 dark:text-neutral-800'>Payment History</div> 
        {loading ? (
          <p className="text-center text-neutral-400 mt-4">Loading...</p>
        ) : entries.length === 0 ? (
          <p className="text-center text-neutral-400 mt-4">No entries found.</p>
        ) : (
          entries.map((entry) => (
            <EntryCardLS key={entry.id} {...entry} />
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