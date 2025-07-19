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

export const getLoanStatusById = async (loanId) => {
  try {
    const response = await API.get(`/loans/entry/${loanId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching loan entry by ID:", error);
    throw error;
  }
};

export const updateLoanStatus = async (loanId, updatedData) => {
  try {
    const response = await API.put(`/loans/${loanId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating loan status:", error);
    throw error;
  }
};

export const deleteLoanStatus = async (loanId) => {
  try {
    const response = await API.delete(`/loans/${loanId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting loan status:", error);
    throw error;
  }
};