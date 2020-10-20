import { useState, useEffect } from "react";
import { NextSeo } from "next-seo";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyCaptcha } from "actions/index";
import { ToastContainer, toast } from "react-toastify";
import { sendContactEmail } from "actions/index";

const ContactUs = () => {
  const [
    {
      name,
      email,
      message,
      isHuman,
      processing,
      complete,
      error,
      errorMessages,
    },
    setState,
  ] = useState({
    name: "",
    email: "",
    message: "",
    isHuman: false,
    processing: false,
    complete: false,
    error: false,
    errorMessages: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (complete) {
      const res = await sendContactEmail({ name, email, message });
      if (res.status === 200) {
        toast.success(res.message);
        setState((prev) => ({
          ...prev,
          name: "",
          email: "",
          message: "",
          error: false,
          errorMessages: [],
          complete: false,
        }));
      }
    }
  };
  const handleInput = (e) => {
    e.persist();
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      error: false,
      errorMessages: [],
    }));
  };

  const handleCaptchaChange = async (value) => {
    // console.log("Captcha value:", value);
    const { isHuman } = await verifyCaptcha(value);

    setState((prev) => ({
      ...prev,
      isHuman,
    }));
  };

  useEffect(() => {
    if (name.length > 3 && isHuman && message.length > 30) {
      setState((prev) => ({
        ...prev,
        complete: true,
        error: false,
        errorMessages: [],
      }));
    }

    // if (name.length <= 3) {
    //   setState((prev) => ({
    //     ...prev,
    //     error: true,
    //     errorMessages: [prev.errorMessages].push(
    //       "Name should be longer than 3 characters"
    //     ),
    //   }));
    // }

    // if (message.length <= 30) {
    //   setState((prev) => ({
    //     ...prev,
    //     error: true,
    //     errorMessages: [prev.errorMessages].push(
    //       "Message should be longer than 30 characters"
    //     ),
    //   }));
    // }
  }, [name, email, message, isHuman]);

  return (
    <>
      <NextSeo
        title="Contact us"
        description="Shop 100% authentic Nike shoes, including Nike Air Force 1, Nike Air Max, Nike Dunks, Nike Basketball &amp; more. Plus, we carry Air Jordan, Adidas, Puma, Reebok, Creative Recreation &amp; more."
      />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        className="text-3xl"
      />
      <div className="wrapper">
        <div className="mx-6 sm:mx-12 md:mx-0 my-8">
          <h1 className="text-3xl sm:text-4xl font-semibold mb-8">
            Contact Us
          </h1>
          <p className="text-2xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, ipsa
            explicabo libero sit impedit dolor, facilis consectetur voluptates
            enim totam nisi minus fuga a consequuntur amet accusamus ullam,
            distinctio fugit modi fugiat officia omnis. Nisi, aut totam. Fugit
            voluptates beatae nisi commodi, laborum rerum officia suscipit
            maiores consectetur provident fuga!
          </p>
          <div className="mt-8">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mb-4">
                <label className="text-xl" htmlFor="name">
                  NAME
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="border border-gray-400 p-3"
                  autoComplete="off"
                  onChange={handleInput}
                  value={name}
                  required
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="text-xl" htmlFor="email">
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="border border-gray-400 p-3"
                  autoComplete="off"
                  onChange={handleInput}
                  value={email}
                  required
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="text-xl" htmlFor="message">
                  MESSAGE
                </label>
                <textarea
                  type="text"
                  rows="8"
                  name="message"
                  id="message"
                  className="border border-gray-400 p-3"
                  placeholder="Enter your message to us here."
                  onChange={handleInput}
                  value={message}
                  required
                />
              </div>
              <div className="flex flex-col mb-4">
                <ReCAPTCHA
                  sitekey={process.env.CAPTCHA_SITE_KEY}
                  onChange={handleCaptchaChange}
                />
              </div>
              <div>
                <button
                  className={`w-full  p-3 text-2xl ${
                    complete
                      ? "bg-black text-white"
                      : "bg-gray-500 text-black cursor-not-allowed"
                  }`}
                  disabled={!complete}
                  type="submit"
                >
                  SEND
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          max-width: 600px;
          margin: 0 auto;
          padding-top: 3rem;
          padding-bottom: 5rem;
        }

        @media (min-width: 640px) {
        }
        @media (min-width: 768px) {
        }
        @media (min-width: 1024px) {
        }
        @media (min-width: 1280px) {
        }
      `}</style>
    </>
  );
};

export default ContactUs;
