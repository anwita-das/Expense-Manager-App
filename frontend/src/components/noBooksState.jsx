import { Button } from "@/components/ui/button";

function NoBooksState({ onCreateClick }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 text-neutral-400 dark:text-neutral-700">
      <img
        src="/emptyBooks.svg" //
        alt="No books"
        className="w-55 mb-6"
      />
      <h2 className="text-2xl font-semibold mb-2 text-neutral-100 dark:text-neutral-900">
        No Books Found
      </h2>
      <p className="mb-6 max-w-md text-sm text-neutral-400 dark:text-neutral-600">
        You haven’t created any books yet. Start by creating your first financial record book!
      </p>
      <Button
        onClick={onCreateClick}
        className="bg-purple-800 hover:bg-purple-600 text-white"
      >
        + Create Your First Book
      </Button>
    </div>
  );
}

export default NoBooksState;