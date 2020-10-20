import { useState, useRef, useEffect } from "react";
import Cookies from "universal-cookie";
import { isEmpty } from "lodash";
import { updateUserPhoto } from "actions/user";
import withAuth from "utils/WithAuth";
import Router from "next/router";
import { fetchBestsellers, getPurchaseHistory } from "actions/index";
import NextLink from "next/link";
import { ChevronLeft, ChevronRight } from "react-feather";
import { NextSeo } from "next-seo";

const Account = ({ user }) => {
  const [
    { id, avatar, historyPurchases, page, limit, bestsellers },
    setState,
  ] = useState({
    id: null,
    avatar: null,
    historyPurchases: [],
    page: 0,
    limit: 5,
    bestsellers: [],
  });

  const formRef = useRef(null);

  const handleChange = async (e) => {
    let file = null;
    if (e.target.name === "avatar") {
      file = e.target.files[0];
    }

    setState({
      id: user.id,
      avatar: file,
    });
  };

  useEffect(() => {
    async function fetchData() {
      if (user) {
        const { items } = await getPurchaseHistory({
          purchaseId: user.purchase,
        });
        setState((prev) => ({
          ...prev,
          historyPurchases: items,
        }));
      }
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    async function fetchData() {
      const { items } = await fetchBestsellers();
      setState((prev) => ({
        ...prev,
        bestsellers: items,
      }));
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function update() {
      if (avatar !== null) {
        const cookies = new Cookies();
        const token = cookies.get("token");
        await updateUserPhoto({ id, avatar }, token);
        Router.reload();
      }
    }
    update();
  }, [avatar]);

  return (
    <>
      <NextSeo
        title="My account"
        description="Shop 100% authentic Nike shoes, including Nike Air Force 1, Nike Air Max, Nike Dunks, Nike Basketball &amp; more. Plus, we carry Air Jordan, Adidas, Puma, Reebok, Creative Recreation &amp; more."
      />
      <div className="wrapper bg-white pt-4">
        <div className="rounded-xl mx-4 bg-gray-200 pb-12">
          {user && (
            <div>
              <div className="bg-gray-100 shadow-md rounded-xl py-20">
                <h6 className="text-3xl font-bold mb-12 ml-10">My Account</h6>
                <div className="flex flex-col items-center space-y-6">
                  <form className="w-64 h-64 rounded-full" ref={formRef}>
                    <label htmlFor="avatar">
                      <img
                        src={
                          user.avatar && !isEmpty(user.avatar)
                            ? `${process.env.API}${user.avatar.formats.thumbnail.url}`
                            : `/images/others/Portrait_Placeholder.png`
                        }
                        alt="User Photo"
                        className="rounded-full object-center object-cover shadow-lg h-64 w-64 cursor-pointer"
                      />
                    </label>
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      placeholder="Change photo"
                      id="avatar"
                      onChange={handleChange}
                      hidden
                    />
                  </form>

                  <span className="text-2xl font-bold">{user.username}</span>
                  <span className="text-2xl text-gray-500">{user.email}</span>
                </div>
              </div>
              {!isEmpty(bestsellers) && (
                <div>
                  <h6 className="text-3xl font-bold mb-12 ml-10 my-16">
                    Our Bestsellers
                  </h6>
                  <div className="flex mx-8 space-x-8">
                    <div className="flex flex-col justify-center rounded-xl bg-gray-200 shadow-neu hover:shadow-neuInner transition-all duration-300 ease-in-out">
                      <NextLink href={`/sneakers/${bestsellers[0].slug}`}>
                        <a
                          aria-label={`Hey checkout our ${bestsellers[0].name} here.`}
                        >
                          <img
                            // src="/images/home/top/1/left.png"
                            src={`${process.env.API}${bestsellers[0].images[4].formats.small.url}`}
                            alt={`${bestsellers[0].name} photo`}
                          />
                        </a>
                      </NextLink>
                    </div>
                    <div className="space-y-8">
                      <div className="rounded-xl bg-gray-200 shadow-neu hover:shadow-neuInner transition-all duration-300 ease-in-out">
                        <NextLink href={`/sneakers/${bestsellers[1].slug}`}>
                          <a
                            aria-label={`Hey checkout our ${bestsellers[1].name} here.`}
                          >
                            <img
                              // src="/images/home/top/2/right.png"
                              src={`${process.env.API}${bestsellers[1].images[0].formats.small.url}`}
                              alt={`${bestsellers[1].name} photo`}
                            />
                          </a>
                        </NextLink>
                      </div>
                      <div className="rounded-xl bg-gray-200 shadow-neu hover:shadow-neuInner transition-all duration-300 ease-in-out">
                        <NextLink href={`/sneakers/${bestsellers[2].slug}`}>
                          <a
                            aria-label={`Hey checkout our ${bestsellers[2].name} here.`}
                          >
                            <img
                              // src="/images/home/top/3/right.png"
                              src={`${process.env.API}${bestsellers[2].images[0].formats.small.url}`}
                              alt={`${bestsellers[2].name} photo`}
                            />
                          </a>
                        </NextLink>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {historyPurchases && !isEmpty(historyPurchases) ? (
                <div
                  style={{
                    minHeight: `${
                      historyPurchases.length > 5 ? "80rem" : "30rem"
                    }`,
                  }}
                  className="relative"
                >
                  <h6 className="text-3xl font-bold mb-12 ml-10 my-16">
                    My purchases
                  </h6>
                  <div className="flex flex-col mx-8 pb-40">
                    {historyPurchases
                      .slice(page * limit, page * limit + limit)
                      .map((el, i) => (
                        <NextLink href={`/sneakers/${el.sneaker.slug}`} key={i}>
                          <a
                            className="mb-8"
                            aria-label={`Hey checkout our ${el.sneaker.name} here.`}
                          >
                            <div className="flex group" key={i}>
                              <span className="rounded-xl bg-gray-200 shadow-neu group-hover:shadow-neuInner transition-all duration-300 ease-in-out cursor-pointer">
                                <img
                                  src={`${process.env.API}${el.sneaker.images[0].formats.thumbnail.url}`}
                                  alt={`${el.sneaker.name} Photo`}
                                />
                              </span>

                              <div className="w-full flex flex-col justify-center ml-12">
                                <h6 className="text-3xl font-bold capitalize cursor-pointer group-hover:text-indigo-600">
                                  {el.sneaker.name}
                                </h6>

                                <div className="text-2xl space-x-4">
                                  <span>Size: {el.size}</span>
                                  <span>Quantity: {el.quantity}</span>
                                </div>
                              </div>
                            </div>
                          </a>
                        </NextLink>
                      ))}
                  </div>
                  <div className="absolute bottom-0 flex justify-center mt-8 w-full">
                    <span
                      className={`shadow-neu p-6 mr-8 duration-300 cursor-pointer  rounded-xl ${
                        page === 0
                          ? "cursor-not-allowed text-gray-400"
                          : "hover:text-indigo-500 hover:shadow-neuInner text-black"
                      }`}
                      onClick={() =>
                        setState((prev) => {
                          if (page !== 0) {
                            return {
                              ...prev,
                              page: page - 1,
                            };
                          } else {
                            return {
                              ...prev,
                            };
                          }
                        })
                      }
                    >
                      <ChevronLeft />
                    </span>
                    <span
                      className={`shadow-neu p-6 duration-300 cursor-pointer rounded-xl ${
                        historyPurchases.slice(
                          (page + 1) * limit,
                          (page + 1) * limit + limit
                        ).length > 0
                          ? "hover:shadow-neuInner hover:text-indigo-500 text-black"
                          : "cursor-not-allowed text-gray-400"
                      }`}
                      onClick={() =>
                        setState((prev) => {
                          if (
                            historyPurchases.slice(
                              page * limit,
                              page * limit + limit
                            ).length < 5
                          ) {
                            return {
                              ...prev,
                            };
                          } else {
                            return {
                              ...prev,
                              page: page + 1,
                            };
                          }
                        })
                      }
                    >
                      <ChevronRight />
                    </span>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          min-height: 90vh;
          max-width: 600px;
          margin: 0 auto;
          padding-top: 1rem;
          padding-bottom: 1rem;
        }
      `}</style>
    </>
  );
};

export default withAuth(Account);
