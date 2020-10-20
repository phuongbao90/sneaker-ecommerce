import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Formik, Form, useField } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { fetchPostJSON } from "utils/api-helpers";
import Router from "next/router";
import { clearCheckoutOrders } from "services/localStorage";
import { checkout } from "actions/index";
import { mutate } from "swr";

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label
        className="pb-1 text-gray-600 font-semibold"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <input
        className={`border rounded-lg p-3 pl-4 shadow-xs text-xl ${
          meta.touched && meta.error ? "border-red-400" : "border-gray-400"
        }`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500">{meta.error}</div>
      ) : null}
    </>
  );
};

const cardOptions = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#1890ff",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#bfbfbf" },
    },
    invalid: {
      iconColor: "#990f02",
      color: "#990f02",
    },
  },
};

/**
 *
 * @param {array} orderIds - array of order ids i.e. [555,333,111]
 * @param {Object[]} checkoutOrders - array of order obj
 * @param {Object} checkoutOrders[].order - object of order
 * @param {Object} checkoutOrders[].sneaker - objct of sneaker
 */

const CheckoutForm = ({ total, orderIds, user, checkoutOrders, token }) => {
  const [
    { payment, errorMessage, error, cardComplete, processing },
    setState,
  ] = useState({
    payment: null,
    errorMessage: "",
    error: null,
    cardComplete: false,
    processing: false,
  });
  const stripe = useStripe();
  const elements = useElements();

  const initialValues = {
    name: "John Doe",
    email: "eh4pqrgl27o@temporary-mail.net",
    address: "4767  Boring Lane",
    city: "San Francisco",
    phone: "0909090909",
    cardNumber: "4242424242424242",
    cardDate: "12/28",
    cardCVC: "1234",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(35, "Must be 35 characters or less")
      .required("Required"),
    address: Yup.string()
      .min(10, "Must at least 15 characters")
      .required("Required"),
    city: Yup.string()
      .min(3, "Must be 3 characters or more")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Invalid phone number")
      .required("Required"),
    // cardNumber: Yup.string()
    //   .matches(/^[0-9]{16}$/, "Your card number is incomplete.")
    //   .required("Card number is required"),
    // cardDate: Yup.string()
    //   .matches(
    //     /([0-9]{2})\/([0-9]{2})/,
    //     "Not a valid expiration date. Example: MM/YY"
    //   )
    //   .test(
    //     "test-credit-card-expiration-date",
    //     "Invalid Expiration Date has past",
    //     (expirationDate) => {
    //       if (!expirationDate) {
    //         return false;
    //       }

    //       const today = new Date();
    //       const monthToday = today.getMonth() + 1;
    //       const yearToday = today.getFullYear().toString().substr(-2);
    //       const [expMonth, expYear] = expirationDate.split("/");
    //       if (Number(expYear) < Number(yearToday)) {
    //         return false;
    //       } else if (
    //         Number(expMonth) < monthToday &&
    //         Number(expYear) <= Number(yearToday)
    //       ) {
    //         return false;
    //       }

    //       return true;
    //     }
    //   )
    //   .test(
    //     "test-credit-card-expiration-date",
    //     "Invalid Expiration Month",
    //     (expirationDate) => {
    //       if (!expirationDate) {
    //         return false;
    //       }
    //       const today = new Date().getFullYear().toString().substr(-2);
    //       const [expMonth] = expirationDate.split("/");

    //       if (Number(expMonth) > 12) {
    //         return false;
    //       }

    //       return true;
    //     }
    //   )
    //   .required("Card date is required"),

    // cardCVC: Yup.string()
    //   .min(3, "Invalid CVC number.")
    //   .max(4, "Invalid CVC number.")
    //   .required("Card CVC is required"),
  });

  const handleCheckout = async () => {
    return await checkout(orderIds);
  };

  const handleSubmit = async (e) => {
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    if (error) {
      elements.getElement("card").focus();
      setState((prev) => ({
        ...prev,
        error,
      }));
      return;
    }

    if (cardComplete) {
      setState((prev) => ({
        ...prev,
        processing: true,
      }));
    }

    try {
      const response = await fetchPostJSON("/api/payment_intents", {
        amount: total,
      });

      if (response.statusCode === 500) {
        setState((prev) => ({
          ...prev,
          errorMessage: response.message,
        }));
        return;
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        response.client_secret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              address: {
                line1: e.address,
                city: e.city,
              },
              email: e.email,
              name: e.name,
              phone: e.phone,
            },
          },
        }
      );

      setState((prev) => ({
        ...prev,
        processing: false,
      }));

      if (paymentIntent) {
        // if payment is made
        setState((prev) => ({
          ...prev,
          payment: paymentIntent,
        }));

        const { status, message } = await handleCheckout();
        mutate(["users/me", token], false);
        if (status === 200) clearCheckoutOrders();

        setTimeout(() => {
          Router.push("/my-cart");
        }, 2000);
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error,
      }));
      alert(`Error message: ${error.message}`);
    }
  };

  const SubmitButton = ({ processing, error, children, disabled }) => (
    <button
      className={`w-full bg-gray-900 text-gray-500 py-3 rounded-lg font-semibold ${
        error ? "cursor-not-allowed" : ""
      }`}
      type="submit"
      disabled={processing || disabled || error}
    >
      {processing ? "Processing..." : children}
    </button>
  );

  return payment ? (
    <div className="my-20 lg:my-0">
      <h3 className="mb-8 text-4xl font-semibold">Payment successful</h3>
      <div className="text-2xl">
        Thanks for shopping at SNEAKER STORE. You will be directed to your
        shopping cart shortly.
      </div>
    </div>
  ) : (
    <>
      <div className="my-20 lg:my-0 text-lg">
        <div className="relative flex flex-row items-center mb-16">
          <hr className="w-full h-1 z-10" />
          <p
            className="text-lg text-center text-gray-600 absolute z-20 px-4 pb-2 whitespace-no-wrap bg-white"
            style={{ left: "50%", transform: "translateX(-50%)" }}
          >
            <span>Pay with card</span>
          </p>
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={(e) => handleSubmit(e)}
          validationSchema={validationSchema}
        >
          <Form>
            <div className="flex flex-col mb-8">
              <TextInput label="Email" id="email" type="email" name="email" />
            </div>
            <div className="flex flex-col mb-8">
              <label
                className="pb-1 text-gray-600 font-semibold"
                htmlFor="cardNumber"
              >
                Card information
              </label>

              <CardElement
                options={cardOptions}
                className="border rounded-lg py-6 pr-3 pl-4 shadow-xs text-xl"
                onChange={(e) => {
                  setState((prev) => ({
                    ...prev,
                    error: e.error,
                    cardComplete: e.complete,
                  }));
                }}
              />
              <div className="mt-2">
                <span>
                  Please use this card number: 4242424242424242 for{" "}
                  <u>testing purpose</u>
                </span>
              </div>
            </div>
            <div className="flex flex-col mb-8">
              <TextInput
                label="Name on card"
                id="name"
                type="text"
                name="name"
              />
            </div>
            <div className="flex flex-col mb-8">
              <TextInput
                label="Address"
                id="address"
                type="text"
                name="address"
              />
            </div>
            <div className="flex flex-col mb-8">
              <TextInput label="City" id="city" type="text" name="city" />
            </div>
            <div className="flex flex-col mb-8">
              <TextInput
                label="Phone number"
                id="phone"
                type="number"
                name="phone"
              />
            </div>
            <div>
              <SubmitButton
                processing={processing}
                error={error}
                disabled={!stripe}
              >
                Pay ${Number(total).toFixed(2)}
              </SubmitButton>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default CheckoutForm;
