import BookCard from "./bookCard";

function BookList({ books }) {
    return(
        <>  
            <div className="flex flex-col justify-center items-center mt-3">
                {books.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </>
    );
}

export default BookList;