import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

export const JWT_COOKIE_NAME = "jwt";

export class ApiService {
  public readonly instance: AxiosInstance;

  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Request timed out",
      headers: {
        Authorization: this.getJWT(),
      },
    });

    this.instance.interceptors.request.use(
      (config) => {
        const jwt = this.getJWT();
        if (jwt) {
          config.headers["Authorization"] = jwt;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  public getJWT = () => {
    return Cookies.get(JWT_COOKIE_NAME);
  };
}

// TODO: Update with environment variable
export const apiService = new ApiService("http://localhost:3000/api/v1");
