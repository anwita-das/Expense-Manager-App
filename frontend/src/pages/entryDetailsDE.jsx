import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';   
import { faChevronLeft, faMoneyBills } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"

function EntryDetailsDE() {
    return(
        <>
        <div className="flex justify-center items-center bg-neutral-800 min-h-screen pb-2 dark:bg-neutral-200 dark:text-neutral-900">
            <div className="flex flex-col items-center justify-center w-[90%] h-auto m-5 p-4 rounded-2xl space-y-2 bg-neutral-600 dark:bg-neutral-300 text-neutral-50 dark:text-neutral-800">
                <div className="flex flex-row items-center justify-between w-full mb-5">
                    <Link to="/detailsde">
                        <FontAwesomeIcon icon={faChevronLeft} className="text-xl cursor-pointer" />
                    </Link>
                    <div className="font-bold text-3xl">Edit Entry Details</div>
                    <FontAwesomeIcon icon={faMoneyBills} className="text-2xl" />
                </div>
                <div className="flex flex-row items-center justify-between w-full">
                    <div>Date: 20 June 2025</div>
                    <div>Time: 11:19:29</div>
                </div>
                <div className='mt-2 w-full'>
                    <div className='text-sm text-neutral-300 mb-2 ml-2 font-medium dark:text-neutral-800'>Type</div>
                    <div className='bg-neutral-700 p-3 rounded-2xl font-medium text-neutral-50 dark:bg-neutral-200 dark:text-neutral-800'>Cash-OUT</div>
                </div>
                <div className='mt-2 w-full'>
                    <div className='text-sm text-neutral-300 mb-2 ml-2 font-medium dark:text-neutral-800'>Amount</div>
                    <div className='bg-neutral-700 p-3 rounded-2xl font-medium text-neutral-50 dark:bg-neutral-200 dark:text-neutral-800'>Rs. 4500</div>
                </div>
                <div className='mt-2 w-full'>
                    <div className='text-sm text-neutral-300 mb-2 ml-2 font-medium dark:text-neutral-800'>Description</div>
                    <div className='bg-neutral-700 p-3 rounded-2xl font-medium text-neutral-50 dark:bg-neutral-200 dark:text-neutral-800'>Hotel Booking</div>
                </div>
                <div className='mt-2 w-full'>
                    <div className='text-sm text-neutral-300 mb-2 ml-2 font-medium dark:text-neutral-800'>Category</div>
                    <div className='bg-neutral-700 p-3 rounded-2xl font-medium text-neutral-50 dark:bg-neutral-200 dark:text-neutral-800'>Travel</div>
                </div>
                <div className='mt-2 w-full'>
                    <div className='text-sm text-neutral-300 mb-2 ml-2 font-medium dark:text-neutral-800'>Payment Mode</div>
                    <div className='bg-neutral-700 p-3 rounded-2xl font-medium text-neutral-50 dark:bg-neutral-200 dark:text-neutral-800'>Online</div>
                </div>
                <div className="flex flex-row justify-center mt-3 space-x-2 w-full">
                <Button type="submit" className="w-[40%] bg-purple-950 hover:bg-purple-400 dark:text-neutral-50">
                    Edit Entry
                </Button>
                <Button variant="default" className="hover:cursor-pointer w-[40%] bg-red-500 hover:bg-red-300 text-neutral-50">
                    Delete Entry
                </Button>
                </div>
            </div>
        </div>
        </>
    );
}

export default EntryDetailsDE;