import axios from "axios";

const API = "http://localhost:6969/api/customers";

export const createCustomer = (data) => axios.post(API, data);
export const getCustomers = () => axios.get(API);
export const updateCustomer = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteCustomer = (id) => axios.delete(`${API}/${id}`);
