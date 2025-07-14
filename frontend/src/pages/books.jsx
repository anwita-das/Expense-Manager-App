import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NoBooksState from "@/components/noBooksState";
import BookSkeleton from "@/components/bookSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Filter, Settings } from "lucide-react";
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
import { createBook, fetchBooks, editBook, deleteBook } from "@/api/books";
import Navbar from "@/components/navbar";

function Books() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  const [editBookId, setEditBookId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editSelectedType, setEditSelectedType] = useState("");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  const [loading, setLoading] = useState(true);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const data = await fetchBooks();
      setBooks(data);
    } catch (err) {
      console.error("Failed to load books", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleCreateBook = async (e) => {
    e.preventDefault();

    if(!title || !description || !selectedType) {
      alert("Please fill all fields");
      return;
    }
    const typeMap = {
      dailyexpense: "Daily Expense",
      loanstatus: "Loan Status",
      savings: "Savings",
    };
    try {
      await createBook({
        title: title,
        description,
        type: typeMap[selectedType],
      });

      setTitle("");
      setDescription("");
      setSelectedType("");
      setDialogOpen(false);
      loadBooks();
    } catch (err) {
        console.error("Failed to create book:", err);
        alert("Failed to create book.");
    }
  };

  const handleEditBook = async (e) => {
    e.preventDefault();
    const typeMap = { dailyexpense: "Daily Expense", loanstatus: "Loan Status", savings: "Savings" };
    try {
      await editBook(editBookId, { title: editTitle, description: editDescription, type: typeMap[editSelectedType] });
      setEditDialogOpen(false); loadBooks();
    } catch (err) {
      console.error("Failed to update book:", err); alert("Failed to update book.");
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await deleteBook(bookId);
      loadBooks();
    } catch (err) {
      console.error("Failed to delete book:", err);
    }
  };

  const filteredBooks = () => {
    return books.filter((book) => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === "All" || book.type === filterType;
      return matchesSearch && matchesType;
    });
  };

  return (
    <div className="bg-neutral-800 dark:bg-neutral-300 min-h-screen pb-10">
      <div className="flex flex-row justify-between items-center p-3">
        <h1 className="text-4xl font-sans font-medium text-neutral-50 dark:text-neutral-900">
          My Books
        </h1>
        <div className="flex items-center gap-3">
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) {
            setSelectedType("");
            setTitle("");
            setDescription("");
          }
        }}>
          <DialogTrigger asChild>
            <Button className="bg-purple-900 hover:bg-purple-300 dark:text-neutral-50">
              + Create New Book
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-neutral-800 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900">
            <DialogHeader>
              <DialogTitle>Create a New Book</DialogTitle>
              <DialogDescription className="text-neutral-200 dark:text-neutral-600">
                Fill up the following details:
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateBook}>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="title">Book Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="dark:bg-neutral-300"
                  />
                </div>
                <div className="grid gap-3">
                  <Label>Book Type</Label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      onClick={() => setSelectedType("dailyexpense")}
                      className={`text-black w-[32%] dark:bg-neutral-300 hover:bg-green-300 ${
                        selectedType === "dailyexpense"
                          ? "bg-green-300 dark:bg-green-300"
                          : "bg-neutral-400"
                      }`}
                    >
                      Daily Expense
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setSelectedType("loanstatus")}
                      className={`text-black w-[32%] dark:bg-neutral-300 hover:bg-orange-300 ${
                        selectedType === "loanstatus"
                          ? "bg-orange-300 dark:bg-orange-300"
                          : "bg-neutral-400"
                      }`}
                    >
                      Loan Status
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setSelectedType("savings")}
                      className={`text-black w-[32%] dark:bg-neutral-300 hover:bg-blue-300 ${
                        selectedType === "savings"
                          ? "bg-blue-300 dark:bg-blue-300"
                          : "bg-neutral-400"
                      }`}
                    >
                      Savings
                    </Button>
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">Book Description</Label>
                  <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="dark:bg-neutral-300"
                  />
                </div>
              </div>
              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="default"
                    className="bg-red-400 text-neutral-50"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" className="bg-purple-900 dark:text-neutral-50">
                  Add Book
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Link to="/settings">
          <Button className="bg-neutral-700 dark:bg-neutral-300 p-2 rounded-full" variant="default">
            <Settings className="w-5 h-5 text-white dark:text-black" />
          </Button>
        </Link>

        </div>
      </div>

      <div className="sticky top-0 z-40 bg-transparent flex flex-row justify-between items-center w-full">
        <div className="w-full px-4 py-2">
          <Input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-neutral-300 text-neutral-800 dark:border-2 dark:border-neutral-400 dark:bg-neutral-200 dark:text-neutral-900"
          />
        </div>
        <div className="mr-3 mt-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-neutral-700 dark:bg-neutral-300 rounded-full shadow-lg">
                <Filter className="w-6 h-6 text-white dark:text-black" />
                <span className="ml-1 text-sm">{filterType}</span>
              </Button>

            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 mr-5 bg-neutral-300 dark:bg-neutral-100 text-black">
              <DropdownMenuItem onClick={() => setFilterType("All")}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterType("Daily Expense")}>Daily Expense</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterType("Loan Status")}>Loan Status</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterType("Savings")}>Savings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {loading ? (
        <div className="px-3 mt-4 space-y-2">
          {[...Array(5)].map((_, i) => (
            <BookSkeleton key={i} />
          ))}
        </div>
      ) : books.length === 0 ? (
        <NoBooksState onCreateClick={() => setDialogOpen(true)} />
      ) : filteredBooks().length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10 text-center text-neutral-400 dark:text-neutral-600">
          <img
            src="/notFound.svg"
            alt="No results found"
            className="w-60 h-60 mb-4 opacity-100"
          />
          <p className="text-xl font-semibold mb-2">No matching results</p>
          <p className="text-sm">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <BookList
          books={filteredBooks()}
          onEdit={(book) => {
            setEditBookId(book.id);
            setEditTitle(book.title);
            setEditDescription(book.description);
            setEditSelectedType(
              book.type === "Daily Expense" ? "dailyexpense" :
              book.type === "Loan Status" ? "loanstatus" :
              "savings"
            );
            setEditDialogOpen(true);
          }}
          onDelete={(bookId) => {
            setBookToDelete(bookId);
            setDeleteDialogOpen(true);
          }}
        />
      )}


      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-neutral-800 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900">
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogDescription className="text-neutral-200 dark:text-neutral-600">Update book details below:</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditBook}>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="edit-title">Book Title</Label>
                <Input id="edit-title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="dark:bg-neutral-300" />
              </div>
              <div className="grid gap-3">
                <Label>Book Type</Label>
                <div className="flex gap-2">
                  {["dailyexpense", "loanstatus", "savings"].map(type => (
                    <Button key={type} type="button" onClick={() => setEditSelectedType(type)}
                      className={`text-black w-[32%] ${editSelectedType === type ? {
                        dailyexpense: "bg-green-300",
                        loanstatus: "bg-orange-300",
                        savings: "bg-blue-300"
                      }[type] : "bg-neutral-400"}`}>
                      {{ dailyexpense: "Daily Expense", loanstatus: "Loan Status", savings: "Savings" }[type]}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="edit-description">Description</Label>
                <Input id="edit-description" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} className="dark:bg-neutral-300" />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <DialogClose asChild><Button type="button" variant="default" className="bg-red-400 text-neutral-50">Cancel</Button></DialogClose>
              <Button type="submit" className="bg-purple-900 dark:text-neutral-50">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-neutral-900 dark:bg-white text-white dark:text-black">
          <DialogHeader>
            <DialogTitle>Delete Book</DialogTitle>
            <DialogDescription className={"text-neutral-400 dark:text-neutral-700"}>
              Are you sure you want to delete this book? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4 mt-4">
            <Button
              variant="default"
              onClick={() => setDeleteDialogOpen(false)}
              className="bg-purple-700 hover:bg-purple-500 text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                await handleDeleteBook(bookToDelete);
                setDeleteDialogOpen(false);
              }}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>


      <Navbar />
    </div>
  );
}

export default Books;