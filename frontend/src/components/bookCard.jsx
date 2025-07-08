import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuildingColumns, faMoneyBills, faPiggyBank } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import dayjs from "dayjs";

function BookCard({ book }) {
    const { id, title, type, updated_at } = book;

    const getStyle = () => {
        switch(type) {
            case "Daily Expense":
                return { bg:"bg-green-300", icon: faMoneyBills };
            case "Loan Status":
                return { bg:"bg-orange-300", icon: faBuildingColumns };
            case "Savings":
                return { bg:"bg-blue-300", icon: faPiggyBank };
            default: 
                return { bg:"bg-gray-300", icon: faMoneyBills };
        }
    };
    const { bg, icon } = getStyle();

    return (
    <Link to={
    type === "Daily Expense" ? `/detailsde/${id}` :
    type === "Loan Status" ? `/detailsls/${id}` :
    type === "Savings" ? `/detailss/${id}` :
    `/detailsde/${id}`}>
      <div className={`flex flex-row items-center w-119 ${bg} text-neutral-800 h-20 m-1 p-4 rounded-tr-4xl rounded-bl-4xl space-x-2`}>
        <FontAwesomeIcon icon={icon} className="text-2xl mr-3" />
        <div className="flex flex-col justify-center w-full">
          <div className="flex flex-row justify-between">
            <div className="font-medium text-xl mt-2">{title}</div>
            <div className="text-md mt-2">{type}</div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="text-sm mt-1">Created on {dayjs(updated_at).format("MMMM D, YYYY")}</div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2">
                  <MoreVertical className="h-5 w-5 hover:cursor-pointer" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BookCard;