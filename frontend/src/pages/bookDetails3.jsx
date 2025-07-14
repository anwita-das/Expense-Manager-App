import { useEffect, useState } from "react";
import { calculateGrowth } from "../../utils/calculateGrowth";
import { getSavingsByBookId } from "@/api/savings";
import { getBookById } from "@/api/books";
import { deleteSavings } from "@/api/savings";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faArrowRight, faPiggyBank } from '@fortawesome/free-solid-svg-icons'
import EntryCardS from "@/components/EntryCardS";
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

function BookDetails3() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [savings, setSavings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [groupedSavings, setGroupedSavings] = useState({});

    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("All");
    const [visibleCount, setVisibleCount] = useState(10);

    const groupByDate = (data) => {
    const grouped = {};
    data.forEach((entry) => {
        const dateStr = new Date(entry.date).toLocaleDateString("en-GB", {
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
        const fetchSavings = async () => {
            try {
            const response = await getSavingsByBookId(id);
            const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setSavings(sortedData);
            setGroupedSavings(groupByDate(sortedData));
            } catch (err) {
            console.error("Failed to fetch savings entries", err);
            } finally {
            setLoading(false);
            }
        };
        fetchSavings();
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

    const handleDepositClick = () => {
        navigate(`/entrys/${id}`, { state: { type: "deposit" } });
    };

    const handleWithdrawalClick = () => {
        navigate(`/entrys/${id}`, { state: { type: "withdrawal" } });
    };

    const filteredSavings = savings.filter((entry) => {
        if (filterType === "One-Time" && entry.saving_type !== "onetime") return false;
        if (filterType === "Recurring" && entry.saving_type !== "recurring") return false;
        const search = searchTerm.toLowerCase();
        return (
        entry.description.toLowerCase().includes(search)
        );
    });

    const paginatedSavings = filteredSavings.slice(0, visibleCount);
    const groupedToShow = groupByDate(paginatedSavings);

    const totalSaved = filteredSavings.reduce((sum, entry) => sum + parseFloat(entry.amount), 0);

    const totalInterest = filteredSavings.reduce((sum, entry) => {
    const interest = calculateGrowth({
        amount: parseFloat(entry.amount),
        rate: entry.interest_rate,
        date: entry.date,
        frequency: entry.frequency,
    });
    return sum + (isNaN(interest) ? 0 : interest);
    }, 0);

    return(
        <>
        <div className="bg-neutral-800 min-h-screen pb-20 dark:bg-neutral-200 dark:text-neutral-900">
            <div className='flex flex-row items-center p-2 bg-blue-300 space-x-2'>
                <Link to="/books">
                    <FontAwesomeIcon icon={faChevronLeft} className="text-2xl cursor-pointer" />
                </Link>
                <div className='flex flex-row justify-between items-center w-full'>
                    <h1 className='text-3xl font-medium'>{book?.title || "Loading..."}</h1>
                    <div className='text-xl'>Savings</div>
                </div>
                <FontAwesomeIcon icon={faPiggyBank} className="text-2xl"/> 
            </div>

            <div className="sticky top-0 z-40 bg-transparent flex flex-row justify-between items-center w-full">
                <div className="w-full px-4 py-2">
                <Input
                    type="text"
                    placeholder="Search entries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-neutral-300 text-neutral-800 dark:bg-neutral-300 dark:border-2 dark:border-neutral-400 dark:text-neutral-900"
                />
                </div>
                <div className="mr-3 mt-1">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button className="bg-neutral-700 dark:bg-neutral-300 rounded-full shadow-lg">
                        <Filter className="w-6 h-6 text-white dark:text-black" />
                        <span className="text-white dark:text-black text-sm">{filterType}</span>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40 mr-5 bg-neutral-300 dark:bg-neutral-100 text-black">
                    <DropdownMenuItem onClick={() => setFilterType("All")}>All</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterType("One-Time")}>One-Time</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterType("Recurring")}>Recurring</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                </div>
            </div> 

            {/* <div className='mt-3'>
                <div className='text-sm text-neutral-300 ml-6 font-medium dark:text-neutral-800'>Description</div>
                <div className='bg-neutral-700 p-3 m-3 rounded-2xl font-medium text-neutral-50 dark:bg-neutral-300 dark:text-neutral-800'>{book?.description || "Loading..."}</div>
            </div> */}
            <div className='mt-3'>
                <div className='text-sm text-neutral-300 ml-6 font-medium dark:text-neutral-800'>Summary</div>
                <div className='flex flex-col bg-neutral-700 p-3 m-3 rounded-2xl font-medium text-neutral-50 dark:bg-neutral-300 dark:text-neutral-800 space-y-2'>
                    <div className='flex flex-row justify-between'>   
                        <div>Total Saved Amount:</div>
                        <div>Rs. {totalSaved.toFixed(2)}</div>
                    </div>
                    <div className='flex flex-row justify-between'>   
                        <div>Interest Estimate:</div>
                        <div>Rs. {totalInterest.toFixed(2)}</div>
                    </div> 
                    {/* <Link to="/summarys">
                    <Button className='flex flex-row justify-center w-full space-x-1 bg-neutral-800 dark:bg-neutral-400 text-neutral-50 dark:text-neutral-900 rounded-2xl p-2'>
                    <p>View Detailed Summary</p>
                    <FontAwesomeIcon icon={faArrowRight} className='text-xl mt-1' />  
                    </Button> </Link> */}
                </div>
            </div>
            <div className='mt-3'>
                <div className='flex flex-row justify-between'>
                    <div className='text-sm text-neutral-300 ml-6 font-medium mt-3 dark:text-neutral-800'>Entries</div>
                </div>
                {loading ? (
                <p className="text-center text-neutral-400 mt-4">Loading...</p>
                ) : paginatedSavings.length === 0 ? (
                <p className="text-center text-neutral-400 mt-4">No entries match your filter/search.</p>
                ) : (
                Object.entries(groupedToShow).map(([date, entries]) => (
                    <div key={date}>
                    <div className="text-neutral-400 dark:text-neutral-500 w-full text-center mt-4">{date}</div>
                    {entries.map((entry) => (
                        <EntryCardS
                        key={entry.id}
                        {...entry}
                        onDelete={async (idToDelete) => {
                            try {
                            await deleteSavings(idToDelete);
                            const updated = savings.filter((e) => e.id !== idToDelete);
                            setSavings(updated);
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
                <Button onClick={handleDepositClick} className="bg-green-500 text-white rounded-full h-12 w-[40%] text-xl shadow-lg p-0">
                + Deposit
                </Button>
                {/* <Button onClick={handleWithdrawalClick} className="bg-red-500 text-white rounded-r-full h-12 w-[40%] text-xl shadow-lg p-0">
                - Withdrawal
                </Button> */}
            </div>
        </div>
        </>
    );
}

export default BookDetails3;