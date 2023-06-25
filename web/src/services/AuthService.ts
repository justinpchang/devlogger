import axios, { AxiosInstance, AxiosResponse } from "axios";
import Cookies from "js-cookie";

export class AuthService {
  protected readonly instance: AxiosInstance;

  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Request timed out",
      headers: {
        Authorization: Cookies.get("jwt"),
      },
    });
  }

  public isLoggedIn = () => !!Cookies.get("jwt");

  public signup = async ({ email, password }: { email: string; password: string }) => {
    const response = await this.instance.post("/users", {
      user: {
        email,
        password,
      },
    });
    this.authenticate(response);
  };

  public login = async ({ email, password }: { email: string; password: string }) => {
    const response = await this.instance.post("/users/sign_in", {
      user: {
        email,
        password,
      },
    });
    this.authenticate(response);
  };

  public logout = async () => {
    await this.instance.delete("/users/sign_out");
    Cookies.remove("jwt");
    this.instance.defaults.headers.common["Authorization"] = null;
  };

  private authenticate = (response: AxiosResponse) => {
    const jwt = response.headers["authorization"];
    Cookies.set("jwt", jwt);
    this.instance.defaults.headers.common["Authorization"] = jwt;
  };
}

// TODO: Update with environment variable
export const authService = new AuthService("http://localhost:3000");
