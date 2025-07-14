import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';   
import { faChevronLeft, faPiggyBank} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSavingsById, updateSavings } from "@/api/savings";
import { validateSavingsEntry } from "../../utils/validation";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Calendar24 } from "@/components/Calendar24";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

function EntryDetailsS() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [entryType, setEntryType] = useState("onetime");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [frequency, setFrequency] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
        try {
            const data = await getSavingsById(id);
            setEntryType(data.saving_type);
            setAmount(data.amount);
            setDescription(data.description || "");
            setDate(data.date);
            setInterestRate(data.interest_rate);
            setFrequency((data.frequency || "").toLowerCase());
        } catch (err) {
            alert("Failed to fetch entry");
        } finally {
            setLoading(false);
        }
        };
        fetchData();
    }, [id]);

    const handleUpdate = async () => {
        const validationErrors = validateSavingsEntry({
            amount,
            interestRate,
            date,
            frequency,
            description,
        });

        setErrors(validationErrors);
        
        if (Object.keys(validationErrors).length > 0) return;
        try {
        await updateSavings(id, {
            saving_type: entryType,
            amount: parseFloat(amount),
            description,
            date,
            interest_rate: parseFloat(interestRate),
            frequency: entryType === "recurring" ? frequency : null,
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
                    <div className="font-bold text-3xl">Entry Details</div>
                    <FontAwesomeIcon icon={faPiggyBank} className="text-2xl" />
                </div>
                <Calendar24 value={date} onChange={(val) => setDate(val)} showTime={false} />
                {errors.date && (
                    <p className="text-red-400 text-sm mt-1">{errors.date}</p>
                )}
                <div className="flex flex-row justify-center gap-3 mt-2 w-full">
                    <Button
                    type="button"
                    className={`w-[45%] font-medium text-md ${
                        entryType === "onetime"
                        ? "bg-purple-500 hover:bg-purple-600 text-white"
                        : "bg-neutral-400 hover:bg-purple-400 hover:text-white text-black"
                    }`}
                    onClick={() => setEntryType("onetime")}
                    >
                    One-time
                    </Button>

                    <Button
                    type="button"
                    className={`w-[45%] font-medium text-md ${
                        entryType === "recurring"
                        ? "bg-purple-500 hover:bg-purple-600 text-white"
                        : "bg-neutral-400 hover:bg-purple-400 hover:text-white text-black"
                    }`}
                    onClick={() => setEntryType("recurring")}
                    >
                    Recurring
                    </Button>

                </div>
                <div className='mt-2 w-full'>
                    <div className='text-sm text-neutral-300 mb-2 ml-2 font-medium dark:text-neutral-800'>Amount <span className="text-red-500">*</span></div>
                    <Input className="dark:bg-neutral-200" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    {errors.amount && (
                        <p className="text-red-400 text-sm mt-1">{errors.amount}</p>
                    )}
                </div>
                <div className='mt-2 w-full'>
                    <div className='text-sm text-neutral-300 mb-2 ml-2 font-medium dark:text-neutral-800'>Description <span className="text-red-500">*</span></div>
                    <Input className="dark:bg-neutral-200" value={description} onChange={(e) => setDescription(e.target.value)} />
                    {errors.description && (
                        <p className="text-red-400 text-sm mt-1">{errors.description}</p>
                    )}
                </div>
                <div className='mt-2 w-full'>
                    <div className='text-sm text-neutral-300 mb-2 ml-2 font-medium dark:text-neutral-800'>Rate of Interest <span className="text-red-500">*</span></div>
                    <Input className="dark:bg-neutral-200" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
                    {errors.interestRate && (
                        <p className="text-red-400 text-sm mt-1">{errors.interestRate}</p>
                    )}
                </div>
                {entryType === "recurring" && (
                <div className="w-full">
                    <div className="text-sm text-neutral-300 mb-2 font-bold dark:text-neutral-800">Frequency <span className="text-red-500">*</span></div>
                    <Select value={frequency} onValueChange={setFrequency}>
                    <SelectTrigger className="dark:bg-neutral-100 w-full">
                        <SelectValue>
                        {{
                            monthly: "Monthly",
                            quarterly: "Quarterly",
                            halfyearly: "Half Yearly",
                            yearly: "Yearly"
                        }[frequency] || "Select frequency"}
                        </SelectValue>
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
                <div className="flex flex-row justify-center mt-3 space-x-2 w-full">
                <Button type="submit" onClick={handleUpdate} className="w-[40%] bg-purple-950 hover:bg-purple-400 dark:text-neutral-50">
                    Save Changes
                </Button>
                <Button variant="default" onClick={() => navigate(-1)} className="hover:cursor-pointer w-[40%] bg-red-500 hover:bg-red-300 text-neutral-50">
                    Cancel
                </Button>
                </div>
            </div>
        </div>
        </>
    );
}

export default EntryDetailsS;