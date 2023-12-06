import { parseJwt } from "./jwt";

export default class LoginData {
  constructor(token) {
    this.lastActivity = 0;

    if (!token) {
      this.token = null;
      this.tokenData = {
        user: {
          name: null,
          email: null,
          userLevel: "GUEST",
        }
      }

      return;
    }
    this.token = token;
    this.setLastActivity();
    this.tokenData = this.getDataFromToken();
  }

  setLastActivity() {
    const currentDate = new Date();
    this.lastActivity = currentDate.getTime();
  }

  getLastActivity() {
    return this.lastActivity;
  }

  getDataFromToken() {
    if (!this.token) {
      return null;
    }

    const tokenData = parseJwt(this.token);
    return {
      user: {
        name: tokenData.name,
        email: tokenData.email,
        userLevel: tokenData.userLevel,
      },
      token: {
        token: this.token,
        valid: tokenData.valid,
      },
    };
  }

  get() {
    return this.tokenData;
  }

  getToken() {
    return this.token;
  }

  getUserLevel() {
    return this.tokenData?.user?.userLevel;
  }
}
