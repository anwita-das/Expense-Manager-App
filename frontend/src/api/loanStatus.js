import API from "./api";

export const getLoanStatusByBookId = async (bookId) => {
  try {
    const response = await API.get(`/loans/${bookId}?skip=0&limit=1000`);
    return response;
  } catch (error) {
    console.error("Error fetching loan status:", error);
    throw error;
  }
};

export const createLoanStatus = async (loanData) => {
  try {
    const response = await API.post("/loans/create", loanData);
    return response.data;
  } catch (error) {
    console.error("Error creating loan status:", error);
    throw error;
  }
};