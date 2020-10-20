export function setCheckoutOrders(checkoutInfo) {
  const existingCheckout = getCheckoutOrders();

  if (existingCheckout === null)
    return window.localStorage.setItem(
      "checkout",
      JSON.stringify([checkoutInfo])
    );

  const updatedCheckout = [...existingCheckout, checkoutInfo];

  return window.localStorage.setItem(
    "checkout",
    JSON.stringify(updatedCheckout)
  );
}

export function getCheckoutOrders() {
  return JSON.parse(window.localStorage.getItem("checkout"));
}

export function clearCheckoutOrders() {
  return window.localStorage.removeItem("checkout");
}
