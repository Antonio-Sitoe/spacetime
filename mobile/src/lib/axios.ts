import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.43.84:3333",// cell
  // baseURL: "http://192.168.18.37:3333", // void
});
