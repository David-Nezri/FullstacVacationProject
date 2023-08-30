
import axios from "axios";
import { authStore } from "../Redux/AuthState";

const createInterceptorService = () => {
  const createInterceptor = () => {
    // On each request
    axios.interceptors.request.use((request) => {
      // If we have token
      if (authStore.getState().token) {
        // Attach it to the headers of the request
        request.headers = {
          "authorization": "Bearer " + authStore.getState().token,
        };
      }
      // Return the new request
      return request;
    });
  };

  return {
    createInterceptor,
  };
};

const interceptorService = createInterceptorService();

export default interceptorService;
