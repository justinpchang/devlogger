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
        Accept: "application/json",
        "Content-Type": "application/json",
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

    this.instance.interceptors.response.use(
      (config) => config,
      (error) => {
        if (
          error.response?.status === 401 &&
          (error.response.data.message === "User is not signed in" || !error.reponse.data.message)
        ) {
          Cookies.remove(JWT_COOKIE_NAME);
        }
        return Promise.reject(error);
      }
    );
  }

  public getJWT = () => {
    return Cookies.get(JWT_COOKIE_NAME);
  };
}

export const apiService = new ApiService(process.env.NEXT_PUBLIC_API_BASE_URL! + "/api/v1");
