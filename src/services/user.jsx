import { axiosInstance as axios } from "./axios";

export const getAllUsers = async (page, selectedOption) => {
  let gender = selectedOption ? selectedOption.value : "";

  try {
    const data = await axios({
      url: `?page=${page}&results=10&gender=${gender}`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
};
