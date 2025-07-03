import API from "./api";

export const getDailyExpensesByBookId = async (bookId) => {
  try {
    const response = await API.get(`/expenses/${bookId}`);
    return response;
  } catch (error) {
    console.error("Error fetching daily expenses:", error);
    throw error;
  }
};

export const createDailyExpense = async (expenseData) => {
  try {
    const response = await API.post("/expenses/create", expenseData);
    return response.data;
  } catch (error) {
    console.error("Error creating daily expense:", error);
    throw error;
  }
};

export const getDailyExpenseById = async (expenseId) => {
  try {
    const response = await API.get(`/expenses/entry/${expenseId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching expense by ID:", error);
    throw error;
  }
};

export const updateDailyExpense = async (expenseId, updatedData) => {
  try {
    const response = await API.put(`/expenses/${expenseId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating expense:", error);
    throw error;
  }
};

export const deleteDailyExpense = async (expenseId) => {
  try {
    const response = await API.delete(`/expenses/${expenseId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting expense:", error);
    throw error;
  }
};