const BASE_URL = 'http://localhost:3005';
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  }).then((res) => {
    return getResponse(res);
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      password,
      email,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data;
      }
    });
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      headers,
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return getResponse(res);
  });
};

export const postDataUser = (data, jwt) => {
  return fetch(`${BASE_URL}/data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(data),
  })
  .then((res) => {
    return getResponse(res);
  });
};