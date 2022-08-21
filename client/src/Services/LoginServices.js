import axios from "../Api/axiosSUS";

const LOGIN_URL = "/users/login";
const USER_URL = "users/user";
const BUS_URL = "businesses";

const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      LOGIN_URL,
      JSON.stringify({
        email: email,
        password: password,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const fetchBusinessData = async (token) => {
  try {
    const response = await axios.get(BUS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

const fetchRol = async (token) => {
  try {
    const response = await axios.get(USER_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response
  } catch (error) {
    return error
  }
};

export { loginUser, fetchBusinessData, fetchRol };
