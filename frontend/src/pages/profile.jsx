import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategories, createCategory, deleteCategory } from "@/api/categories";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { setTheme } from "@/lib/theme";
import { Link } from "react-router-dom"
import { Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

function Profile() {

    const [categoryName, setCategoryName] = useState("");
    const [categories, setCategories] = useState([]);
    const [isLightMode, setIsLightMode] = useState(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedCategoryToDelete, setSelectedCategoryToDelete] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
      fetchCategories()
        .then(setCategories)
        .catch((err) => console.error("Fetch failed", err));
    }, []);

    const handleAddCategory = async () => {
      if (!categoryName.trim()) return;
      try {
        const newCategory = await createCategory({ name: categoryName });
        setCategories((prev) => [...prev, newCategory]);
        setCategoryName("");
        setIsAddDialogOpen(false);
      } catch (error) {
        console.error("Add failed", error);
      }
    };

    const handleDeleteClick = (category) => {
      setSelectedCategoryToDelete(category);
      setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
      if(!selectedCategoryToDelete) return;
      try {
        await deleteCategory(selectedCategoryToDelete.id);
        setCategories((prev) => 
        prev.filter((cat) => cat.id != selectedCategoryToDelete.id)
      );
      setIsDeleteDialogOpen(false);
      setSelectedCategoryToDelete(null);
      } catch (error) {
        console.error("Delete Failed", error);
      }
    };

    useEffect(() => {
      const stored = localStorage.getItem("theme");
      setIsLightMode(stored === "light");
    }, []);

    const handleToggle = (checked) => {
      const newTheme = checked ? "light" : "dark";
      setIsLightMode(checked);
      setTheme(newTheme);
    };

  return (
    <div className="flex flex-col items-center bg-neutral-800 text-neutral-50 dark:bg-neutral-200 dark:text-neutral-900 min-h-screen">
      <div className="flex flex-col justify-center items-center p-3 space-y-4">
        <h1 className="text-4xl font-sans font-medium">Hello, Anwita!</h1>
        <Avatar className="w-40 h-40">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <label htmlFor="upload-photo">
          <Button variant="default" className="bg-purple-900 hover:bg-purple-300 text-white dark:text-white">Upload Photo</Button>
        </label>
      </div>

      <div className="w-[95%] h-auto bg-neutral-600 dark:bg-neutral-300 text-neutral-100 dark:text-neutral-900 m-2 rounded-4xl p-5 space-y-4">
        
        <div className="flex flex-row justify-between">
          <div className="text-md font-medium">Name:</div>
          <div className="font-bold text-lg">Anwita Das</div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="text-md font-medium">Email:</div>
          <div className="font-bold text-lg">anwita@example.com</div>
        </div>
      </div>

      <div className="w-[95%] h-auto bg-neutral-600 dark:bg-neutral-300 text-neutral-100 dark:text-neutral-900 m-2 rounded-4xl p-5">
        <div className="flex flex-row justify-between">
          <div className="text-lg font-medium">Currency Preference:</div>
          <div className="font-bold text-xl">INR</div>
        </div>
      </div>

      <div className="w-[95%] h-auto bg-neutral-600 dark:bg-neutral-300 text-neutral-100 dark:text-neutral-900 m-2 rounded-4xl p-5">
        <div className="flex flex-row justify-between items-center mb-4">
          <div className="text-lg font-medium">Manage categories:</div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-950 hover:bg-purple-400 text-white dark:text-white">
                + Add New Category
              </Button>
            </DialogTrigger>

            <DialogContent className={"flex flex-col w-sm bg-neutral-700 dark:bg-neutral-300 text-neutral-50 dark:text-neutral-800 border-none"}>
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription>
                  <div className="space-y-4 mt-4 w-full">
                    <div className="space-y-2 w-full">
                      <Label htmlFor="category" className="text-neutral-200 mb-4 ml-2 dark:text-neutral-800">
                        Category Name
                      </Label>
                      <Input
                        id="category"
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder="Enter your new category"
                        className="w-full bg-neutral-200 dark:bg-neutral-100 text-black"
                      />
                    </div>
                    <Button onClick={handleAddCategory} className="bg-purple-950 text-white hover:bg-purple-500">
                      Submit
                    </Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-row justify-between mb-2 bg-neutral-800 dark:bg-neutral-400 pl-3 pr-3 pt-2 pb-2 rounded-2xl"
          >
            <div className="text-lg font-medium">{cat.name}</div>
            {cat.user_id !== null && (
               <Dialog>
                  <DialogTrigger asChild>
                    <button onClick={() => handleDeleteClick(cat)} className="hover:text-red-600 hover:cursor-pointer">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </DialogTrigger>

                  <DialogContent className="flex flex-col items-center w-md p-5 bg-neutral-900 dark:bg-white text-white dark:text-black">
                    <DialogHeader>
                      <DialogTitle className={"text-2xl"}>Delete Category</DialogTitle>
                      <DialogDescription className={"text-md text-neutral-300 dark:text-neutral-800"}>
                        Are you sure you want to delete <strong>{selectedCategoryToDelete?.name}</strong>?
                        <br></br>This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-4 mt-4">
                      <Button
                        variant="default"
                        onClick={() => setIsDeleteDialogOpen(false)}
                        className="text-neutral-300 bg-purple-900 hover:bg-purple-500"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleConfirmDelete}
                        className="bg-red-600 text-white hover:bg-red-400"
                      >
                        Confirm
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
            )}
          </div>
        ))}
      </div>

      <div className="w-[95%] h-auto bg-neutral-600 dark:bg-neutral-300 text-neutral-100 dark:text-neutral-900 m-2 rounded-4xl p-5">
        <div className="flex flex-row justify-between items-center">
          <div className="text-lg font-medium">Dark Mode:</div>
          <Switch checked={isLightMode} onCheckedChange={handleToggle} />
        </div>
      </div>

      <div className="flex flex-row justify-between m-5 space-x-3 mb-15">
        <Link to="/editprof">
          <Button variant="default" className="w-32 bg-purple-900 text-white dark:text-white hover:bg-purple-300">
            Update Profile
          </Button>
        </Link>
        <Link to="/">
          <Button variant="default" className="w-32 bg-red-500 text-white hover:cursor-pointer hover:bg-red-200">
            Log Out
          </Button>
        </Link>
        <Button variant="default" className="w-[32%] bg-red-500 text-white hover:cursor-pointer hover:bg-red-200">
          Delete Account
        </Button>
      </div>
    </div>
  );
}

export default Profile;