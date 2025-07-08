import { useEffect, useState } from "react";
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
import { MoreVertical } from "lucide-react";
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
            setSavings(response.data);
            } catch (err) {
            console.error("Failed to fetch savings entries", err);
            } finally {
            setLoading(false);
            }
        };
        fetchSavings();
    }, [id]);


    const handleDepositClick = () => {
        navigate(`/entrys/${id}`, { state: { type: "deposit" } });
    };

    const handleWithdrawalClick = () => {
        navigate(`/entrys/${id}`, { state: { type: "withdrawal" } });
    };
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
                <div className='bg-neutral-700 p-3 m-3 rounded-2xl font-medium text-neutral-50 dark:bg-neutral-300 dark:text-neutral-800'>{book?.description || "Loading..."}</div>
            </div>
            <div className='mt-3'>
                <div className='text-sm text-neutral-300 ml-6 font-medium dark:text-neutral-800'>Summary</div>
                <div className='flex flex-col bg-neutral-700 p-3 m-3 rounded-2xl font-medium text-neutral-50 dark:bg-neutral-300 dark:text-neutral-800 space-y-2'>
                    <div className='flex flex-row justify-between'>   
                        <div>Total Saved Amount:</div>
                        <div>Rs. 18500</div>
                    </div>
                    <div className='flex flex-row justify-between'>   
                        <div>Interest Estimate:</div>
                        <div>Rs. 2300</div>
                    </div> 
                    <div className='flex flex-row justify-between'>   
                        <div>Last Deposit Date:</div>
                        <div>18/06/25</div>
                    </div>
                    <Link to="/summarys">
                    <Button className='flex flex-row justify-center w-full space-x-1 bg-neutral-800 dark:bg-neutral-400 text-neutral-50 dark:text-neutral-900 rounded-2xl p-2'>
                    <p>View Detailed Summary</p>
                    <FontAwesomeIcon icon={faArrowRight} className='text-xl mt-1' />  
                    </Button> </Link>
                </div>
            </div>
            <div className='mt-3'>
                <div className='flex flex-row justify-between'>
                    <div className='text-sm text-neutral-300 ml-6 font-medium mt-3 dark:text-neutral-800'>Entries</div>
                </div>
                {loading ? (
                <p className="text-center text-neutral-400 mt-4">Loading...</p>
                ) : savings.length === 0 ? (
                <p className="text-center text-neutral-400 mt-4">No savings entries found.</p>
                ) : (
                savings.map((entry) => (
                    <EntryCardS
                    key={entry.id}
                    {...entry}
                    onDelete={async (idToDelete) => {
                        try {
                            await deleteSavings(idToDelete);
                            const updatedSavings = savings.filter((e) => e.id !== idToDelete);
                            setSavings(updatedSavings);
                        } catch (err) {
                            alert("Failed to delete entry.");
                        }
                    }}
                    />
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