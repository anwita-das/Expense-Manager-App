import { Link } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

function EntryCardLS({ id, amount, entry_type, description, date, category }) {
  const isNewLoan = entry_type === "newloan";

  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex flex-col space-y-2 bg-neutral-700 dark:bg-neutral-300 p-3 m-3 rounded-2xl text-neutral-50 dark:text-neutral-800">
      <div className="flex flex-row justify-between">
        <div className={isNewLoan ? "text-red-400 font-bold" : "text-green-400 dark:text-green-600 font-bold"}>
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
              <Link to="/edetailsls">
                <DropdownMenuItem className="hover:cursor-pointer">Edit</DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="hover:cursor-pointer">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex flex-row text-xs justify-between">
        <div className="bg-neutral-800 dark:bg-neutral-400 font-semibold pr-2 pl-2 pt-1 pb-1 rounded-2xl">
          {category}
        </div>
        <div className="text-sm">{formattedDate}</div>
      </div>
    </div>
  );
}

export default EntryCardLS;