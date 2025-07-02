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