import axios from "axios";
import Cookies from "js-cookie";
import _ from "lodash";
import { mutate } from "swr";

export const signup = async ({ email, username, password }) => {
  const {
    data: { jwt, user },
    status,
  } = await axios.post(
    `${process.env.API}/auth/local/register`,
    {
      email: email,
      username: username,
      password: password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (status === 400) {
    return {
      code: status,
      message: res.data.messages[0].message,
      errors: res.data.messages,
    };
  }

  if (jwt) {
    Cookies.set("token", jwt, { path: "/" });
  }

  return {
    code: 200,
    message: "User created successfully.",
    data: {
      username: username,
      email: user.email,
      userId: user.id,
    },
  };
};

export async function getUserInfo() {
  const user = await axios.get(
    `${process.env.API}/users/me`,
    {},
    {
      headers: {
        Authorization: "Bearer " + Cookies.get("token"),
      },
    }
  );
}

export async function createCart(userId) {
  // console.log(userId);
  const response = await axios({
    method: "POST",
    url: `${process.env.API}/carts`,
    headers: {
      Authorization: "Bearer " + Cookies.get("token"),
    },
    data: {
      user: userId,
    },
  });

  // console.log(response);

  return {
    response,
  };
}

export async function createPurchaseHistory(userId) {
  const response = await axios({
    method: "POST",
    url: `${process.env.API}/purchases`,
    headers: {
      Authorization: "Bearer " + Cookies.get("token"),
    },
    data: {
      user: userId,
    },
  });

  return {
    response,
  };
}

export async function addOrderToCart(order) {
  const {
    status,
    data: { cart, message },
  } = await axios({
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + Cookies.get("token"),
    },
    url: `${process.env.API}/carts/addItem`,
    data: {
      order,
    },
  });

  if (status !== 200) {
    return {
      message: "Unable to add/update cart",
      status,
    };
  }

  if (status === 200) {
    return {
      cart,
      message,
      status,
    };
  }
}

/*
  expected request formats
  order: [number, number, number]
*/
export async function removeCartItem(order) {
  const { status, cart, message } = await axios({
    method: "PUT",
    url: `${process.env.API}/carts/removeItem`,
    headers: {
      Authorization: "Bearer " + Cookies.get("token"),
      "Content-Type": "application/json",
    },
    data: {
      order,
    },
  });

  if (status === 200) {
    mutate(["users/me", Cookies.get("token")], false);
  }
  return { status, cart, message };
}

/*
  expected request formats
  orders: [{sneaker:{id: number}, size: number, quantity: number}, {}]
*/

export async function removeOrderFromCart() {
  await axios({
    method: "POST",
    url: `${process.env.API}`,
  });
}

export async function getPurchaseHistory({ purchaseId }) {
  const res = await axios({
    method: "GET",
    url: `${process.env.API}/purchases/${purchaseId}`,
    headers: {
      Authorization: "Bearer " + Cookies.get("token"),
      "Content-Type": "application/json",
    },
  });

  if (res.status === 200) {
    return {
      items: res.data.items,
    };
  } else {
    return {
      items: [],
    };
  }
}

export async function fetchBestsellers() {
  const { data, status } = await axios.get(
    `${process.env.API}/sneakers?_sort=sold:DESC&_limit=3`
  );

  // console.log(data);

  if (status === 200) {
    return {
      items: data,
    };
  } else {
    return {
      items: [],
    };
  }
}

export async function forgotPassword(email) {
  const res = await axios.post(`${process.env.API}/auth/forgot-password`, {
    email,
  });
}

export async function resetPassword({
  resetCode,
  password,
  passwordConfirmation,
}) {
  const res = await axios.post(`${process.env.API}/auth/reset-password`, {
    code: resetCode,
    password: password,
    passwordConfirmation: passwordConfirmation,
  });

  return {
    res,
  };
}

export async function subscribe(subscriberEmail) {
  const { id, email } = await axios.post(`${process.env.API}/subscriptions`, {
    email: subscriberEmail,
  });
  return {
    id,
    email,
  };
}

export async function verifyCaptcha(captcha) {
  const {
    data: { isHuman, status },
  } = await axios.post(`${process.env.API}/verify-captcha`, {
    captcha,
  });

  return {
    isHuman,
    status,
  };
}

export async function sendContactEmail({ name, email, message }) {
  const { status, data } = await axios({
    method: "POST",
    url: `${process.env.API}/email/contact`,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      name,
      email,
      message,
    },
  });

  // console.log(res);

  return {
    status: status,
    message: data.message,
  };
}

/**
 * @param(Array) - array of order ids to be checkout
 */
export async function checkout(orderIds) {
  const { status, message } = await axios({
    method: "POST",
    headers: {
      Authorization: "Bearer " + Cookies.get("token"),
      "Content-Type": "application/json",
    },
    url: `${process.env.API}/checkouts`,
    data: {
      order: orderIds,
    },
  });
  return {
    status,
    message,
  };
}
