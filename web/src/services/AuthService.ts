import { AxiosResponse } from "axios";
import { ApiService, JWT_COOKIE_NAME, apiService } from "./ApiService";
import Cookies from "js-cookie";

export class AuthService {
  protected readonly authApiService: ApiService;

  public constructor() {
    // TODO: Update with environment variable
    this.authApiService = new ApiService("http://localhost:3000");
  }

  public signup = async ({ email, password }: { email: string; password: string }) => {
    const response = await this.authApiService.instance.post("/users", {
      user: {
        email,
        password,
      },
    });
    this.setJWT(response);
  };

  public login = async ({ email, password }: { email: string; password: string }) => {
    const response = await this.authApiService.instance.post("/users/sign_in", {
      user: {
        email,
        password,
      },
    });
    this.setJWT(response);
  };

  public logout = async () => {
    await this.authApiService.instance.delete("/users/sign_out");
    this.clearJWT();
  };

  private setJWT = (response: AxiosResponse) => {
    const jwt = response.headers["authorization"];
    Cookies.set(JWT_COOKIE_NAME, jwt);
  };

  private clearJWT = () => {
    Cookies.remove(JWT_COOKIE_NAME);
  };
}

export const authService = new AuthService();
