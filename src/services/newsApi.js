import axios from 'axios';

// TODO: declare this in a config file
// const apiKey = "84d7b5fc689d48bc863ad87b31c80d47";
const baseUrl = "https://newsapi.org/";
const baseVersion = "v2";

export const NewsApi = axios.create({
    baseURL: baseUrl + baseVersion
})