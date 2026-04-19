import axios from "axios";

const API = "http://localhost:6969/api/products";

const token = localStorage.getItem("token");
const headers = { Authorization: `Bearer ${token}` };

export const getProducts = () => axios.get(API, { headers });
export const createProduct = (data) => axios.post(API, data, { headers });
export const updateProduct = (id, data) =>
  axios.put(`${API}/${id}`, data, { headers });
export const deleteProduct = (id) => axios.delete(`${API}/${id}`, { headers });
