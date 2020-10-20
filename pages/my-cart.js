import { useState, useEffect } from "react";
import NextLink from "next/link";
import { Plus, Minus } from "react-feather";
import { isEmpty } from "lodash";
import Router from "next/router";
import { addOrderToCart } from "actions/index";
import withAuth from "utils/WithAuth";
import { setCheckoutOrders, clearCheckoutOrders } from "services/localStorage";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import { ToastContainer, toast } from "react-toastify";
import { mutate } from "swr";

const cartContainerVariants = {
  enter: {
    opacity: 1,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.1,
    },
  },
};

const MyCart = ({ user, token }) => {
  const [{ orders, updating, total, checkAll }, setState] = useState({
    orders: [],
    updating: false,
    total: 0,
    checkAll: false,
  });

  useEffect(() => {
    // setup orders initially && added checked property
    // user && setOrders(user.cart.order.map((el) => ({ ...el, checked: false })));
    user &&
      setState((prev) => ({
        ...prev,
        orders: user.cart.order.map((el) => ({ ...el, checked: false })),
      }));
  }, [user && user.cart.order]); // monitor changes in user.cart.order

  useEffect(() => {
    if (updating) {
      mutate(["users/me", token], false);
      setState((prev) => ({
        ...prev,
        updating: false,
      }));
    }
  }, [updating]);

  useEffect(() => {
    // monitor changes in checked property anytime when orders are modifed
    orders.every((order) => order.checked === true)
      ? setState((prev) => ({
          ...prev,
          checkAll: true,
        }))
      : setState((prev) => ({
          ...prev,
          checkAll: false,
        }));
  }, [orders]);

  useEffect(() => {
    // this monitor the total amount of checked orders
    const sum = orders.reduce((acc, curr) => {
      if (curr.checked) {
        acc = acc + curr.sneaker.price * curr.quantity;
      }
      return acc;
    }, 0);
    // setTotal(sum);
    setState((prev) => ({
      ...prev,
      total: sum,
    }));
  }, [orders]);

  /**
   * this function modify the orders array with quantity changes
   * and set updating === true (which will fires updateCart function in useEffect)
   */
  const handleQuantityChange = async ({ sneaker, size }, step) => {
    const { status, message } = await addOrderToCart({
      sneaker: { id: sneaker.id },
      size: size,
      quantity: step,
      maxQuantity: null,
    });

    if (status === 200 && message) {
      toast.warning(message);
    }

    if (status !== 200) {
      toast.error(message);
    }

    setState((prev) => ({
      ...prev,
      updating: true,
    }));
  };

  /**
   * this function cycle checked property in orders array
   */
  const handleCheckSneaker = (e, orderId) => {
    // If you must keep the original synthetic event around, use event.persist().
    e.persist();

    // manage individual checkbox only
    setState((prev) => ({
      ...prev,
      orders: prev.orders.map((el) => {
        if (el.id === orderId) {
          e.target.checked ? (el.checked = true) : (el.checked = false);
        }
        return el;
      }),
    }));
  };

  const handleSelectAll = (e) => {
    e.persist(); // to keep the event available

    // e.target.checked ? setCheckAll(true) : setCheckAll(false);
    setState((prev) => ({
      ...prev,
      checkAll: e.target.checked ? true : false,
    }));

    setState((prev) => ({
      ...prev,
      orders: prev.orders.map((el) => {
        e.target.checked ? (el.checked = true) : (el.checked = false);
        return el;
      }),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // clear any existing checkout cart in localStorage
    clearCheckoutOrders();

    orders.map((el) => {
      if (el.checked) {
        setCheckoutOrders({
          order: {
            id: el.id,
            quantity: el.quantity,
            size: el.size,
          },
          sneaker: el.sneaker,
        });
      }
    });

    Router.push("/checkout");
  };

  const renderCartItems = () => {
    return (
      <form onSubmit={handleSubmit}>
        <motion.div
          variants={cartContainerVariants}
          initial="enter"
          animate="visible"
        >
          {orders && !isEmpty(orders) ? (
            orders.map((order) => (
              <div
                key={`${order.id}`}
                className="flex flex-row sm:justify-around space-y-12 mx-8"
              >
                <div className="w-2/12 sm:w-1/12 flex items-center justify-start">
                  <input
                    id={`select-${order.sneaker.slug}-size-${order.size}`}
                    type="checkbox"
                    className="w-8 h-8 cursor-pointer"
                    onChange={(e) => handleCheckSneaker(e, order.id)}
                    checked={order.checked ? true : false}
                    name={order.id}
                  />
                  {/* <label
                    className="hidden"
                    htmlFor={`select-${order.sneaker.slug}-size-${order.size}`}
                  >
                    select sneaker
                  </label> */}
                </div>
                <label
                  htmlFor={`select-${order.sneaker.slug}-size-${order.size}`}
                  className="w-4/12 sm:w-2/12"
                >
                  <div
                    className="mx-auto rounded-xxl shadow-neu hover:shadow-neuInner bg-gray-200 sm:w-40 sm:h-40 cursor-pointer duration-300 transition-all"
                    onClick={() =>
                      Router.push(`/sneakers/${order.sneaker.slug}`)
                    }
                  >
                    <img
                      src={`${process.env.API}${order.sneaker.images[0].formats.thumbnail.url}`}
                      alt="Shoes Photo"
                      className="w-full"
                    />
                  </div>
                </label>
                <div className="w-6/12 sm:w-9/12 ml-8 sm:ml-0 sm:space-x-8 flex flex-col justify-center sm:justify-around sm:flex-row sm:items-center">
                  <NextLink href={`/sneakers/${order.sneaker.slug}`}>
                    <a className="text-xl">{order.sneaker.name}</a>
                  </NextLink>
                  <div className="text-lg space-x-2">
                    <span>Size:</span>
                    <span>{order.size}</span>
                  </div>
                  <div className="text-xl space-x-2 mt-2 sm:mt-0">
                    <span className="text-gray-400 line-through">
                      ${Number(100).toFixed(2)}
                    </span>
                    <span className="text-red-600">
                      ${Number(order.sneaker.price).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                    <span
                      className="cursor-pointer p-2 bg-black rounded-lg"
                      onClick={() => handleQuantityChange(order, -1)}
                    >
                      <Minus className="text-white w-5 h-5" />
                    </span>
                    <span className="text-xl font-semibold">
                      {order.quantity}
                    </span>
                    <span
                      className="cursor-pointer p-2 bg-black rounded-lg"
                      onClick={() => handleQuantityChange(order, +1)}
                    >
                      <Plus className="text-white w-5 h-5" />
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{ minHeight: "175px" }}
              className="mx-8 my-16 flex flex-wrap items-center"
            >
              <span className="mr-4 text-2xl">
                Your basket is empty, fill it up!
              </span>
              <NextLink href="/sneakers">
                <a className="p-4 bg-black text-white text-2xl">
                  Start shopping now!
                </a>
              </NextLink>
            </div>
          )}
          <div className="flex flex-row justify-between items-center border-t-2 border-b-2 pt-8 pb-8 mx-8 mt-16">
            <div className="text-2xl space-x-4 flex items-center">
              <input
                id="checkAll"
                type="checkbox"
                name="checkAll"
                className="w-8 h-8 cursor-pointer"
                onChange={(e) => handleSelectAll(e)}
                disabled={isEmpty(orders)}
                checked={checkAll}
                aria-label="Toggle selection"
              />
              <label htmlFor="checkAll">Select All</label>
            </div>

            <div className="flex flex-row items-center">
              <div className="text-2xl space-x-2 mr-8">
                <span>Total:</span>
                <span className="text-red-600">
                  ${Number(total).toFixed(2)}
                </span>
              </div>
              <button
                className={`text-white text-2xl rounded-lg bg-pink-700 px-8 py-4 ${
                  total === 0 ? "cursor-not-allowed" : ""
                }`}
                disabled={total === 0}
                onClick={(e) => handleSubmit(e)}
              >
                PROCESS
              </button>
            </div>
          </div>
        </motion.div>
      </form>
    );
  };

  return (
    <>
      <NextSeo
        title="My cart"
        description="Shop 100% authentic Nike shoes, including Nike Air Force 1, Nike Air Max, Nike Dunks, Nike Basketball &amp; more. Plus, we carry Air Jordan, Adidas, Puma, Reebok, Creative Recreation &amp; more."
      />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        className="text-3xl"
      />
      <div className="wrapper">
        <div className="cart">
          <h1 className="text-4xl ml-16 mb-12">My Cart</h1>

          <>{renderCartItems()}</>
        </div>
      </div>

      <style jsx>{`
        .wrapper {
          max-width: 800px;
          margin: 0 auto;
          padding-top: 2rem;
          padding-bottom: 5rem;
        }
      `}</style>
    </>
  );
};

export default withAuth(MyCart);
