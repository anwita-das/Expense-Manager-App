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
  return (
    <>
      <div className="bg-neutral-800 dark:bg-neutral-300 min-h-screen">
        <div className="flex flex-row justify-between items-center p-3">
          <h1 className="text-4xl font-sans font-medium text-neutral-50 dark:text-neutral-900">
            My Books
          </h1>
          <Dialog>
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
                        className="text-black w-[32%] hover:bg-green-300 hover:cursor-pointer"
                      >
                        Daily Expenses
                      </Button>
                      <Button
                        type="button"
                        variant="default"
                        className="text-black w-[32%] hover:bg-orange-300 hover:cursor-pointer"
                      >
                        Loan Status
                      </Button>
                      <Button
                        type="button"
                        variant="default"
                        className="text-black w-[32%] hover:bg-blue-300 hover:cursor-pointer"
                      >
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

        <div className="w-full px-4 py-2">
          <Input
            type="text"
            placeholder="Search books..."
            className="w-full bg-neutral-300 text-neutral-800 dark:bg-neutral-200 dark:text-neutral-900"
          />
        </div>

        <BookList />

        <div className="fixed bottom-15 right-4 z-50">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-neutral-700 dark:bg-neutral-300 p-4 rounded-full shadow-lg">
                <Filter className="w-20 h-20 text-white dark:text-black" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 bg-neutral-300 dark:bg-neutral-100 text-black">
              <DropdownMenuItem>All</DropdownMenuItem>
              <DropdownMenuItem>Daily Expense</DropdownMenuItem>
              <DropdownMenuItem>Loan Status</DropdownMenuItem>
              <DropdownMenuItem>Savings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}

export default Books;
