export const fetcher = (url) =>
  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        return Promise.resolve(res.json());
      }
      return Promise.resolve(res.json()).then((responseInJson) => {
        return Promise.reject(responseInJson.message);
      });
    })
    .then(
      (result) => {
        // console.log("success: ", result);
        return result;
      },
      (error) => {
        // console.log("Error: ", error);
        return error;
      }
    )
    .catch((err) => {
      // console.log("Catch: ", err);
    });

export const fetchWithToken = (url, token) =>
  fetch(`${process.env.API}/${url}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        return Promise.resolve(res.json());
      }
      return Promise.resolve(res.json()).then((responseInJson) => {
        return Promise.reject(responseInJson.message);
      });
    })
    .then(
      (result) => {
        return result;
      },
      (error) => {
        // console.log("Error: ", error);
        return error;
      }
    )
    .catch((err) => {
      // console.log("Catch: ", err);
    });
