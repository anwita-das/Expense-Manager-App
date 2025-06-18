import BookCard from "./bookCard";

function BookList() {
    return(
        <>  
            <div className="flex flex-col justify-center items-center mt-3">
                <BookCard />
            </div>
        </>
    );
}

export default BookList;