import axios from "axios";


export const axiosClient = axios.create({
    baseURL : 'https://expensetracker-xrjd.onrender.com'
})
