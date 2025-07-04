import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';   
import { faChevronLeft, faMoneyBills } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { useParams, useNavigate } from "react-router-dom";
import { getDailyExpenseById, updateDailyExpense } from "@/api/dailyExpense";
import { fetchCategories } from "@/api/categories";
import { Input } from "@/components/ui/input";
import { Calendar24 } from "@/components/Calendar24";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

function EntryDetailsDE() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const [entryType, setEntryType] = useState("cashout");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [datetime, setDatetime] = useState("");
    const [category, setCategory] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");

    useEffect(() => {
        const fetchData = async () => {
        try {
            const data = await getDailyExpenseById(id);
            setEntryType(data.type);
            setAmount(data.amount);
            setDescription(data.description);
            setDatetime(data.datetime);
            setCategory(data.category);
            setPaymentMethod(data.payment_method);
        } catch (err) {
            alert("Failed to fetch entry");
        } finally {
            setLoading(false);
        }
        };
        fetchData();

        const loadCategories = async () => {
        const data = await fetchCategories();
        setCategories(data);
        };
        loadCategories();
    }, [id]);

    const handleUpdate = async () => {
        try {
        await updateDailyExpense(id, {
            type: entryType,
            amount: parseFloat(amount),
            description,
            datetime,
            category,
            payment_method: paymentMethod,
        });
        navigate(-1);
        } catch (err) {
        alert("Failed to update entry");
        }
    };

    return(
        <>
        <div className="flex justify-center items-center bg-neutral-800 min-h-screen pb-2 dark:bg-neutral-200 dark:text-neutral-900">
            <div className="flex flex-col items-center justify-center w-[90%] h-auto m-5 p-4 rounded-2xl space-y-2 bg-neutral-600 dark:bg-neutral-300 text-neutral-50 dark:text-neutral-800">
                <div className="flex flex-row items-center justify-between w-full mb-5">
                    
                    <FontAwesomeIcon icon={faChevronLeft} className="text-xl cursor-pointer" onClick={() => navigate(-1)} />
                    
                    <div className="font-bold text-3xl">Edit Entry Details</div>
                    <FontAwesomeIcon icon={faMoneyBills} className="text-2xl" />
                </div>
                <Calendar24 value={datetime} onChange={(val) => setDatetime(val)} />
                <div className="flex flex-row justify-center gap-3 mt-2 w-full">
                    <Button
                        type="button"
                        className={`w-[45%] font-bold text-lg ${entryType === "cashin" ? "bg-green-500 hover:bg-green-600" : "bg-neutral-400 hover:bg-green-400"} text-black`}
                        onClick={() => setEntryType("cashin")}
                    >
                        Cash-IN
                    </Button>
                    <Button
                        type="button"
                        className={`w-[45%] font-bold text-lg ${entryType === "cashout" ? "bg-red-500 hover:bg-red-600" : "bg-neutral-400 hover:bg-red-400"} text-black`}
                        onClick={() => setEntryType("cashout")}
                    >
                        Cash-OUT
                    </Button>
                </div>
                <div className='w-full'>
                    <div className='text-sm text-neutral-300 mb-2 font-bold dark:text-neutral-800'>Amount</div>
                    <Input className={"dark:bg-neutral-200"} value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div className='w-full'>
                    <div className='text-sm text-neutral-300 mb-2 font-bold dark:text-neutral-800'>Description</div>
                    <Input className={"dark:bg-neutral-200"} value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="w-full">
                    <div className="text-sm text-neutral-300 mb-2 font-bold dark:text-neutral-800">Category</div>
                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="dark:bg-neutral-100 w-full">
                        <SelectValue placeholder="Select category"/>
                        </SelectTrigger>
                        <SelectContent className="dark:bg-neutral-100 dark:text-neutral-900">
                        {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.name}>
                            {cat.name}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-full">
                    <div className="text-sm text-neutral-300 mb-2 font-bold dark:text-neutral-800">Payment Method</div>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                        <SelectTrigger className="dark:bg-neutral-100 w-full">
                        <SelectValue placeholder="Select payment mode" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-neutral-100 dark:text-neutral-900">
                        <SelectItem value="Online">Online</SelectItem>
                        <SelectItem value="Offline">Offline</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-row justify-center mt-3 space-x-2 w-full">
                    <Button type="submit" onClick={handleUpdate} className="w-[40%] bg-purple-950 hover:bg-purple-400 dark:text-neutral-50">
                        Save Changes
                    </Button>
                    <Button
                        variant="default"
                        onClick={() => navigate(-1)}
                        className="hover:cursor-pointer w-[40%] bg-red-500 hover:bg-red-300 text-neutral-50"
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
        </>
    );
}

export default EntryDetailsDE;