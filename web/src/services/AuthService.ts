import { AxiosResponse } from "axios";
import { ApiService, apiService } from "./ApiService";

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
    this.authenticate(response);
  };

  public login = async ({ email, password }: { email: string; password: string }) => {
    const response = await this.authApiService.instance.post("/users/sign_in", {
      user: {
        email,
        password,
      },
    });
    this.authenticate(response);
  };

  public logout = async () => {
    await this.authApiService.instance.delete("/users/sign_out");
    apiService.removeJWT();
    this.authApiService.removeJWT();
  };

  private authenticate = (response: AxiosResponse) => {
    const jwt = response.headers["authorization"];
    apiService.setJWT(jwt);
    this.authApiService.setJWT(jwt);
  };
}

export const authService = new AuthService();
