import API from "./api";

export const getSavingsByBookId = async (bookId) => {
  try {
    const response = await API.get(`/savings/${bookId}?skip=0&limit=1000`);
    return response;
  } catch (error) {
    console.error("Error fetching savings:", error);
    throw error;
  }
};

export const createSavings = async (savingsData) => {
  try {
    const response = await API.post("/savings/create", savingsData);
    return response.data;
  } catch (error) {
    console.error("Error creating savings entry:", error);
    throw error;
  }
};

export const getSavingsById = async (savingsId) => {
  try {
    const response = await API.get(`/savings/entry/${savingsId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching savings by ID:", error);
    throw error;
  }
};

export const updateSavings = async (savingsId, updatedData) => {
  try {
    const response = await API.put(`/savings/${savingsId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating savings:", error);
    throw error;
  }
};

export const deleteSavings = async (savingsId) => {
  try {
    const response = await API.delete(`/savings/${savingsId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting savings:", error);
    throw error;
  }
};