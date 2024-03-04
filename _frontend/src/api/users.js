const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log(BASE_URL);

export async function signUp(userData) {
  const createURL = BASE_URL + "/users/create";
  console.log(createURL);
  const res = await fetch(createURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (res.ok) {
    console.log(res);
    return res.json();
  } else {
    throw new Error("Invalid Sign Up");
  }
}

export async function getLoginDetails(email) {
  const searchParams = new URLSearchParams({ email: email });
  const getLoginDetailsURL = BASE_URL + "/users/login?" + searchParams;
  console.log(getLoginDetailsURL);
  const res = await fetch(getLoginDetailsURL, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    console.log(res);
    return res.json();
  } else {
    throw new Error("Invalid User");
  }
}

export async function storeToken(userData) {
  const createURL = BASE_URL + "/storeToken";
  console.log(createURL);
  const res = await fetch(createURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (res.ok) {
    console.log(res);
    return res.json();
  } else {
    throw new Error("Invalid Token");
  }
}

export async function loginUser(userData) {
  const loginURL = BASE_URL + "/users/login";
  console.log(loginURL);
  const res = await fetch(loginURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  // Check if request was successful
  if (res.ok) {
    // res.json() will resolve to the JWT
    console.log(res);
    return res.json();
  } else {
    throw new Error("Invalid Login");
  }
}

export async function logoutUser(token, userData) {

  const logoutURL = BASE_URL + "/users/logout";

  const res = await fetch(logoutURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (res.ok) {
    console.log(res);
    return;
  } else {
    throw new Error("Invalid Logout");
  }
}

export async function userUpdate(userData) {
  // Fetch uses an options object as a second arg to make requests
  // other than basic GET requests, include data, headers, etc.
  const createURL = BASE_URL + "/users/update";
  // console.log(createURL);
  const res = await fetch(createURL, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    // Fetch requires data payloads to be stringified
    // and assigned to a body property on the options object
    body: JSON.stringify(userData),
  });
  // Check if request was successful
  if (res.ok) {
    // res.json() will resolve to the JWT
    console.log(res);
    return res.json();
  } else {
    throw new Error("Invalid Update");
  }
}
