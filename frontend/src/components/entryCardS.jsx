import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDot, faRepeat, faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { calculateGrowth } from "../../utils/calculateGrowth";

function EntryCardS({
    id,
    amount,
    saving_type,
    frequency,
    date,
    description,
    interest_rate,
    onDelete,
    }) {
    
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    
    const grownAmount = calculateGrowth({ amount, rate: interest_rate, date, frequency });
    return (
    <div className="flex flex-row items-center justify-center bg-neutral-700 space-y-2 p-3 m-3 rounded-2xl text-neutral-50 dark:bg-neutral-300 dark:text-neutral-800">
      
        <div className="mr-3 mt-2 text-blue-300 dark:text-blue-400">
            <FontAwesomeIcon icon={saving_type === "onetime" ? faCircleDot : faRepeat} className="text-xl" />
        </div>

        <div className="flex flex-col w-full space-y-1">
            <div className="flex flex-row justify-between w-full">
            <div className="font-bold">Rs. {amount}</div>
            <div className="font-bold text-green-500 dark:text-green-600"><span><FontAwesomeIcon icon={faArrowTrendUp} /></span> Rs. {isNaN(grownAmount) ? "0.00" : grownAmount}</div>
            <div className="text-md font-semibold">{`ROI : ${interest_rate ?? 0}%`}</div>
        </div>

        <div className="flex flex-row justify-between w-full">
            <div className={`${
                !frequency ? "bg-neutral-700" : "bg-neutral-800 dark:bg-neutral-400"
                } text-xs font-semibold pr-2 pl-2 pt-1 pb-1 rounded-2xl`}>
                {{
                    daily: "Daily",
                    weekly: "Weekly",
                    monthly: "Monthly",
                    quarterly: "Quarterly",
                    halfyearly: "Half Yearly",
                    yearly: "Yearly",
                }[frequency] || frequency}
            </div>
            <div className="flex flex-row space-x-1">
            <div className="font-sm italic">{description}</div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button>
                        <MoreVertical className="h-4 w-4 mt-1 hover:cursor-pointer" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <Link to={`/edetailss/${id}`}>
                        <DropdownMenuItem className="hover:cursor-pointer">
                        Edit
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                        className="text-red-500 hover:cursor-pointer"
                        onClick={(e) => {
                        e.preventDefault();
                        setIsDeleteDialogOpen(true);
                        }}
                    >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </div>
        </div>
    </div>
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-neutral-900 dark:bg-white text-white dark:text-black">
          <DialogHeader>
            <DialogTitle>Delete Entry</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this entry? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4 mt-4">
            <Button
              variant="default"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="bg-gray-700 dark:bg-gray-200"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onDelete(id);
                setIsDeleteDialogOpen(false);
              }}
              className="bg-red-600 text-white"
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EntryCardS;
