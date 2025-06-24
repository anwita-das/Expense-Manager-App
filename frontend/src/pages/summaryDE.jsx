import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faMoneyBills } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom' 

function SummaryDE() {
    return(
        <>
        <div className="bg-neutral-800 min-h-screen pb-20 dark:bg-neutral-200 dark:text-neutral-900">
            <div className='flex flex-row items-center p-2 mb-5 bg-green-300 space-x-2'>
                <Link to="/detailsde">
                    <FontAwesomeIcon icon={faChevronLeft} className="text-2xl cursor-pointer" />
                </Link>
                <div className='flex flex-row justify-between items-center w-full'>
                    <h1 className='text-3xl font-medium'>Summary</h1>
                    <div className='text-2xl'>Trip To Manali</div>
                </div>
                <FontAwesomeIcon icon={faMoneyBills} className="text-2xl"/> 
            </div>
            <div className='flex flex-col bg-neutral-700 dark:bg-neutral-300 p-5 m-3 rounded-2xl font-medium text-neutral-50 dark:text-neutral-800 space-y-2'>
                <div className='flex flex-row justify-between'>   
                    <div>Total Cash-OUT:</div>
                    <div>Rs. 20000</div>
                </div>
                <div className='flex flex-row justify-between'>   
                    <div>Total Cash-IN:</div>
                    <div>Rs. 2000</div>
                </div> 
                <div className='flex flex-row justify-between'>   
                    <div>Net Balance:</div>
                    <div>-Rs. 18000</div>
                </div>
                <div className='flex flex-row justify-between'>   
                    <div>Average Daily Spending:</div>
                    <div>Rs. 750</div>
                </div>
            </div>
            <div className='flex flex-col items-center bg-neutral-700 dark:bg-neutral-300 p-5 m-3 rounded-2xl font-medium text-neutral-50 dark:text-neutral-800 space-y-2'>
                <div className='text-2xl mb-4'>Spending By Category</div>
                <img
                src="https://docs.oracle.com/middleware/12212/adf/develop-faces/img/GUID-B9C1EE2F-8925-44F7-BD9F-AF6CF8B72CC4-default.png"
                alt="Pie chart placeholder"
                className="rounded-xl"
                />
            </div>
            <div className='flex flex-col items-center bg-neutral-700 dark:bg-neutral-300 p-5 m-3 rounded-2xl font-medium text-neutral-50 dark:text-neutral-800 space-y-2'>
                <div className='text-2xl mb-4'>Expense Trends Over Time</div>
                <img
                src="https://miro.medium.com/v2/1*83HW0O0Q60gOYDHvi17cZA.png"
                alt="Line chart placeholder"
                className="rounded-xl"
                />
            </div>
        </div>
        </>
    );
}

export default SummaryDE;