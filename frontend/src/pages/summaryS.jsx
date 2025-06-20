import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faPiggyBank} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom' 

function SummaryLS() {
    return(
        <>
        <div className="bg-neutral-800 min-h-screen pb-20 dark:bg-neutral-200 dark:text-neutral-900">
            <div className='flex flex-row items-center p-2 mb-5 bg-blue-300 space-x-2'>
                <Link to="/detailss">
                    <FontAwesomeIcon icon={faChevronLeft} className="text-2xl cursor-pointer" />
                </Link>
                <div className='flex flex-row justify-between items-center w-full'>
                    <h1 className='text-3xl font-medium'>Summary</h1>
                    <div className='text-2xl'>Savings Account</div>
                </div>
                <FontAwesomeIcon icon={faPiggyBank} className="text-2xl"/> 
            </div>
            <div className='flex flex-col bg-neutral-700 dark:bg-neutral-300 p-5 m-3 rounded-2xl font-medium text-neutral-50 dark:text-neutral-800 space-y-2'>
                <div className='flex flex-row justify-between'>   
                    <div>Total Saved:</div>
                    <div>Rs. 18500</div>
                </div>
                <div className='flex flex-row justify-between'>   
                    <div>Interest Estimate:</div>
                    <div>Rs. 2300</div>
                </div>
                <div className='flex flex-row justify-between'>   
                    <div>Last Deposit:</div>
                    <div>18 June 2025</div>
                </div>
                <div className='flex flex-row justify-between'>   
                    <div>First Deposit:</div>
                    <div>10 March 2025</div>
                </div>
            </div>
            <div className='flex flex-col items-center bg-neutral-700 dark:bg-neutral-300 p-5 m-3 rounded-2xl font-medium text-neutral-50 dark:text-neutral-800 space-y-2'>
                <div className='text-2xl mb-4'>Savings over Time</div>
                <img
                src="https://miro.medium.com/v2/1*83HW0O0Q60gOYDHvi17cZA.png"
                alt="Line chart placeholder"
                className="rounded-xl"
                />
            </div>
            <div className='text-neutral-50'>further info to be discussed</div>
        </div>
        </>
    );
}

export default SummaryLS;