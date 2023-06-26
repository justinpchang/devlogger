import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

const JWT_COOKIE_NAME = "jwt";

export class ApiService {
  public readonly instance: AxiosInstance;

  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Request timed out",
      headers: {
        Authorization: Cookies.get(JWT_COOKIE_NAME),
      },
    });
  }

  public getJWT = () => {
    return Cookies.get(JWT_COOKIE_NAME);
  };

  public setJWT = (jwt: string) => {
    Cookies.set(JWT_COOKIE_NAME, jwt);
    this.instance.defaults.headers.common["Authorization"] = jwt;
  };

  public removeJWT = () => {
    Cookies.remove(JWT_COOKIE_NAME);
    this.instance.defaults.headers.common["Authorization"] = null;
  };
}

// TODO: Update with environment variable
export const apiService = new ApiService("http://localhost:3000/api/v1");
