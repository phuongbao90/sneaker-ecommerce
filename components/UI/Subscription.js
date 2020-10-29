import { ArrowRight, Instagram, Facebook, Youtube } from "react-feather";
import { useState } from "react";
import { subscribe } from "actions/index";
import { ToastContainer, toast } from "react-toastify";

const Subscription = () => {
  const [{ email, error, errorMessage, success }, setState] = useState({
    email: null,
    error: false,
    errorMessage: null,
    success: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { id } = await subscribe(email);
      toast.success("Successful Subscription. Thank you!");
    } catch (error) {
      // console.log(error.response);

      setState((prev) => ({
        ...prev,
        error: true,
        success: false,
        errorMessage:
          error.response.data.message ||
          error.response.data.data.errors.email[0],
      }));
      toast.error(
        `${email} is already subscribed` ||
          error.response.data.data.errors.email[0]
      );
    }
  };
  const handleChange = (e) => {
    e.persist();
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        className="text-3xl"
      />
      <div className="wrapper z-0 relative overflow-hidden">
        <div className="left-container md:bg-gray-100">
          <div className="heading text-white md:text-black ml-12 mt-8 md:mt-24">
            <h5 className="text-5xl md:text-6xl mb-3 md:mb-10">
              Be the first.
            </h5>
            <p className="text-2xl md:text-3xl">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <form className="form-group z-50 md:ml-12" onSubmit={handleSubmit}>
            <div className="inline-flex items-center border-l-4 border-gray-500 md:border-blue-800 py-2 md:py-4 px-4 md:px-6 text-2xl md:text-xl shadow-md bg-white">
              <label htmlFor="email" className="font-semibold mr-4 text-2xl">
                Subscribe now:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="E-Mail Address"
                className="outline-none text-2xl"
                autoComplete="off"
                onChange={handleChange}
              />
              <button aria-label="Subscribe" type="submit">
                <ArrowRight size={36} color={"navy"} />
              </button>
            </div>
          </form>

          <div className="icons-wrapper ml-12 mb-12">
            <h6 className="text-2xl font-semibold text-white md:text-black mb-8">
              Follow us
            </h6>
            <div className="flex">
              <a
                href="https://www.instagram.com/"
                className="mr-8 cursor-pointer"
                aria-label="Go to our instagram page"
              >
                <Instagram
                  color={"gray"}
                  className="text-gray-600 hover:text-purple-700 stroke-current"
                />
              </a>
              <a
                href="https://www.facebook.com/"
                className="mr-8 cursor-pointer"
                aria-label="Go to our facebook page"
              >
                <Facebook
                  color={"gray"}
                  className="text-gray-600 hover:text-purple-700 stroke-current"
                />
              </a>
              <a
                href="https://www.youtube.com/"
                className="cursor-pointer"
                aria-label="Go to our youtube page"
              >
                <Youtube
                  color={"gray"}
                  className="text-gray-600 hover:text-purple-700 stroke-current"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="right-container">
          <div className="heading-container">
            <h5 className="heading-top hidden md:block font-extrabold z-10 text-black">
              Ultra
            </h5>
            <div className="sneaker-wrapper z-20 w-full">
              {/* <Img
                // src="/images/home/subscription/adidas-ultra-boost-db3197-1.png"
                className=""
                src={`${process.env.API}/uploads/small_adidas_ultra_boost_db3197_1_d01ea78414.png`}
                alt="Sneaker photo"
              /> */}
              <img
                src="/images/home/subscription/adidas-ultra-boost-db3197-1.png"
                alt="Sneaker photo"
                className="w-full z-20"
              />
            </div>
            <h6 className="heading-bottom hidden md:block font-semibold z-30 text-white">
              Boost
            </h6>
          </div>
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          height: calc(100vh - 64px);
          max-height: 100rem;
          background-image: url("/images/home/subscription/photo-1473081556163-2a17de81fc97.jpg");
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
        }

        .left-container {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .form-group {
          text-align: center;
          position: absolute;
          bottom: 20%;
          width: 100%;
        }

        .icons-wrapper {
          position: absolute;
          left: 0%;
          bottom: 0%;
        }

        .sneaker-wrapper {
          position: absolute;
          transform: translate(-50%, -50%) rotate(-45deg);
          top: 43%;
          left: 45%;
        }

        @media (min-width: 640px) {
        }
        @media (min-width: 768px) {
          .wrapper {
            min-height: 65rem;
            display: flex;
            background-image: url("/images/home/subscription/dandelion.jpg");
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
          }
          .left-container {
            position: relative;
            width: 40%;
          }

          .right-container {
            position: relative;
            width: 60%;
          }

          .heading-container {
            position: absolute;
            transform: translateY(-50%);
            top: 50%;
          }

          .sneaker-wrapper {
            position: relative;
            transform: rotate(0deg);
            top: 0;
            left: 0;
          }

          .heading-top {
            font-size: 9rem;
            position: absolute;
            left: 15%;
            top: 10%;
          }

          .heading-bottom {
            font-size: 6rem;
            position: absolute;
            right: 15%;
            bottom: 12%;
          }

          input {
            min-width: 120px;
            max-width: 180px;
          }

          label {
            min-width: 105px;
          }
        }
        @media (min-width: 1024px) {
          .wrapper {
            min-height: 80rem;
          }
          .heading-top {
            font-size: 12rem;
          }

          .heading-bottom {
            font-size: 9rem;
          }
          input {
            min-width: 120px;
            max-width: 300px;
          }
        }
        @media (min-width: 1280px) {
          .wrapper {
            min-height: 95rem;
          }
          input {
            min-width: 200px;
          }
        }
      `}</style>
    </>
  );
};

export default Subscription;
