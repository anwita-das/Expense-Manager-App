import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faArrowRight, faMoneyBills } from '@fortawesome/free-solid-svg-icons'
import { getDailyExpensesByBookId } from "@/api/dailyExpense";
import { deleteDailyExpense } from "@/api/dailyExpense";
import { getExpenseSummary } from "@/api/dailyExpense";
import { useParams } from "react-router-dom";
import { getBookById } from "@/api/books";
import { useState, useEffect } from "react";
import EntryCard from "@/components/entryCardDE";
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

function BookDetails() {
    const navigate = useNavigate();

    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [groupedExpenses, setGroupedExpenses] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [summary, setSummary] = useState({
        total_earning: 0,
        total_spending: 0,
        balance: 0
    })

    const groupByDate = (data) => {
    const grouped = {};
    data.forEach((entry) => {
        const dateStr = new Date(entry.datetime).toLocaleDateString("en-GB", {
        day: "2-digit", month: "long", year: "numeric",
        });
        if (!grouped[dateStr]) grouped[dateStr] = [];
        grouped[dateStr].push(entry);
    });
    return grouped;
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
    const fetchExpenses = async () => {
        try {
        const res = await getDailyExpensesByBookId(id, {
            ...(searchTerm && { search: searchTerm }),
            ...(typeFilter && { type: typeFilter }),
        });
        setExpenses(res.data);
        setGroupedExpenses(groupByDate(res.data));
        } catch (err) {
        console.error("Error fetching daily expenses:", err);
        } finally {
        setLoading(false);
        }
    };

    fetchExpenses();
    }, [id, searchTerm, typeFilter]);

    useEffect(() => {
        const fetchSummary = async () => {
            try{
                const res = await getExpenseSummary(id);
                setSummary(res);
            } catch (err) {
                console.error("Failed to fetch summary", err);
            }
        };
        fetchSummary();
    }, [id, expenses]);

    const handleCashInClick = () => {
        navigate(`/entryde/${id}`, { state: { type: "cashin", bookId: id } });
    };

    const handleCashOutClick = () => {
        navigate(`/entryde/${id}`, { state: { type: "cashout", bookId: id } });
    };

    const getFilterLabel = () => {
        if (typeFilter === "cashin") return "Cash-IN";
        if (typeFilter === "cashout") return "Cash-OUT";
        return "All";
    };


    return(
        <>
        <div className="bg-neutral-800 min-h-screen pb-20 dark:bg-neutral-200 dark:text-neutral-900">
            <div className='flex flex-row items-center p-2 bg-green-300 space-x-2'>
                <Link to="/books">
                    <FontAwesomeIcon icon={faChevronLeft} className="text-2xl cursor-pointer" />
                </Link>
                <div className='flex flex-row justify-between items-center w-full'>
                    <h1 className='text-3xl font-medium'>{book?.title || "Loading..."}</h1>
                    <div className='text-xl'>Daily Expense</div>
                </div>
                <FontAwesomeIcon icon={faMoneyBills} className="text-2xl"/> 
            </div>
            <div className="sticky top-0 z-40 bg-transparent flex flex-row justify-between items-center w-full">
        <div className="w-full px-4 py-2">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search entries..."
            className="w-full bg-neutral-300 text-neutral-800 dark:bg-neutral-300 dark:border-2 dark:border-neutral-400 dark:text-neutral-900"
          />
        </div>
        <div className="mr-3 mt-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-neutral-700 dark:bg-neutral-300 rounded-full shadow-lg">
                <Filter className="w-6 h-6 text-white dark:text-black" />
                <span className="text-white dark:text-black text-sm">{getFilterLabel()}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 mr-5 bg-neutral-300 dark:bg-neutral-100 text-black">
              <DropdownMenuItem onClick={() => setTypeFilter("")}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTypeFilter("cashin")}>Cash-IN</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTypeFilter("cashout")}>Cash-OUT</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        </div>  
            <div className='mt-3'>
                <div className='text-sm text-neutral-300 ml-6 font-medium dark:text-neutral-800'>Summary</div>
                <div className='flex flex-col bg-neutral-700 dark:bg-neutral-300 p-3 m-3 rounded-2xl font-medium text-neutral-50 dark:text-neutral-800 space-y-2'>
                    <div className='flex flex-row justify-between'>   
                        <div>Total Cash-OUT:</div>
                        <div className='text-red-400 dark:text-red-500 font-bold'>Rs. {summary.total_spending}</div>
                    </div>
                    <div className='flex flex-row justify-between'>   
                        <div>Total Cash-IN:</div>
                        <div className='text-green-400 dark:text-green-600 font-bold'>Rs. {summary.total_earning}</div>
                    </div> 
                    <div className='flex flex-row justify-between'>   
                        <div>Net Balance:</div>
                        <div className={`${summary.balance < 0 ? "text-red-400 dark:text-red-500" : "text-green-500"} font-bold`}>
                            {summary.balance < 0 ? `-Rs. ${Math.abs(summary.balance)}` : `Rs. ${summary.balance}`}
                        </div>
                    </div>
                    {/* <Link to = "/summaryde">
                    <Button className='flex flex-row justify-center w-full space-x-1 bg-neutral-800 dark:bg-neutral-400 text-neutral-50 dark:text-neutral-900 rounded-2xl p-2'>
                    <p>View Detailed Summary</p>
                    <FontAwesomeIcon icon={faArrowRight} className='text-xl mt-1' />  
                    </Button>
                    </Link> */}
                </div>
            </div>
            <div className='mt-3'>
                <div className='text-sm text-neutral-300 ml-6 font-medium mt-4 dark:text-neutral-800'>Entries</div>
                {loading ? (
                <p className="text-center text-neutral-400 mt-4">Loading...</p>
                ) : Object.keys(groupedExpenses).length === 0 ? (
                <p className="text-center text-neutral-400 mt-4">No entries found.</p>
                ) : (
                Object.entries(groupedExpenses).map(([date, entries]) => (
                    <div key={date}>
                    <div className='text-neutral-400 dark:text-neutral-500 w-full text-center mt-4'>{date}</div>
                    {entries.map(entry => (
                        <EntryCard
                            key={entry.id}
                            {...entry}
                            onDelete={async (idToDelete) => {
                            try {
                                await deleteDailyExpense(idToDelete);
                                const updatedExpenses = expenses.filter((e) => e.id !== idToDelete);
                                setExpenses(updatedExpenses);
                                setGroupedExpenses(groupByDate(updatedExpenses));
                            } catch (err) {
                                alert("Failed to delete entry.");
                            }
                            }}
                        />
                    ))}
                    </div>
                ))
                )}
            </div>
            <div className="flex flex-row justify-center fixed bottom-4 z-50 w-full">
                <Button onClick={handleCashInClick} className="bg-green-500 text-white dark:text-black rounded-l-full h-12 w-[40%] text-xl shadow-lg p-0">
                + Cash-IN
                </Button>
                <Button onClick={handleCashOutClick} className="bg-red-500 text-white dark:text-black rounded-r-full h-12 w-[40%] text-xl shadow-lg p-0">
                - Cash-OUT
                </Button>
            </div>
        </div>
        </>
    );
}

export default BookDetails;