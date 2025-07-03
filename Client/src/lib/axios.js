import axios from "axios";
import { handleError } from "./contant.js";

const url = import.meta.env.VITE_BACKEND_URL;

const instance = axios.create({
  baseURL: url,
  withCredentials: true,
});

export const handleRegister = async (data) => {
  try {
    const res = await instance.post("/auth/register", data);
    return res.data;
  } catch (error) {
    handleError();
  }
};

export const handleLogin = async (data) => {
  try {
    const res = await instance.post("/auth/login", data);
    return res.data;
  } catch (error) {
    handleError();
  }
};

export const handleLogout = async () => {
  try {
    const res = await instance.get("/auth/logout");
    return res.data;
  } catch (error) {
    handleError();
  }
};

export const handleVerify = async () => {
  try {
    const res = await instance.get("/auth/verify");
    return res.data;
  } catch (error) {
    handleError();
  }
};

export const handleGoogle = async (data) => {
  try {
    const res = await instance.post("/auth/google", data);
    return res.data;
  } catch (error) {
    handleError();
  }
};

export const handleRazorpayOrder = async (data) => {
  try {
    const res = await instance.post("/razorpay-order", data);
    return res.data;
  } catch (error) {
    handleError();
  }
};

export const handleRazorpayVerify = async (data) => {
  try {
    const res = await instance.post("/verifyOrder", data);
    return res.data;
  } catch (error) {
    handleError();
  }
};
