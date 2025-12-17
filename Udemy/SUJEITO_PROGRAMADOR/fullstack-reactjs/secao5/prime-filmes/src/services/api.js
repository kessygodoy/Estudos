// BASE da URL: https://api.themoviedb.org/3/
//URL DA API: movie/now_playing?api_key=7584b297a707d572723b2d6d1b8ca2af&language=pt-BR

import axios from "axios";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    params: {
        api_key: "7584b297a707d572723b2d6d1b8ca2af",
        language: "pt-BR"
    }
});

export default api;
