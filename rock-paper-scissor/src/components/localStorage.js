const generateUserKey = (key) => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!loggedInUser || !loggedInUser.email) {
    throw new Error('User not logged in');
  }
  return `${loggedInUser.email}_${key}`;
};

export const saveToLocalStorage = (key, value) => {
  const userKey = generateUserKey(key);
  localStorage.setItem(userKey, JSON.stringify(value));
};

export const getFromLocalStorage = (key) => {
  const userKey = generateUserKey(key);
  const value = localStorage.getItem(userKey);
  return value ? JSON.parse(value) : null;
};

export const saveGeneralToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getGeneralFromLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

// export const clearUserData = (email) => {
//   Object.keys(localStorage).forEach((key) => {
//     if (key.startsWith(`${email}_`)) {
//       localStorage.removeItem(key);
//     }
//   });
// };
