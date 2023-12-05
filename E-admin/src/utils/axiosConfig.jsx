const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const config = {
  headers: {
    Authorization: getTokenFromLocalStorage
      ? `Bearer ${getTokenFromLocalStorage.token}`
      : null,
    Accept: "application/json",
  },
};
