import { AxiosResponse } from "axios";
import { ApiService, JWT_COOKIE_NAME } from "./ApiService";
import Cookies from "js-cookie";

export class AuthService {
  protected readonly authApiService: ApiService;

  public constructor() {
    this.authApiService = new ApiService(process.env.NEXT_PUBLIC_API_BASE_URL!);
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
