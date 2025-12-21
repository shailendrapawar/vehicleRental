import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      // fire global unauthorized event
      //todo :in main/root component add ths event listner while mounting and handle 
      window.dispatchEvent(new Event("unauthorized"));
    }

    return Promise.reject(error);
  }
);

export default api;
