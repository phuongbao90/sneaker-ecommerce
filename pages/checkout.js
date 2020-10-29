import { useState, useEffect } from "react";
import withAuth from "utils/WithAuth";
import CheckoutForm from "components/UI/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { isEmpty } from "lodash";
import { getCheckoutOrders } from "services/localStorage";
import { NextSeo } from "next-seo";
import Router from "next/router";

const Checkout = ({ user, token }) => {
  const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);
  const [{ checkoutOrders, orderIds }, setState] = useState({
    checkoutOrders: [],
    orderIds: [],
  });

  useEffect(() => {
    // window is accessible here
    if (!getCheckoutOrders()) {
      Router.push("/my-cart");
    }
    // setCheckoutOrders(getCheckoutOrders() || null);

    setState((prev) => ({
      ...prev,
      checkoutOrders: getCheckoutOrders() || null,
    }));
  }, []);

  useEffect(() => {
    !isEmpty(checkoutOrders) &&
      // setOrderIds(checkoutOrders.map((el) => el.order.id));
      setState((prev) => ({
        ...prev,
        orderIds: checkoutOrders.map((el) => el.order.id),
      }));
  }, [checkoutOrders]);

  const renderCartItem = () => {
    return (
      !isEmpty(checkoutOrders) &&
      checkoutOrders.map((el, i) => {
        return (
          <div key={i} className="list my-20 space-y-10">
            <div className="flex justify-between">
              <div className="flex space-x-8">
                <span className="w-32 bg-gray-200 rounded-xl shadow-neu hover:shadow-neuInner transform duration-300 cursor-pointer">
                  <img
                    src={`${
                      el.sneaker.images.filter((el) =>
                        el.name.endsWith("-1.png")
                      )[0].formats.thumbnail.url
                    }`}
                    alt={`${el.sneaker.name} photo`}
                  />
                </span>
                <div className="flex flex-col space-y-1 mt-4">
                  <span className="text-xl capitalize font-semibold">
                    {el.sneaker.name}
                  </span>
                  <span className="text-base space-x-3">
                    <span>Size: {el.order.size}</span>
                    <span>Quantity: {el.order.quantity}</span>
                  </span>
                </div>
              </div>
              <span className="text-xl mt-4 font-semibold">
                ${el.sneaker.price}
              </span>
            </div>
          </div>
        );
      })
    );
  };

  const getTotal = () =>
    !isEmpty(checkoutOrders) &&
    checkoutOrders.reduce((acc, cur) => {
      return acc + cur.order.quantity * cur.sneaker.price;
    }, 0);

  return (
    <>
      <NextSeo
        title="Checkout"
        description="Shop 100% authentic Nike shoes, including Nike Air Force 1, Nike Air Max, Nike Dunks, Nike Basketball &amp; more. Plus, we carry Air Jordan, Adidas, Puma, Reebok, Creative Recreation &amp; more."
      />

      <div className="flex flex-col lg:flex-row my-24">
        <div className="flex-1 mx-auto checkout-list w-full px-8 sm:px-0">
          <div className="bg-gray-200 rounded-xl px-8">
            <h4 className="font-semibold text-2xl pt-8">Basket Summary</h4>
            {renderCartItem()}
            <div className="flex justify-between font-semibold text-2xl pb-12">
              <span>Total</span>
              <span>${Number(getTotal()).toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="flex-1 mx-auto checkout-form w-full px-8 sm:px-0">
          <Elements stripe={stripePromise}>
            <CheckoutForm
              user={user}
              token={token}
              checkoutOrders={checkoutOrders}
              orderIds={orderIds}
              total={getTotal()}
            />
          </Elements>
        </div>
      </div>

      <style jsx>{`
        .checkout-form,
        .checkout-list {
          max-width: 400px;
        }

        .list {
          min-height: 240px;
        }
      `}</style>
    </>
  );
};

export default withAuth(Checkout);
