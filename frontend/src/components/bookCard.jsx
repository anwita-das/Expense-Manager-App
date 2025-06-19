import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuildingColumns, faMoneyBills, faPiggyBank } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

function BookCard() {
    return (
        <>
        <div className="flex flex-row items-center w-[95%] bg-green-300 text-neutral-800 h-20 m-1 p-4 rounded-4xl space-x-2">
            <FontAwesomeIcon icon={faMoneyBills} className="text-2xl mr-3"/>
            <div className="flex flex-col justify-center w-full">
                <div className="flex flex-row justify-between">
                    <Link to="/detailsde"><div className="font-medium text-xl mt-2">Trip to Manali</div></Link>
                    <div className="text-md mt-2">Daily Expense</div>
                </div>
                <div className="flex flex-row justify-between">
                    <div className="text-sm mt-1">Updated on: June 16, 2025</div>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="p-2">
                        <MoreVertical className="h-5 w-5 hover:cursor-pointer" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
        <div className="flex flex-row items-center w-[95%] bg-orange-300 text-neutral-800 h-20 m-1 p-4 rounded-4xl space-x-2">
            <FontAwesomeIcon icon={faBuildingColumns} className="text-2xl mr-3"/>
            <div className="flex flex-col justify-center w-full">
                <div className="flex flex-row justify-between">
                    <Link to="/detailsls"><div className="font-medium text-xl mt-2">Education Loan</div></Link>
                    <div className="text-md mt-2">Loan Status</div>
                </div>
                <div className="flex flex-row justify-between">
                    <div className="text-sm mt-1">Updated on: June 17, 2025</div>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="p-2">
                        <MoreVertical className="h-5 w-5 hover:cursor-pointer" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
        <div className="flex flex-row items-center w-[95%] bg-blue-300 text-neutral-800 h-20 m-1 p-4 rounded-4xl space-x-2">
            <FontAwesomeIcon icon={faPiggyBank} className="text-2xl mr-3"/>
            <div className="flex flex-col justify-center w-full">
                <div className="flex flex-row justify-between">
                    <Link to="/detailss"><div className="font-medium text-xl mt-2">Savings Account</div></Link>
                    <div className="text-md mt-2">Savings</div>
                </div>
                <div className="flex flex-row justify-between">
                    <div className="text-sm mt-1">Updated on: June 17, 2025</div>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="p-2">
                        <MoreVertical className="h-5 w-5 hover:cursor-pointer" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
        </>
    );
}

export default BookCard;