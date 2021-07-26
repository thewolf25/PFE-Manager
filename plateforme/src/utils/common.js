//Import cookie from 'react-cookie'

export const getUser = () => {
  const userStr = sessionStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);
  else return null;
};

// Return the token datauserconnecte from the session storage
export const getToken = () => {
  return sessionStorage.getItem("token") || null;
};

// Remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
};

// Set the token and user from the session storage
//cookies
export const setUserSession = (token, user) => {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("user", JSON.stringify(user));
};

// Auth enticate user by passing data to cookie and localstorage during signin
