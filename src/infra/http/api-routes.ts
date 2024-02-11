import axios from "axios";

export const apiRoutesClient = axios.create({
  baseURL: "/api",
});
