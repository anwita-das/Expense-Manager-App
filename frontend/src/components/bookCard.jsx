import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuildingColumns, faMoneyBills, faPiggyBank } from '@fortawesome/free-solid-svg-icons'

function BookCard() {
    return (
        <>
        <div className="flex flex-row items-center w-[95%] bg-green-300 text-neutral-800 h-auto m-1 p-4 rounded-4xl space-x-2">
            <FontAwesomeIcon icon={faMoneyBills} className="text-2xl mr-3"/>
            <div className="flex flex-col justify-center space-y-1 w-full">
                <div className="flex flex-row justify-between">
                    <div className="font-medium text-xl mt-1">Trip to Manali</div>
                    <div className="text-md mt-1">Daily Expense</div>
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
        <div className="flex flex-row items-center w-[95%] bg-orange-300 text-neutral-800 h-auto m-1 p-4 rounded-4xl space-x-2">
            <FontAwesomeIcon icon={faBuildingColumns} className="text-2xl mr-3"/>
            <div className="flex flex-col justify-center space-y-1 w-full">
                <div className="flex flex-row justify-between">
                    <div className="font-medium text-xl mt-1">Education Loan</div>
                    <div className="text-md mt-1">Loan Status</div>
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
        <div className="flex flex-row items-center w-[95%] bg-blue-300 text-neutral-800 h-auto m-1 p-4 rounded-4xl space-x-2">
            <FontAwesomeIcon icon={faPiggyBank} className="text-2xl mr-3"/>
            <div className="flex flex-col justify-center space-y-1 w-full">
                <div className="flex flex-row justify-between">
                    <div className="font-medium text-xl mt-1">Savings Account</div>
                    <div className="text-md mt-1">Savings</div>
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