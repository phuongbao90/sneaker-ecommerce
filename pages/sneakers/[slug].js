import { useEffect, useState } from "react";
import { Star, ChevronDown, ChevronUp } from "react-feather";
import Slider from "react-slick";
import ReactMarkdown from "react-markdown";
import fetch from "node-fetch";
import { useAuth } from "services/AuthContext";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { addOrderToCart } from "actions/index";
import { mutate } from "swr";
import { NextSeo } from "next-seo";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { ToastContainer, toast } from "react-toastify";

const Sneaker = ({ sneaker }) => {
  // console.log(sneaker);
  const [descState, setDescState] = useState(false);
  const { isAuthenticated, token } = useAuth();
  const router = useRouter();

  const [selected, setSelected] = useState({
    size: null,
    quantity: 1,
    maxQuantity: 1,
    id: null,
  });

  useEffect(() => {
    setSneakerSettings((prev) => ({
      ...prev,
      customPaging: (i) => (
        <a className="w-20 h-20">
          <img
            src={`${process.env.API}${sneaker.images[i].formats.thumbnail.url}`}
            alt={`${sneaker.name} Photo paging ${i + 1}`}
            className=""
          />
        </a>
      ),
    }));
  }, [sneaker]);

  if (!router.isFallback && !sneaker?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const renderReviewStar = () => {
    const starNum = Math.round(4);

    return (
      <>
        {Array(starNum)
          .fill(starNum)
          .map((el, i) => (
            <Star key={i} size={14} />
          ))}
      </>
    );
  };

  const handleSelect = (e) => {
    setSelected((prev) => ({
      ...prev,
      quantity: Number(e.target.value),
    }));
  };

  const [sizeSettings, setSizeSettings] = useState({
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 639,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
    ],
  });

  const [sneakerSettings, setSneakerSettings] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    initialSlide: 0,
    arrows: false,
    className: "-mt-0 sm:-mt-0 md:-mt-10",
    dotsClass: "slick-dots slick-thumb slick-dots-sneaker-slug",

    customPaging: (i) => (
      <a className="w-20 h-20">
        <img
          src={`${process.env.API}${sneaker.images[i].formats.thumbnail.url}`}
          alt={`${sneaker.name} Photo paging ${i + 1}`}
          className=""
        />
      </a>
    ),
  });

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      return router.push("/sign-in");
    }

    const { status, message } = await addOrderToCart({
      sneaker: { id: sneaker.id },
      size: selected.size,
      quantity: selected.quantity,
      maxQuantity: selected.maxQuantity,
    });

    if (status === 200 && !message) {
      toast.success("Add sneaker to cart successfully!");
    }

    if (status === 200 && message) {
      toast.success(message);
    }

    mutate(["users/me", token], false);
  };

  return (
    <>
      <NextSeo
        title={`${sneaker.name.toUpperCase()}`}
        description="Shop 100% authentic Nike shoes, including Nike Air Force 1, Nike Air Max, Nike Dunks, Nike Basketball &amp; more. Plus, we carry Air Jordan, Adidas, Puma, Reebok, Creative Recreation &amp; more."
        openGraph={{
          type: "website",
          url: `http://localhost:3000/sneakers/${sneaker.slug}`,
          title: `${sneaker.name.toUpperCase()}`,
          description:
            "Shop 100% authentic Nike shoes, including Nike Air Force 1, Nike Air Max, Nike Dunks, Nike Basketball &amp; more. Plus, we carry Air Jordan, Adidas, Puma, Reebok, Creative Recreation &amp; more.",
          images: [
            {
              url: `${process.env.API}${sneaker.images[0].formats.small.url}`,
              width: 500,
              height: 500,
              alt: `${sneaker.name} Photo`,
            },
            {
              url: `${process.env.API}${sneaker.images[1].formats.small.url}`,
              width: 500,
              height: 500,
              alt: `${sneaker.name} Photo`,
            },
            {
              url: `${process.env.API}${sneaker.images[2].formats.small.url}`,
              width: 500,
              height: 500,
              alt: `${sneaker.name} Photo`,
            },
          ],
        }}
      />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        className="text-3xl"
      />
      <div className="wrapper">
        <div className="sm:flex sm:mb-16 mx-6 sm:mx-10 md:mx-16">
          <div className="sm:w-1/2 md:w-3/5">
            <Slider {...sneakerSettings}>
              {sneaker.images.map((el, i) => (
                <div
                  key={i}
                  index={i}
                  className="slide outline-none img-wrapper"
                >
                  <img
                    src={`${process.env.API}${el.url}`}
                    alt={`${el.name} photo`}
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="sneaker-specs mx-1 sm:mx-0 sm:ml-4 mt-32 sm:mt-10 sm:w-1/2 md:w-2/5 m">
            <h5 className="font-serif capitalize font-bold text-5xl mb-4">
              {sneaker.brand.name}
            </h5>
            <div className="flex flex-row justify-between font-semibold text-lg sm:flex-col mb-8 ">
              <span className="text-3xl capitalize">{sneaker.name}</span>
              <span className="text-3xl sm:font-thin">${sneaker.price}</span>
            </div>

            <div className="my-12">
              <h6 className="font-bold mt-6 mb-3 text-2xl">Size</h6>
              <div className="size-container">
                <Slider {...sizeSettings}>
                  {sneaker.availability
                    .sort((a, b) => a.size - b.size)
                    .map(
                      (el, i) =>
                        el.quantity > 0 && (
                          <div key={i} className="outline-none">
                            <span
                              className={`inline-block p-4 border-gray-400 border font-semibold cursor-pointer transition-all duration-300  hover:bg-black hover:text-white text-2xl ${
                                el.size === selected.size
                                  ? "bg-black text-white"
                                  : ""
                              }`}
                              key={i}
                              onClick={() =>
                                setSelected((prev) => ({
                                  ...prev,
                                  size: el.size,
                                  maxQuantity: el.quantity,
                                }))
                              }
                            >
                              {el.size}
                            </span>
                          </div>
                        )
                    )}
                </Slider>
              </div>
            </div>
            <div className="flex items-center">
              <span className="mr-8 text-2xl font-semibold">
                Share with your friends
              </span>
              <FacebookShareButton
                url={`http://localhost:3000/sneakers/${sneaker.slug}`}
                quote={`Shopping authenticated ${sneaker.name} sneaker at sneaker store`}
                hashtag={`Shopping authenticated ${sneaker.name} sneaker at sneaker store`}
              >
                <FacebookIcon size={36} round />
              </FacebookShareButton>
            </div>
            <div className="mt-6 mb-4 text-base">
              <p className="font-semibold text-2xl">Standard delivery Free</p>
              <p className="text-gray-500 text-2xl">4-6 working days</p>
            </div>
            <div className="flex flex-row justify-between text-2xl pb-16">
              <select
                name="quantity"
                id="quantity"
                className="border border-gray-400 mr-4 px-8"
                onChange={handleSelect}
                aria-label="Select sneaker size"
              >
                {Array.from({ length: selected.maxQuantity }).map((el, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              <button
                className={`inline-block ${
                  selected.size ? "bg-black" : "bg-gray-500 cursor-not-allowed"
                } text-white flex-1 py-3 text-center duration-500 text-3xl`}
                disabled={!selected.size}
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
        <div className="mx-6 sm:mx-20 md:mx-32 sm:mt-12 md:mt-32 lg:mt-48">
          <div className="flex flex-row justify-between mb-6 items-center">
            <h6 className="text-3xl font-bold">Review</h6>

            <span className="flex space-x-2">
              <span className="flex space-x-1">{renderReviewStar()}</span>
              <span className="text-lg font-semibold">
                {/* ({sneaker.reviews.count}) */}
                54
              </span>
            </span>
          </div>
          <hr className="border-gray-200" />
          <div className="mb-2 mt-8">
            <div
              className="flex justify-between cursor-pointer items-center"
              onClick={() => setDescState(!descState)}
            >
              <h6 className="text-3xl font-bold mb-6">Description</h6>
              <span>
                {descState ? (
                  <ChevronUp size={24} color="gray" />
                ) : (
                  <ChevronDown size={24} color="gray" />
                )}
              </span>
            </div>
            {/* <div className={`description ${descState ? "block" : "hidden"}`}> */}
            <div
              className={`description text-2xl ${
                descState ? "opacity-100" : "h-0 opacity-0 overflow-hidden"
              }`}
            >
              <ReactMarkdown escapeHtml={true} source={sneaker.description} />
            </div>
          </div>
          <hr className="border-gray-200" />
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          padding-top: 5rem;
          padding-bottom: 5rem;
        }
        .description {
          transition: all 400ms ease;
        }
        .img-wrapper {
          text-align: -webkit-center;
          text-align: -moz-center;
        }

        @media (min-width: 1024px) {
          .sneaker-specs {
            max-width: 330px;
          }
        }
      `}</style>
    </>
  );
};

export async function getStaticProps({ params }) {
  const res = await fetch(`${process.env.API}/sneakers/${params.slug}`);
  const sneaker = await res.json();

  return { props: { sneaker } };
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.API}/findSlugs`);
  const slugs = await res.json();

  const paths = slugs.map(({ slug }) => ({
    params: { slug },
  }));

  return { paths, fallback: false };
}

export default Sneaker;
