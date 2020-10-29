import { useState, useEffect } from "react";
import axios from "axios";

export const fetchUser = async (cookie = "") => {
  if (typeof window !== "undefined" && window.__user) {
    return window.__user;
  }

  const res = await fetch(
    "/api/me",
    cookie
      ? {
          headers: {
            cookie,
          },
        }
      : {}
  );

  if (!res.ok) {
    delete window.__user;
    return null;
  }

  const json = await res.json();
  if (typeof window !== "undefined") {
    window.__user = json;
  }

  return json;
};

export function useFetchUser({ required } = {}) {
  const [loading, setLoading] = useState(
    () => !(typeof window !== "undefined" && window.__user)
  );
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return window.__user || null;
  });

  useEffect(
    () => {
      if (!loading && user) {
        return;
      }
      setLoading(true);
      let isMounted = true;

      fetchUser().then((user) => {
        // Only set the user if the component is still mounted
        if (isMounted) {
          // When the user is not logged in but login is required
          if (required && !user) {
            window.location.href = "/sign-in";
            return;
          }
          setUser(user);
          setLoading(false);
        }
      });

      return () => {
        isMounted = false;
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return { user, loading };
}

export const updateUserPhoto = async ({ id, avatar }, token) => {
  const form = new FormData();
  form.append("files", avatar);

  const responseUploadFile = await axios({
    method: "POST",
    url: `${process.env.API}/upload`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: form,
  });

  console.log(responseUploadFile);

  if (responseUploadFile.status === 200) {
    const responseUpdateInfo = await axios({
      method: "PUT",
      url: `${process.env.API}/users/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        avatar: responseUploadFile.data[0],
      },
    });

    return {
      status: "success",
      statusCode: 200,
      data: {
        user: responseUpdateInfo,
      },
    };
  }

  return {
    status: "failed",
    statusCode: 401,
    message: "Unable to upload image",
  };
};
