import Cookies from "universal-cookie";

class FetchService {
  isofetch(url, data, type) {
    return fetch(`${process.env.API}${url}`, {
      body: JSON.stringify({ ...data }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: type,
    })
      .then((response) => response.json())
      .then(this.handleErrors)
      .catch((error) => {
        throw error;
      });
  }

  isofetchAuthed(url, token, type) {
    return fetch(`${process.env.API}${url}`, {
      method: type,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(this.handleErrors)
      .catch((error) => {
        throw error;
      });
  }

  handleErrors(response) {
    if (response === "TypeError: Failed to fetch") {
      throw Error("Server error.");
    }
    return response;
  }
}

export default new FetchService();
