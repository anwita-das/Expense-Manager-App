import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faCheck, faArrowRight, faBuildingColumns } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button";

function BookDetails2() {

    return (
        <>
        <div className="bg-neutral-800 min-h-screen pb-2 dark:bg-neutral-200 dark:text-neutral-900">
            <div className='flex flex-row items-center p-2 bg-orange-300 space-x-2'>
                <Link to="/books">
                    <FontAwesomeIcon icon={faChevronLeft} className="text-2xl cursor-pointer" />
                </Link>
                <div className='flex flex-row justify-between items-center w-full'>
                    <h1 className='text-3xl font-medium'>Education Loan</h1>
                    <div className='text-xl'>Loan Status</div>
                </div>
                <FontAwesomeIcon icon={faBuildingColumns} className="text-2xl mr-3"/>
            </div>
            <div className='mt-3'>
                <div className='text-sm text-neutral-300 ml-6 font-medium dark:text-neutral-800'>Description</div>
                <div className='bg-neutral-700 dark:bg-neutral-300 p-3 m-3 rounded-2xl font-medium text-neutral-50 dark:text-neutral-800'>Education Loan taken for higher studies</div>
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
                    <div className='flex flex-row justify-between'>   
                        <div>Next Due Date:</div>
                        <div>05/07/2025</div>
                    </div>
                    <div className='flex flex-row justify-between'>   
                        <div>Interest Rate:</div>
                        <div>9% p.a</div>
                    </div>
                    <Button className='flex flex-row justify-center space-x-1 bg-neutral-800 dark:bg-neutral-400 text-neutral-50 dark:text-neutral-900 rounded-2xl p-2'>
                    <p>View Detailed Summary</p>
                    <FontAwesomeIcon icon={faArrowRight} className='text-xl mt-1' />  
                    </Button>  
                </div>
            </div>
            <div className='mt-3'>
                <div className='flex flex-row justify-between mt-5'>
                    <div className='text-sm text-neutral-300 ml-6 font-medium mt-3 dark:text-neutral-800'>Payment History</div>
                    <Link to="/entryls">
                    <Button className="bg-purple-900 mr-4 dark:text-neutral-50 hover:bg-purple-400">+ Add Payment</Button>
                    </Link>
                </div>
                <Link to="/edetailsls">
                <div className='flex flex-row bg-neutral-700 dark:bg-neutral-300 p-3 m-3 rounded-2xl text-neutral-50 dark:text-neutral-800'>
                    <FontAwesomeIcon icon={faCheck} className='mt-1 text-xl text-green-400 dark:text-green-700'/>
                    <div className='flex flex-row justify-between w-full ml-2'>
                        <div className='font-medium'>Paid</div>
                        <div className='font-bold'>Rs. 5000</div>
                        <div className='font-medium'>05/03/2025</div>
                    </div>
                </div>
                </Link>
                <div className='flex flex-row bg-neutral-700 dark:bg-neutral-300 p-3 m-3 rounded-2xl text-neutral-50 dark:text-neutral-800'>
                    <FontAwesomeIcon icon={faCheck} className='mt-1 text-xl text-green-400 dark:text-green-700'/>
                    <div className='flex flex-row justify-between w-full ml-2'>
                        <div className='font-medium'>Paid</div>
                        <div className='font-bold'>Rs. 5000</div>
                        <div className='font-medium'>05/04/2025</div>
                    </div>
                </div>
                <div className='flex flex-row bg-neutral-700 dark:bg-neutral-300 p-3 m-3 rounded-2xl text-neutral-50 dark:text-neutral-800'>
                    <FontAwesomeIcon icon={faCheck} className='mt-1 text-xl text-green-400 dark:text-green-700'/>
                    <div className='flex flex-row justify-between w-full ml-2'>
                        <div className='font-medium'>Paid</div>
                        <div className='font-bold'>Rs. 5000</div>
                        <div className='font-medium'>05/05/2025</div>
                    </div>
                </div>
                <div className='flex flex-row bg-neutral-700 dark:bg-neutral-300 p-3 m-3 rounded-2xl text-neutral-50 dark:text-neutral-800'>
                    <FontAwesomeIcon icon={faCheck} className='mt-1 text-xl text-green-400 dark:text-green-700'/>
                    <div className='flex flex-row justify-between w-full ml-2'>
                        <div className='font-medium'>Paid</div>
                        <div className='font-bold'>Rs. 5000</div>
                        <div className='font-medium'>05/06/2025</div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default BookDetails2;
