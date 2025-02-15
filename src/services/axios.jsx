import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://randomuser.me/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
