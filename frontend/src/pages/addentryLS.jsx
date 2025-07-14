// import dayjs from "dayjs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faBuildingColumns } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { validateLoanEntry } from "../../utils/validation";
import { fetchCategories } from "@/api/categories";
import { createLoanStatus } from "@/api/loanStatus";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Calendar24 } from "@/components/Calendar24"

function AddEntryLS() {
    // const now = dayjs(); // current date & time
    // const dateOnly = now.format("DD MMM YYYY");
    // const timeOnly = now.format("HH:mm:ss");

    const navigate = useNavigate();

    const location = useLocation();
    const initialType = location.state?.type || "cashout";
    const { bookId } = useParams();
    const [categories, setCategories] = useState([]);
    const [entryType, setEntryType] = useState(initialType);
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [datetime, setDatetime] = useState(new Date().toISOString());
    const [category, setCategory] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = async () => {
        const validationErrors = validateLoanEntry({
              amount,
              category,
              description,
        });
        
        setErrors(validationErrors);
        
            // If any error exists, don't proceed
        if (Object.keys(validationErrors).length > 0) return;
    
        const payload = {
            book_id: bookId,
            entry_type: entryType,
            amount: parseFloat(amount),
            description,
            date: datetime,
            category,
        };
    
        try {
            await createLoanStatus(payload);
            navigate(`/detailsls/${bookId}`);
        } catch (err) {
            alert("Error creating entry.");
        }
    };

    useEffect(() => {
        if (location.state?.type) {
        setEntryType(location.state.type);
        }
    }, [location.state]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch (err) {
                alert("Failed to fetch categories");
            }
        };
        loadCategories();
    }, []);

    return(
        <>
        <div className="flex justify-center items-center bg-neutral-800 min-h-screen pb-2 dark:bg-neutral-200 dark:text-neutral-900">
            <div className="flex flex-col items-center justify-center w-[80%] h-auto p-4 rounded-2xl space-y-3 bg-neutral-700 dark:bg-neutral-300 text-neutral-50 dark:text-neutral-800">
                <div className="flex flex-row items-center justify-between w-full mb-5">
                    <Link to={`/detailsls/${bookId}`}>
                    <FontAwesomeIcon icon={faChevronLeft} className="text-xl cursor-pointer" />
                    </Link>
                    <div className="font-bold text-3xl">New Entry</div>
                    <FontAwesomeIcon icon={faBuildingColumns} className="text-2xl"/>
                </div>
            
                <Calendar24 value={datetime} onChange={(val) => setDatetime(val)} showTime={false} />
                
                <div className="flex flex-row justify-center gap-3 mt-3 w-full">
                    <Button
                        type="button"
                        className={`w-[45%] ${entryType === "emipayment" ? "bg-green-400 dark:bg-green-600" : "bg-neutral-400 dark:bg-neutral-200 hover:bg-green-300"} text-black`}
                        onClick={() => setEntryType("emipayment")}
                    >
                        EMI Payment
                    </Button>
                    <Button
                        type="button"
                        className={`w-[45%] ${entryType === "newloan" ? "bg-red-400 dark:bg-red-600" : "bg-neutral-400 dark:bg-neutral-200 hover:bg-red-300"} text-black`}
                        onClick={() => setEntryType("newloan")}
                    >
                        New Loan
                    </Button>
                </div>
                <div className='mt-3 w-full'>
                    <div className='text-sm text-neutral-300 mb-2 font-bold dark:text-neutral-800'>Amount (add interest for new loan) <span className="text-red-500">*</span></div>
                    <Input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder={"Enter the amount"} />
                    {errors.amount && (
                        <p className="text-red-400 text-sm mt-1">{errors.amount}</p>
                    )}
                </div>
                <div className='mt-3 w-full'>
                    <div className='text-sm text-neutral-300 mb-2 font-bold dark:text-neutral-800'>Description <span className="text-red-500">*</span></div>
                    <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder={"Enter a brief description"} />
                    {errors.description && (
                        <p className="text-red-400 text-sm mt-1">{errors.description}</p>
                    )}
                </div>
                <div className="mt-3 w-full">
                <div className="text-sm text-neutral-300 mb-2 font-bold dark:text-neutral-800">
                    Category <span className="text-red-500">*</span>
                </div>
                <Select onValueChange={setCategory}>
                    <SelectTrigger className="dark:bg-neutral-100 w-full hover:cursor-pointer">
                    <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-neutral-100 dark:text-neutral-900">
                    {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.name}>
                        {cat.name}
                        </SelectItem>
                    ))}
                    </SelectContent>

                </Select>
                {errors.category && (
                    <p className="text-red-400 text-sm mt-1">{errors.category}</p>
                )}
                </div>
                <div className="flex flex-row justify-center mt-3 space-x-2 w-full">
                    <Button type="submit" onClick={handleSubmit} className="w-[40%] bg-purple-950 dark:text-neutral-50">
                        Add Payment
                    </Button>
                    <Button
                      variant="default"
                      onClick={() => navigate(-1)}
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