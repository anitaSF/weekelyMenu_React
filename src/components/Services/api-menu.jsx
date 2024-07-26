import axios from "axios";

const APIHeaders = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": "Bearer token"
};

export const API = axios.create({
    baseURL: 'https://668acfdc2c68eaf3211de9ad.mockapi.io/app/',
    Headers: APIHeaders,
});
