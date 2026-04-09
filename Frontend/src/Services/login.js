import axios from "axios";
import { DEMO_AUTH_ENABLED, VITE_APP_URL } from "@/config/config";

const DEMO_USERS_STORAGE_KEY = "arb_demo_users";
const DEMO_ACTIVE_USER_STORAGE_KEY = "arb_demo_active_user";

const axiosInstance = axios.create({
  baseURL: VITE_APP_URL + "api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const toSafeEmail = (email = "") => email.trim().toLowerCase();

const createDemoResponse = (statusCode, data, message) => ({
  statusCode,
  data,
  message,
});

const getDemoUsers = () => {
  if (typeof window === "undefined") return [];

  try {
    const rawUsers = window.localStorage.getItem(DEMO_USERS_STORAGE_KEY);
    return rawUsers ? JSON.parse(rawUsers) : [];
  } catch (error) {
    console.log("Failed to parse demo users:", error.message);
    return [];
  }
};

const setDemoUsers = (users) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(DEMO_USERS_STORAGE_KEY, JSON.stringify(users));
};

const getDemoActiveUser = () => {
  if (typeof window === "undefined") return "";

  try {
    const rawUser = window.localStorage.getItem(DEMO_ACTIVE_USER_STORAGE_KEY);
    return rawUser ? JSON.parse(rawUser) : "";
  } catch (error) {
    console.log("Failed to parse demo active user:", error.message);
    return "";
  }
};

const setDemoActiveUser = (user) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(DEMO_ACTIVE_USER_STORAGE_KEY, JSON.stringify(user));
};

const clearDemoActiveUser = () => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(DEMO_ACTIVE_USER_STORAGE_KEY);
};

const createDemoUserPayload = ({ fullName = "", email = "" }) => {
  const normalizedEmail = toSafeEmail(email);
  const fallbackName = normalizedEmail.split("@")[0] || "Demo User";

  return {
    _id: normalizedEmail || String(Date.now()),
    fullName: fullName.trim() || fallbackName,
    email: normalizedEmail,
  };
};

const startUserWithDemoAuth = async () => {
  const activeUser = getDemoActiveUser();
  return createDemoResponse(200, activeUser || "", "Demo auth session loaded");
};

const registerUserWithDemoAuth = async (data) => {
  const normalizedEmail = toSafeEmail(data?.email || "");
  if (!normalizedEmail) {
    throw new Error("Email is required for sign up");
  }

  const users = getDemoUsers();
  const demoUser = createDemoUserPayload({
    fullName: data?.fullName || "",
    email: normalizedEmail,
  });

  const userRecord = {
    ...demoUser,
    password: data?.password || "",
  };

  const existingIndex = users.findIndex((user) => user.email === normalizedEmail);

  if (existingIndex >= 0) {
    users[existingIndex] = userRecord;
  } else {
    users.push(userRecord);
  }

  setDemoUsers(users);
  setDemoActiveUser(demoUser);

  return createDemoResponse(201, demoUser, "Demo sign up successful");
};

const loginUserWithDemoAuth = async (data) => {
  const normalizedEmail = toSafeEmail(data?.email || "");
  if (!normalizedEmail) {
    throw new Error("Email is required for sign in");
  }

  const users = getDemoUsers();
  let matchedUser = users.find((user) => user.email === normalizedEmail);

  // Demo behavior: allow sign-in for any email even if not registered yet.
  if (!matchedUser) {
    matchedUser = {
      ...createDemoUserPayload({ email: normalizedEmail }),
      password: data?.password || "",
    };
    users.push(matchedUser);
    setDemoUsers(users);
  }

  const activeUser = {
    _id: matchedUser._id,
    fullName: matchedUser.fullName,
    email: matchedUser.email,
  };

  setDemoActiveUser(activeUser);

  return createDemoResponse(200, activeUser, "Demo sign in successful");
};

const logoutUserWithDemoAuth = async () => {
  clearDemoActiveUser();
  return createDemoResponse(200, {}, "Demo logout successful");
};

const startUser = async () => {
  if (DEMO_AUTH_ENABLED) {
    return startUserWithDemoAuth();
  }

  try {
    const response = await axiosInstance.get("users/");
    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || error?.message || "Something Went Wrong"
    );
  }
};

const registerUser = async (data) => {
  if (DEMO_AUTH_ENABLED) {
    return registerUserWithDemoAuth(data);
  }

  try {
    const response = await axiosInstance.post("users/register/", data);
    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || error?.message || "Something Went Wrong"
    );
  }
};

const loginUser = async (data) => {
  if (DEMO_AUTH_ENABLED) {
    return loginUserWithDemoAuth(data);
  }

  try {
    const response = await axiosInstance.post("users/login/", data);
    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || error?.message || "Something Went Wrong"
    );
  }
};

const logoutUser = async () => {
  if (DEMO_AUTH_ENABLED) {
    return logoutUserWithDemoAuth();
  }

  try {
    const response = await axiosInstance.get("users/logout/");
    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || error?.message || "Something Went Wrong"
    );
  }
};

export { startUser, registerUser, loginUser, logoutUser };
