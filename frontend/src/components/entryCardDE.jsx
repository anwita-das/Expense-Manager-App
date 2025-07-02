import { Link } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

function EntryCard({ amount, type, description, datetime, category, payment_method }) {
  const time = new Date(datetime).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const isCashOut = type === "cashout";

  return (
    <div className="flex flex-col space-y-2 bg-neutral-700 dark:bg-neutral-300 p-3 m-3 rounded-xl text-neutral-50 dark:text-neutral-800">
      <div className="flex flex-row justify-between w-full">
        <div className={isCashOut ? "text-red-400 font-bold" : "text-green-400 dark:text-green-600 font-bold"}>
          Rs. {amount}
        </div>
        <div className="flex flex-row space-x-2">
          <div className="font-medium">{description}</div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="">
                <MoreVertical className="h-4 w-4 hover:cursor-pointer" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link to="/edetailsde">
                <DropdownMenuItem className="hover:cursor-pointer">Edit</DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="hover:cursor-pointer">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row space-x-1 text-xs">
          <div className="bg-neutral-800 dark:bg-neutral-400 font-semibold pr-2 pl-2 pt-1 pb-1 rounded-2xl">
            {payment_method}
          </div>
          <div className="bg-neutral-800 dark:bg-neutral-400 font-semibold pr-2 pl-2 pt-1 pb-1 rounded-2xl">
            {category}
          </div>
        </div>
        <div className="text-sm">{time}</div>
      </div>
    </div>
  );
}

export default EntryCard;