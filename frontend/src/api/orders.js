import axios from "axios";

const API = "http://localhost:6969/api/orders";

const token = localStorage.getItem("token");
const headers = { Authorization: `Bearer ${token}` };

export const createOrder = (data) => axios.post(API, data, { headers });
export const getOrders = () => axios.get(API, { headers });
export const updateOrder = (id, data) =>
  axios.put(`${API}/${id}`, data, { headers });
export const deleteOrder = (id) => axios.delete(`${API}/${id}`, { headers });
