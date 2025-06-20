import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faMinus, faPlus, faArrowRight, faPiggyBank } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button";

function BookDetails3() {
    const navigate = useNavigate();

    const handleDepositClick = () => {
        navigate("/entrys", { state: { type: "deposit" } });
    };

    const handleWithdrawalClick = () => {
        navigate("/entrys", { state: { type: "withdrawal" } });
    };
    return(
        <>
        <div className="bg-neutral-800 min-h-screen pb-20 dark:bg-neutral-200 dark:text-neutral-900">
            <div className='flex flex-row items-center p-2 bg-blue-300 space-x-2'>
                <Link to="/books">
                    <FontAwesomeIcon icon={faChevronLeft} className="text-2xl cursor-pointer" />
                </Link>
                <div className='flex flex-row justify-between items-center w-full'>
                    <h1 className='text-3xl font-medium'>Savings Account</h1>
                    <div className='text-xl'>Savings</div>
                </div>
                <FontAwesomeIcon icon={faPiggyBank} className="text-2xl"/> 
            </div>
            <div className='mt-3'>
                <div className='text-sm text-neutral-300 ml-6 font-medium dark:text-neutral-800'>Description</div>
                <div className='bg-neutral-700 p-3 m-3 rounded-2xl font-medium text-neutral-50 dark:bg-neutral-300 dark:text-neutral-800'>Emergency Fund</div>
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
                    <div className='text-sm text-neutral-300 ml-6 font-medium mt-3 dark:text-neutral-800'>Entries</div>
                <Link to="/edetailss"><div className='flex flex-row bg-neutral-700 p-3 m-3 rounded-2xl text-neutral-50 dark:bg-neutral-300 dark:text-neutral-800'>
                    <FontAwesomeIcon icon={faPlus} className='mt-1 text-xl text-green-400 dark:text-green-700'/>
                    <div className='flex flex-row justify-between w-full ml-2'>
                        <div className='font-bold'>Rs. 3000</div>
                        <div className='font-medium'>Monthly Savings</div>
                    </div>
                </div></Link>
                <div className='flex flex-row bg-neutral-700 p-3 m-3 rounded-2xl text-neutral-50 dark:bg-neutral-300 dark:text-neutral-800'>
                    <FontAwesomeIcon icon={faPlus} className='mt-1 text-xl text-green-400 dark:text-green-700'/>
                    <div className='flex flex-row justify-between w-full ml-2'>
                        <div className='font-bold'>Rs. 5000</div>
                        <div className='font-medium'>Salary Deduction</div>
                    </div>
                </div>
                <div className='flex flex-row bg-neutral-700 p-3 m-3 rounded-2xl text-neutral-50 dark:bg-neutral-300 dark:text-neutral-800'>
                    <FontAwesomeIcon icon={faPlus} className='mt-1 text-xl text-green-400 dark:text-green-700'/>
                    <div className='flex flex-row justify-between w-full ml-2'>
                        <div className='font-bold'>Rs. 2000</div>
                        <div className='font-medium'>Gift from Aunt</div>
                    </div>
                </div>
                <div className='flex flex-row bg-neutral-700 p-3 m-3 rounded-2xl text-neutral-50 dark:bg-neutral-300 dark:text-neutral-800'>
                    <FontAwesomeIcon icon={faMinus} className='mt-1 text-xl text-red-400 dark:text-red-700'/>
                    <div className='flex flex-row justify-between w-full ml-2'>
                        <div className='font-bold'>Rs. 2500</div>
                        <div className='font-medium'>Emergency Car Repair</div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-center fixed bottom-4 z-50 w-full">
                <Button onClick={handleDepositClick} className="bg-green-500 text-white rounded-l-full h-12 w-[40%] text-xl shadow-lg p-0">
                + Deposit
                </Button>
                <Button onClick={handleWithdrawalClick} className="bg-red-500 text-white rounded-r-full h-12 w-[40%] text-xl shadow-lg p-0">
                - Withdrawal
                </Button>
            </div>
        </div>
        </>
    );
}

export default BookDetails3;