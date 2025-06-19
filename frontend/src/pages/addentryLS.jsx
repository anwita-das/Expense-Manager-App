import dayjs from "dayjs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faBuildingColumns } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

function AddEntryLS() {
    const now = dayjs(); // current date & time
    const dateOnly = now.format("DD MMM YYYY");
    const timeOnly = now.format("HH:mm:ss");
    return(
        <>
        <div className="flex justify-center items-center bg-neutral-800 min-h-screen pb-2 dark:bg-neutral-200 dark:text-neutral-900">
            <div className="flex flex-col items-center justify-center w-[80%] h-auto p-4 rounded-2xl space-y-3 bg-neutral-600 dark:bg-neutral-300 text-neutral-50 dark:text-neutral-800">
                <div className="flex flex-row items-center justify-between w-full mb-5">
                    <Link to="/detailsls">
                    <FontAwesomeIcon icon={faChevronLeft} className="text-xl cursor-pointer" />
                    </Link>
                    <div className="font-bold text-3xl">EMI payment</div>
                    <FontAwesomeIcon icon={faBuildingColumns} className="text-2xl"/>
                </div>
                <div className="flex flex-row justify-between w-full items-center">
                    <div>Date: {dateOnly}</div>
                    <div>Time: {timeOnly}</div>
                </div>
                <div className='mt-3 w-full'>
                    <div className='text-sm text-neutral-300 mb-2 font-bold dark:text-neutral-800'>Amount</div>
                    <Input className={"dark:bg-neutral-100"} placeholder={"Enter the amount paid"} />
                </div>
                <div className='mt-3 w-full'>
                    <div className='text-sm text-neutral-300 mb-2 font-bold dark:text-neutral-800'>Description</div>
                    <Input className={"dark:bg-neutral-100"} placeholder={"Enter a brief description"} />
                </div>
                <div className="mt-3 w-full">
                <div className="text-sm text-neutral-300 mb-2 font-bold dark:text-neutral-800">
                    Payment Mode
                </div>
                <Select>
                    <SelectTrigger className="dark:bg-neutral-100 w-full hover:cursor-pointer">
                    <SelectValue placeholder="Select payment mode" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-neutral-100 dark:text-neutral-900">
                    <SelectItem value="auto-debit">Auto-debit</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="netbanking">Net Banking</SelectItem>
                    <SelectItem value="credit-card">Credit Card</SelectItem>
                    <SelectItem value="debit-card">Debit Card</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                </Select>
                </div>
                <div className="flex flex-row justify-center mt-3 space-x-2 w-full">
                    <Button type="submit" className="w-[40%] bg-purple-950 dark:text-neutral-50">
                        Add Payment
                    </Button>
                    <Button
                      variant="default"
                      className="hover:cursor-pointer w-[40%] bg-red-500 text-neutral-50"
                    >
                      Cancel
                    </Button>
                    
                </div>
            </div>
        </div>
        </>
    );
}

export default AddEntryLS;