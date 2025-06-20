import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import dayjs from "dayjs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

function AddEntryS() {
  const now = dayjs();
  const dateOnly = now.format("DD MMM YYYY");
  const timeOnly = now.format("HH:mm:ss");

  const location = useLocation();
  const initialType = location.state?.type || "deposit";
  const [entryType, setEntryType] = useState(initialType);
  const [depositMode, setDepositMode] = useState("onetime");

  useEffect(() => {
    if (location.state?.type) {
      setEntryType(location.state.type);
    }
  }, [location.state]);

  return (
    <div className="flex justify-center items-center bg-neutral-800 min-h-screen pb-2 dark:bg-neutral-200 dark:text-neutral-900">
      <div className="flex flex-col items-center justify-center w-[80%] h-auto m-5 p-4 rounded-2xl space-y-3 bg-neutral-600 dark:bg-neutral-300 text-neutral-50 dark:text-neutral-800">
        
        <div className="flex flex-row items-center justify-between w-full mb-5">
          <Link to="/detailss">
            <FontAwesomeIcon icon={faChevronLeft} className="text-xl cursor-pointer" />
          </Link>
          <div className="font-bold text-3xl">New Entry</div>
          <FontAwesomeIcon icon={faPiggyBank} className="text-2xl" />
        </div>

        <div className="flex flex-row justify-between w-full items-center">
          <div>Date: {dateOnly}</div>
          <div>Time: {timeOnly}</div>
        </div>

        <div className="flex flex-row justify-center gap-3 mt-3 w-full">
          <Button
            type="button"
            className={`w-[45%] ${entryType === "deposit" ? "bg-green-400 dark:bg-green-600" : "bg-neutral-400 dark:bg-neutral-200 hover:bg-green-300"} text-black`}
            onClick={() => setEntryType("deposit")}
          >
            Deposit
          </Button>
          <Button
            type="button"
            className={`w-[45%] ${entryType === "withdrawal" ? "bg-red-400 dark:bg-red-600" : "bg-neutral-400 dark:bg-neutral-200 hover:bg-red-300"} text-black`}
            onClick={() => setEntryType("withdrawal")}
          >
            Withdrawal
          </Button>
        </div>

        {entryType === "withdrawal" && (
          <>
            <div className="mt-3 w-full">
              <div className="text-sm text-neutral-300 mb-2 font-bold dark:text-neutral-800">Amount</div>
              <Input type="number" placeholder="Enter amount withdrawn" className="dark:bg-neutral-100" />
            </div>
            <div className="mt-3 w-full">
              <div className="text-sm text-neutral-300 mb-2 font-bold dark:text-neutral-800">Description</div>
              <Input type="text" placeholder="Reason for withdrawal" className="dark:bg-neutral-100" />
            </div>
          </>
        )}

        {entryType === "deposit" && (
          <>
            <div className="mt-3 w-full">
              <div className="text-sm text-neutral-300 mb-2 font-bold dark:text-neutral-800">Type</div>
              <Select onValueChange={(value) => setDepositMode(value)} >
                <SelectTrigger className="dark:bg-neutral-100 w-full hover:cursor-pointer">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="dark:bg-neutral-100 dark:text-neutral-900">
                  <SelectItem value="onetime">One Time</SelectItem>
                  <SelectItem value="recurring">Recurring</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-3 w-full">
              <div className="text-sm text-neutral-300 mb-2 font-bold dark:text-neutral-800">Amount</div>
              <Input type="number" placeholder="Enter amount saved" className="dark:bg-neutral-100" />
            </div>
            <div className="mt-3 w-full">
              <div className="text-sm text-neutral-300 mb-2 font-bold dark:text-neutral-800">Description</div>
              <Input type="text" placeholder="Savings purpose" className="dark:bg-neutral-100" />
            </div>
            <div className="mt-3 w-full">
              <div className="text-sm text-neutral-300 mb-2 font-bold dark:text-neutral-800">Rate of Interest</div>
              <Input type="number" placeholder="Enter interest rate (p.a)" className="dark:bg-neutral-100" />
            </div>

            {depositMode === "recurring" && (
              <div className="mt-3 w-full">
                <div className="text-sm text-neutral-300 mb-2 font-bold dark:text-neutral-800">Frequency</div>
                <Select>
                  <SelectTrigger className="dark:bg-neutral-100 w-full hover:cursor-pointer">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-neutral-100 dark:text-neutral-900">
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="monthly">Every 6 months</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </>
        )}

       <div className="flex flex-row justify-center mt-3 space-x-2 w-full">
          <Button type="submit" className="w-[40%] bg-purple-950 dark:text-neutral-50">
            Add Entry
          </Button>
          <Button variant="default" className="hover:cursor-pointer w-[40%] bg-red-500 text-neutral-50">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddEntryS;
