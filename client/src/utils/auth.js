import * as jwt_decode from "jwt-decode";

export const isTokenExpired = (token) => {
  try {
    const decoded = jwt_decode.default(token);

    if (decoded.exp * 1000 < Date.now()) {
      return true; 
      console.log("expired")// expired
    }
    console.log("valid")// expired
    return false; // valid
  } catch (error) {
    console.log(error)// expired
    return true; // invalid token
  }
};
