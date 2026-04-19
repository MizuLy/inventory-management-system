import axios from "axios";

const API = "http://localhost:6969/api/orders";

export const createOrder = (data) => axios.post(API, data);
export const getOrders = () => axios.get(API);
export const updateOrder = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteOrder = (id) => axios.delete(`${API}/${id}`);
