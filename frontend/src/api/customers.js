import axios from "axios";

const API = "http://localhost:6969/api/customers";

const token = localStorage.getItem("token");
const headers = { Authorization: `Bearer ${token}` };

export const getCustomers = () => axios.get(API, { headers });
export const createCustomer = (data) => axios.post(API, data, { headers });
export const updateCustomer = (id, data) =>
  axios.put(`${API}/${id}`, data, { headers });
export const deleteCustomer = (id) => axios.delete(`${API}/${id}`, { headers });
