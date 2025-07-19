import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isValidCategoryName } from "../../utils/validation";
import { fetchCategories, createCategory, deleteCategory } from "@/api/categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function Settings() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategoryToDelete, setSelectedCategoryToDelete] = useState(null);
  const [categoryError, setCategoryError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch((err) => console.error("Failed to load categories:", err));
  }, []);

  const handleAddCategory = async () => {
    if (!isValidCategoryName(categoryName)) {
      setCategoryError("Category name must be max 30 characters and only letters, numbers, or spaces.");
      return;
    }
    try {
      const newCategory = await createCategory({ name: categoryName });
      setCategories((prev) => [newCategory, ...prev]); // Newest on top
      setCategoryName("");
      setIsAddDialogOpen(false);
      setCategoryError("");
    } catch (error) {
      console.error("Add failed", error);
      setCategoryError("Failed to add category. It may already exist.");
    }
  };

  const handleDeleteClick = (category) => {
    setSelectedCategoryToDelete(category);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCategoryToDelete) return;
    try {
      await deleteCategory(selectedCategoryToDelete.id);
      setCategories((prev) =>
        prev.filter((cat) => cat.id !== selectedCategoryToDelete.id)
      );
      setIsDeleteDialogOpen(false);
      setSelectedCategoryToDelete(null);
    } catch (error) {
      console.error("Delete Failed", error);
      alert("Failed to delete category.");
    }
  };

  return (
    <div className="bg-neutral-800 dark:bg-neutral-200 text-neutral-50 dark:text-neutral-900 min-h-screen px-6 py-5">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold">Settings</h1>
        <Button onClick={() => navigate(-1)} className="bg-purple-900 hover:bg-purple-700 text-white dark:text-white">
          Back
        </Button>
      </div>

      <div className="bg-neutral-700 dark:bg-neutral-300 rounded-3xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Manage Categories</h2>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-800 hover:bg-purple-500 text-white dark:text-white">
                + Add Category
              </Button>
            </DialogTrigger>
            <DialogContent className="w-md bg-neutral-800 dark:bg-white text-white dark:text-black border-none">
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription className="mt-2">
                  <Label htmlFor="category" className="mb-3 text-neutral-200 dark:text-neutral-600">
                    Category Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="category"
                    type="text"
                    value={categoryName}
                    onChange={(e) => {
                      setCategoryName(e.target.value);
                      if (categoryError) setCategoryError(""); // clear error on change
                    }}
                    placeholder="Enter new category"
                    className="bg-neutral-300 text-black"
                  />
                  {categoryError && (
                    <p className="text-red-500 text-sm mt-1">{categoryError}</p>
                  )}
                </DialogDescription>
                <div className="mt-4">
                  <Button
                    onClick={handleAddCategory}
                    className="bg-purple-900 text-white hover:bg-purple-600"
                    disabled={!categoryName.trim()}
                  >
                    Submit
                  </Button>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        {categories.length > 0 ? (
          <div className="space-y-2">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="flex justify-between items-center bg-neutral-800 dark:bg-neutral-400 px-4 py-2 rounded-2xl"
              >
                <span className="text-lg font-medium">{cat.name}</span>
                {cat.user_id !== null && (
                  <button
                    onClick={() => handleDeleteClick(cat)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-neutral-400">No categories yet.</p>
        )}
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-neutral-900 dark:bg-white text-white dark:text-black">
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <strong>{selectedCategoryToDelete?.name}</strong>? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4 mt-4">
            <Button
              variant="ghost"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="bg-gray-700 dark:bg-gray-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
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

export default Settings;
