import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:3345",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
