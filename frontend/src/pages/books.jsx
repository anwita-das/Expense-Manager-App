import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";
import BookList from "@/components/bookList";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

function Books() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  return (
    <>
      <div className="bg-neutral-800 dark:bg-neutral-300 min-h-screen pb-10">
        <div className="flex flex-row justify-between items-center p-3">
          <h1 className="text-4xl font-sans font-medium text-neutral-50 dark:text-neutral-900">
            My Books
          </h1>
          <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) setSelectedType("");  // Reset when dialog is closed
          }}>
            <form>
              <DialogTrigger asChild>
                <Button className="bg-purple-900 hover:bg-purple-300 dark:text-neutral-50">+ Create New Book</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-neutral-800 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900">
                <DialogHeader>
                  <DialogTitle>Create a New Book</DialogTitle>
                  <DialogDescription className="text-neutral-200 dark:text-neutral-600">
                    Fill up the following details:
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="title">Book Title</Label>
                    <Input id="title" name="name" className={"dark:bg-neutral-300"} />
                  </div>
                  <div className="grid gap-3">
                    <Label>Book Type</Label>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="default"
                        onClick={() => setSelectedType("dailyexpense")}
                        className={`text-black w-[32%] dark:bg-neutral-300 hover:cursor-pointer dark:hover:bg-green-300 hover:bg-green-300 ${
                          selectedType === "dailyexpense" ? "bg-green-300 dark:bg-green-300" : "bg-neutral-400"
                        }`}>
                        Daily Expense
                      </Button>
                      <Button
                        type="button"
                        variant="default"
                        onClick={() => setSelectedType("loanstatus")}
                        className={`text-black w-[32%] dark:bg-neutral-300 hover:cursor-pointer dark:hover:bg-orange-300 hover:bg-orange-300 ${
                          selectedType === "loanstatus" ? "bg-orange-300 dark:bg-orange-300" : "bg-neutral-400"
                        }`}>
                        Loan Status
                      </Button>
                      <Button
                        type="button"
                        variant="default"
                        onClick={() => setSelectedType("savings")}
                        className={`text-black w-[32%] dark:bg-neutral-300 hover:cursor-pointer dark:hover:bg-blue-300 hover:bg-blue-300 ${
                          selectedType === "savings" ? "bg-blue-300 dark:bg-blue-300" : "bg-neutral-400"
                        }`}>
                        Savings
                      </Button>
                    </div>
                  </div>  
                  <div className="grid gap-3">
                    <Label htmlFor="description">Book Description</Label>
                    <Input id="description" name="username" className={"dark:bg-neutral-300"}/>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      variant="default"
                      className="hover:cursor-pointer bg-red-400 text-neutral-50"
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit" className="bg-purple-900 dark:text-neutral-50">
                    Add Book
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>
        
        <div className="sticky top-0 z-40 bg-transparent flex flex-row justify-between items-center w-full">
        <div className="w-full px-4 py-2">
          <Input
            type="text"
            placeholder="Search books..."
            className="w-full bg-neutral-300 text-neutral-800 dark:bg-neutral-200 dark:text-neutral-900"
          />
        </div>
        <div className="mr-3 mt-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-neutral-700 dark:bg-neutral-300 rounded-full shadow-lg">
                <Filter className="w-6 h-6 text-white dark:text-black" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 mr-5 bg-neutral-300 dark:bg-neutral-100 text-black">
              <DropdownMenuItem>All</DropdownMenuItem>
              <DropdownMenuItem>Daily Expense</DropdownMenuItem>
              <DropdownMenuItem>Loan Status</DropdownMenuItem>
              <DropdownMenuItem>Savings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        </div>

        <BookList />
      </div>
    </>
  );
}

export default Books;
