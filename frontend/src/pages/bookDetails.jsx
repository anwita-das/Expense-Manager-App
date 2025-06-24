import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faArrowRight, faMoneyBills } from '@fortawesome/free-solid-svg-icons'
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

    const handleCashInClick = () => {
        navigate("/entryde", { state: { type: "cashin" } });
    };

    const handleCashOutClick = () => {
        navigate("/entryde", { state: { type: "cashout" } });
    };
    return(
        <>
        <div className="bg-neutral-800 min-h-screen pb-20 dark:bg-neutral-200 dark:text-neutral-900">
            <div className='flex flex-row items-center p-2 bg-green-300 space-x-2'>
                <Link to="/books">
                    <FontAwesomeIcon icon={faChevronLeft} className="text-2xl cursor-pointer" />
                </Link>
                <div className='flex flex-row justify-between items-center w-full'>
                    <h1 className='text-3xl font-medium'>Trip to Manali</h1>
                    <div className='text-xl'>Daily Expense</div>
                </div>
                <FontAwesomeIcon icon={faMoneyBills} className="text-2xl"/> 
            </div>
            <div className="sticky top-0 z-40 bg-transparent flex flex-row justify-between items-center w-full">
        <div className="w-full px-4 py-2">
          <Input
            type="text"
            placeholder="Search entries..."
            className="w-full bg-neutral-300 text-neutral-800 dark:bg-neutral-200 dark:text-neutral-900"
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
                <div className='text-sm text-neutral-300 ml-6 font-medium dark:text-neutral-800'>Summary</div>
                <div className='flex flex-col bg-neutral-700 dark:bg-neutral-300 p-3 m-3 rounded-2xl font-medium text-neutral-50 dark:text-neutral-800 space-y-2'>
                    <div className='flex flex-row justify-between'>   
                        <div>Total Cash-OUT:</div>
                        <div className='text-red-400 font-bold'>Rs. 20000</div>
                    </div>
                    <div className='flex flex-row justify-between'>   
                        <div>Total Cash-IN:</div>
                        <div className='text-green-400 dark:text-green-600 font-bold'>Rs. 2000</div>
                    </div> 
                    <div className='flex flex-row justify-between'>   
                        <div>Net Balance:</div>
                        <div>-Rs. 18000</div>
                    </div>
                    <Link to = "/summaryde">
                    <Button className='flex flex-row justify-center w-full space-x-1 bg-neutral-800 dark:bg-neutral-400 text-neutral-50 dark:text-neutral-900 rounded-2xl p-2'>
                    <p>View Detailed Summary</p>
                    <FontAwesomeIcon icon={faArrowRight} className='text-xl mt-1' />  
                    </Button>
                    </Link>
                </div>
            </div>
            <div className='mt-3'>
                <div className='text-sm text-neutral-300 ml-6 font-medium mt-4 dark:text-neutral-800'>Entries</div>
                <div className='text-neutral-400 dark:text-neutral-500 w-full text-center mt-2'>20 June 2025</div>
                <Link to="/edetailsde"><div className='flex flex-row bg-neutral-700 dark:bg-neutral-300 p-3 m-3 rounded-2xl text-neutral-50 dark:text-neutral-800'>
                    <div className='flex flex-row justify-between w-full ml-2'>
                        <div className='text-red-400 font-bold'>Rs. 4500</div>
                        <div className='font-medium'>Hotel Booking</div>
                    </div>
                </div></Link>
                <div className='flex flex-row bg-neutral-700 dark:bg-neutral-300 p-3 m-3 rounded-2xl text-neutral-50 dark:text-neutral-800'>
                    <div className='flex flex-row justify-between w-full ml-2'>
                        <div className='text-green-400 dark:text-green-600 font-bold'>Rs. 5000</div>
                        <div className='font-medium'>Cash Withdrawn</div>
                    </div>
                </div>
                <div className='text-neutral-400 dark:text-neutral-500 w-full text-center mt-4'>21 June 2025</div>
                <div className='flex flex-row bg-neutral-700 dark:bg-neutral-300 p-3 m-3 rounded-2xl text-neutral-50 dark:text-neutral-800'>
                    <div className='flex flex-row justify-between w-full ml-2'>
                        <div className='text-red-400 font-bold'>Rs. 2500</div>
                        <div className='font-medium'>Paragliding</div>
                    </div>
                </div>
                <div className='flex flex-row bg-neutral-700 dark:bg-neutral-300 p-3 m-3 rounded-2xl text-neutral-50 dark:text-neutral-800'>
                    <div className='flex flex-row justify-between w-full ml-2'>
                        <div className='text-red-400 font-bold'>Rs. 900</div>
                        <div className='font-medium'>Dinner</div>
                    </div>
                </div>
                <div className='flex flex-row bg-neutral-700 dark:bg-neutral-300 p-3 m-3 rounded-2xl text-neutral-50 dark:text-neutral-800'>
                    <div className='flex flex-row justify-between w-full ml-2'>
                        <div className='text-green-400 dark:text-green-600 font-bold'>Rs. 1000</div>
                        <div className='font-medium'>Refund from friend</div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-center fixed bottom-4 z-50 w-full">
                <Button onClick={handleCashInClick} className="bg-green-500 text-white rounded-l-full h-12 w-[40%] text-xl shadow-lg p-0">
                + Cash IN
                </Button>
                <Button onClick={handleCashOutClick} className="bg-red-500 text-white rounded-r-full h-12 w-[40%] text-xl shadow-lg p-0">
                - Cash OUT
                </Button>
            </div>
        </div>
        </>
    );
}

export default BookDetails;