import API from "./api";

export const updateUserProfile = async (profileData) => {
  try {
    const response = await API.put("/auth/update-profile", profileData);
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const fetchUserProfile = async () => {
  try {
    const response = await API.get("/auth/profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export const uploadProfilePhoto = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await API.put("/auth/upload-photo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading profile photo:", error);
    throw error;
  }
};

export const deleteProfilePhoto = async () => {
  try {
    const response = await API.delete("/auth/delete-photo");
    return response.data;
  } catch (error) {
    console.error("Error deleting profile photo:", error);
    throw error;
  }
};