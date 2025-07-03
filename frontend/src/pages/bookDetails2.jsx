import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faArrowRight, faBuildingColumns } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import EntryCardLS from "@/components/entryCardLS";
import { getLoanStatusByBookId } from "@/api/loanStatus";

function BookDetails2() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleNewLoanClick = () => {
    navigate("/entryls", { state: { type: "newloan", bookId: id } });
  };

  const handleEMIPaymentClick = () => {
    navigate("/entryls", { state: { type: "emipayment", bookId: id } });
  };

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
          <h1 className='text-3xl font-medium'>Loans</h1>
          <div className='text-xl'>Loan Status</div>
        </div>
        <FontAwesomeIcon icon={faBuildingColumns} className="text-2xl mr-3"/>
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