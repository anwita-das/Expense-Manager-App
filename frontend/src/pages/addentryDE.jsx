// import dayjs from "dayjs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faMoneyBills } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Calendar24 } from "@/components/Calendar24"

function AddEntryDE() {
  // const now = dayjs();
  // const dateOnly = now.format("DD MMM YYYY");
  // const timeOnly = now.format("HH:mm:ss");

  const location = useLocation();
  const initialType = location.state?.type || "cashout";
  const [entryType, setEntryType] = useState(initialType);

  useEffect(() => {
    if (location.state?.type) {
      setEntryType(location.state.type);
    }
  }, [location.state]);

  return (
    <div className="flex justify-center items-center bg-neutral-800 min-h-screen pb-2 dark:bg-neutral-200 dark:text-neutral-900">
      <div className="flex flex-col items-center justify-center w-[80%] h-auto p-4 rounded-2xl space-y-3 bg-neutral-600 dark:bg-neutral-300 text-neutral-50 dark:text-neutral-800">
        
        <div className="flex flex-row items-center justify-between w-full mb-5">
          <Link to="/detailsde">
            <FontAwesomeIcon icon={faChevronLeft} className="text-xl cursor-pointer" />
          </Link>
          <div className="font-bold text-3xl">New Entry</div>
          <FontAwesomeIcon icon={faMoneyBills} className="text-2xl" />
        </div>

        <div className="flex flex-row justify-between w-full items-center">
          <Calendar24 />
        </div>

        <div className="flex flex-row justify-center gap-3 mt-3 w-full">
          <Button
            type="button"
            className={`w-[45%] ${entryType === "cashin" ? "bg-green-400 dark:bg-green-00" : "bg-neutral-400 dark:bg-neutral-200 hover:bg-green-300"} text-black`}
            onClick={() => setEntryType("cashin")}
          >
            Cash IN
          </Button>
          <Button
            type="button"
            className={`w-[45%] ${entryType === "cashout" ? "bg-red-400 dark:bg-red-600" : "bg-neutral-400 dark:bg-neutral-200 hover:bg-red-300"} text-black`}
            onClick={() => setEntryType("cashout")}
          >
            Cash OUT
          </Button>
        </div>

        <div className='mt-3 w-full'>
          <div className='text-sm text-neutral-300 mb-2 font-bold dark:text-neutral-800'>Amount</div>
          <Input className={"dark:bg-neutral-100"} placeholder={"Enter the amount"} />
        </div>

        <div className='mt-3 w-full'>
          <div className='text-sm text-neutral-300 mb-2 font-bold dark:text-neutral-800'>Description</div>
          <Input className={"dark:bg-neutral-100"} placeholder={"Enter a brief description"} />
        </div>

        
          <div className="mt-3 w-full">
          <div className="text-sm text-neutral-300 mb-2 font-bold dark:text-neutral-800">
            Category
          </div>
          <Select>
            <SelectTrigger className="dark:bg-neutral-100 w-full hover:cursor-pointer">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="dark:bg-neutral-100 dark:text-neutral-900">
              {(entryType === "cashin"
                ? [
                    "Salary",
                    "Rental Income",
                    "Investment Return",
                    "Gift",
                    "Refund",
                    "Cashback",
                    "Settlement",
                    "Reimbursement",
                    "Others",
                  ]
                : [
                    "Food",
                    "Travel",
                    "Shopping",
                    "Entertainment",
                    "Bills",
                    "Miscellaneous",
                  ]
              ).map((category, index) => (
                <SelectItem key={index} value={category.toLowerCase().replace(/\s+/g, "-")}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
                <SelectItem value="cash">Online</SelectItem>
                <SelectItem value="upi">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
        

        <div className="flex flex-row justify-center mt-3 space-x-2 w-full">
          <Button type="submit" className="w-[40%] bg-purple-950 dark:text-neutral-50">
            Add Entry
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
  );
}

export default AddEntryDE;
