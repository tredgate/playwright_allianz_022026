import { APIRequestContext } from "@playwright/test";

// src/api/tegb/user_api.ts
export class UserApi {
  readonly request: APIRequestContext;
  readonly apiUrl = "https://tegb-backend-877a0b063d29.herokuapp.com";

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async registerUser(username: string, password: string, email: string) {
    const response = await this.request.post(`${this.apiUrl}/tegb/register`, {
      data: {
        username,
        password,
        email,
      },
    });
    return response;
  }

  async loginUser(username: string, password: string) {
    const response = await this.request.post(`${this.apiUrl}/tegb/login`, {
      data: {
        username,
        password,
      },
    });
    return response;
  }

  async loginAndGetToken(username: string, password: string) {
    const response = await this.loginUser(username, password);
    const body = await response.json();
    return body.access_token as string;
  }
}
