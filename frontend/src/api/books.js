import API from "./api";

export const fetchBooks = async () => {
    try {
        const response = await API.get("/books");
        return response.data;
    } catch (error) {
        console.error("Error fetching books:" ,error);
        throw error;
    }
};

export const createBook = async (bookData) => {
    try {
        const response = await API.post("/books/create", bookData);
        return response.data;
    } catch (error) {
        console.error("Error creating book:", error);
        throw error;
    }
};

