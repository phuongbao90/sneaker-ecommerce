import Cookies from "universal-cookie";
import FetchService from "services/FetchService";

export default class TokenService {
  saveToken(token) {
    const cookies = new Cookies();
    cookies.set("token", token, { path: "/" });
    return Promise.resolve();
  }

  removeToken() {
    const cookies = new Cookies();
    cookies.remove("token", { path: "/" });
    return Promise.resolve();
  }

  checkAuthToken(token) {
    return FetchService.isofetchAuthed("/users/me", token, "GET");
  }

  // validate the cookie in request header with the server
  async authenticateTokenSsr(ctx) {
    const cookies = new Cookies(ctx.req ? ctx.req.headers.cookie : null);
    const token = cookies.get("token");
    // console.log(token);
    const response = await this.checkAuthToken(token);
    // console.log(response);
    if (response.statusCode === 401) {
      // redirect to "/"
    }
  }
}
