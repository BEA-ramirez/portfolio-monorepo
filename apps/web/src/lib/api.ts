import axios from "axios";

export const api = axios.create({
  // production uses proxy, locally uses localhost 4000
  baseURL:
    process.env.NODE_ENV === "production"
      ? "/"
      : process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});
