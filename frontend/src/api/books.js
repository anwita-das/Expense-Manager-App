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

export const getBookById = async (bookId) => {
  try {
    const response = await API.get(`/books/${bookId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    throw error;
  }
};

export const editBook = async (bookId, updatedData) => {
  try {
    const response = await API.put(`/books/${bookId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error editing book:", error);
    throw error;
  }
};

export const deleteBook = async (bookId) => {
  try {
    const response = await API.delete(`/books/${bookId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};