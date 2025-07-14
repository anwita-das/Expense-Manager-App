import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { createSavings } from "@/api/savings";
import { validateSavingsEntry } from "../../utils/validation";
// import dayjs from "dayjs";
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
import { Calendar24 } from "@/components/Calendar24"

function AddEntryS() {
  // const now = dayjs();
  // const dateOnly = now.format("DD MMM YYYY");
  // const timeOnly = now.format("HH:mm:ss");

  const { bookId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const initialType = location.state?.type || "deposit";

  const [entryType, setEntryType] = useState(initialType);
  const [depositMode, setDepositMode] = useState("onetime");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [frequency, setFrequency] = useState("");
  const [date, setDate] = useState(new Date());
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.state?.type) {
      setEntryType(location.state.type);
    }
  }, [location.state]);

  const handleSubmit = async () => {
    const validationErrors = validateSavingsEntry({
      amount,
      interestRate,
      date,
      frequency,
      description,
    });
            
    setErrors(validationErrors);
    
    // If any error exists, don't proceed
    if (Object.keys(validationErrors).length > 0) return;

    const payload = {
      book_id: parseInt(bookId),
      saving_type: depositMode,
      amount: parseFloat(amount),
      description,
      date,
      frequency: depositMode === "recurring" ? frequency : null,
      interest_rate: parseFloat(interestRate),
    };

    try {
      await createSavings(payload);
      navigate(`/detailss/${bookId}`);
    } catch (err) {
      alert("Error creating entry.");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center bg-neutral-800 min-h-screen pb-2 dark:bg-neutral-200 dark:text-neutral-900">
      <div className="flex flex-col items-center justify-center w-[80%] h-auto m-5 p-4 rounded-2xl space-y-3 bg-neutral-700 dark:bg-neutral-300 text-neutral-50 dark:text-neutral-800">
        
        <div className="flex flex-row items-center justify-between w-full mb-5">
          <Link to={`/detailss/${bookId}`}>
            <FontAwesomeIcon icon={faChevronLeft} className="text-xl cursor-pointer" />
          </Link>
          <div className="font-bold text-3xl">New Entry</div>
          <FontAwesomeIcon icon={faPiggyBank} className="text-2xl" />
        </div>

        <Calendar24 value={date} onChange={setDate} showTime={false}/>
        {errors.date && (
          <p className="text-red-400 text-sm mt-1">{errors.date}</p>
        )}
        

        {/* <div className="flex flex-row justify-center gap-3 mt-3 w-full">
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
        </div> */}

        {/* {entryType === "withdrawal" && (
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
        )} */}

        {entryType === "deposit" && (
          <>
            <div className="mt-3 w-full">
              <div className="text-sm text-neutral-300 mb-2 font-bold dark:text-neutral-800">Type</div>
              <div className="flex flex-row justify-center gap-3 mt-3 w-full">
                <Button
                  type="button"
                  className={`w-[45%] ${depositMode === "onetime" ? "bg-purple-700 dark:bg-purple-800 text-neutral-50" : "bg-neutral-400 dark:bg-neutral-200 hover:bg-purple-300 text-neutral-800"}`}
                  onClick={() => setDepositMode("onetime")}
                >
                  One-Time
                </Button>
                <Button
                  type="button"
                  className={`w-[45%] ${depositMode === "recurring" ? "bg-purple-700 dark:bg-purple-800 text-neutral-50" : "bg-neutral-400 dark:bg-neutral-200 hover:bg-purple-300 text-neutral-800"}`}
                  onClick={() => setDepositMode("recurring")}
                >
                  Recurring
                </Button>
              </div>
            </div>

            <div className="mt-3 w-full">
              <div className="text-sm text-neutral-300 mb-2 font-bold dark:text-neutral-800">Amount <span className="text-red-500">*</span></div>
              <Input type="number" placeholder="Enter amount saved" value={amount}
              onChange={(e) => setAmount(e.target.value)} className="dark:bg-neutral-100" />
              {errors.amount && (
                <p className="text-red-400 text-sm mt-1">{errors.amount}</p>
              )}
            </div>
            <div className="mt-3 w-full">
              <div className="text-sm text-neutral-300 mb-2 font-bold dark:text-neutral-800">Description <span className="text-red-500">*</span></div>
              <Input type="text" placeholder="Savings purpose" value={description}
              onChange={(e) => setDescription(e.target.value)} className="dark:bg-neutral-100" />
              {errors.description && (
                <p className="text-red-400 text-sm mt-1">{errors.description}</p>
              )}
            </div>
            <div className="mt-3 w-full">
              <div className="text-sm text-neutral-300 mb-2 font-bold dark:text-neutral-800">Rate of Interest (%) <span className="text-red-500">*</span></div>
              <Input type="number" placeholder="Enter interest rate (p.a)" value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)} className="dark:bg-neutral-100" />
              {errors.interestRate && (
                <p className="text-red-400 text-sm mt-1">{errors.interestRate}</p>
              )}
            </div>

            {depositMode === "recurring" && (
              <div className="mt-3 w-full">
                <div className="text-sm text-neutral-300 mb-2 font-bold dark:text-neutral-800">Frequency <span className="text-red-500">*</span></div>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger className="dark:bg-neutral-100 w-full hover:cursor-pointer">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-neutral-100 dark:text-neutral-900">
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="halfyearly">Half Yearly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
                {errors.frequency && (
                  <p className="text-red-400 text-sm mt-1">{errors.frequency}</p>
                )}
              </div>
            )}
          </>
        )}

       <div className="flex flex-row justify-center mt-3 space-x-2 w-full">
          <Button type="submit" onClick={handleSubmit} className="w-[40%] bg-purple-950 dark:text-neutral-50">
            Add Entry
          </Button>
          <Button variant="default" onClick={() => navigate(-1)} className="hover:cursor-pointer w-[40%] bg-red-500 text-neutral-50">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddEntryS;