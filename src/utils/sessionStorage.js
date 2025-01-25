export const setToSessionStorage = (key, token) => {
  if (!key || typeof window === undefined) {
    return;
  }
  console.log("called")
  return localStorage.setItem(key, JSON.stringify(token));
};

export const getFromSessionStorage = (key) => {
  if (!key || typeof window === "undefined") {
    return;
  }
  return JSON.parse(localStorage.getItem(key));
};

export const removeFromSessionStorage = (key) => {
  if (!key || typeof window === "undefined") return;

  return localStorage.removeItem(key);
};
