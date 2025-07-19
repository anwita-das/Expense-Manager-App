import BookCard from "./bookCard";

function BookList({ books, onEdit, onDelete }) {
    return(
        <>  
            <div className="flex flex-col justify-center items-center mt-3">
                {books.map((book) => (
                    <BookCard key={book.id} book={book} onEdit={() => onEdit(book)} onDelete={() => onDelete(book.id)} />
                ))}
            </div>
        </>
    );
}

export default BookList;