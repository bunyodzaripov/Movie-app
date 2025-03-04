import axios from "axios";

const service = axios.create({
   baseURL: "https://api.themoviedb.org/3",
});

service.interceptors.request.use((config) => {
   const access_token = import.meta.env.VITE_TMDB_API_KEY;
   if (access_token) {
      config.headers["Authorization"] = `Bearer ${access_token}`;
   }

   return config;
});

export default service;
