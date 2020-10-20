import { useState, useEffect } from "react";
import NextLink from "next/link";
import Router from "next/router";
import Cookies from "universal-cookie";
import { Mail } from "react-feather";
import { forgotPassword } from "actions/index";
import { setNestedObjectValues } from "formik";

const ForgotPassword = () => {
  const [
    { email, errors, errorMessage, success, message },
    setState,
  ] = useState({
    email: "testing13@mailsac.com",
    errors: false,
    errorMessage: null,
    success: false,
    message: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await forgotPassword(email);
      setState((prev) => ({
        ...prev,
        errors: false,
        errorMessage: null,
        success: true,
        message:
          "We have sent you the email with reset password code. Please do not share the code with anyone else.",
      }));
    } catch (error) {}
  };

  const handleChange = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      errors: false,
      errorMessage: null,
      success: false,
    }));
  };

  // useEffect(() => {
  //   Router.prefetch("/account");
  // }, []);

  return (
    <>
      <div className="main-wrapper">
        <div className="form-container mx-8 pb-24 pt-12">
          <form
            onSubmit={handleSubmit}
            className="form-group mx-auto bg-gray-300"
          >
            <h5 className="capitalize text-5xl font-bold text-center mb-16 text-gray-700">
              Forgot Password?
            </h5>

            <p className="text-3xl font-semibold mb-10 mx-2">
              Enter the email address associated with your account.
            </p>

            <div className="input-control mb-12">
              <Mail
                style={{
                  position: "absolute",
                  transform: "translateY(-50%)",
                  top: "50%",
                  zIndex: 20,
                  width: "50px",
                }}
                color="#718096"
              />
              <input
                id="email"
                type="email"
                name="email"
                // placeholder="email"
                className="outline-none rounded-xxl w-full bg-gray-300 text-3xl placeholder-gray-600  text-gray-600 font-semibold"
                value={email}
                onChange={(e) => handleChange(e)}
                placeholder="Email"
                required
                autoComplete="off"
              />
            </div>

            <div className="mb-2">
              <button className="text-3xl capitalize font-bold text-gray-600 w-full py-4 rounded-xxl transform duration-300">
                Submit
              </button>
            </div>
            {errors && (
              <div className="text-center">
                <span className="text-2xl font-semibold text-red-600">
                  {errorMessage}
                </span>
              </div>
            )}
            {success && (
              <div className="text-center">
                <span className="text-2xl font-semibold text-blue-600">
                  {message}
                </span>
              </div>
            )}
          </form>
        </div>
      </div>

      <style jsx>{`
        .main-wrapper {
          margin: 0 auto;
          max-width: 768px;
        }

        .form-group {
          max-width: 400px;
          padding: 4rem 2rem;
          border-radius: 1rem;
          box-shadow: -3px -3px 7px #ffffff73,
            2px 2px 5px rgba(94, 104, 121, 0.288);
        }

        input,
        button {
          box-shadow: 2px 2px 5px #babecc, -5px -5px 10px #ffffff73;
        }

        input:focus,
        button:focus,
        input:active,
        input:valid {
          box-shadow: inset 1px 1px 2px #babecc, inset -1px -1px 2px #ffffff73;
        }

        .input-control {
          height: 50px;
          position: relative;
          display: flex;
        }

        .input-control label {
          position: absolute;
          left: 45px;
          z-index: 20;
          transform: translateY(-50%);
          top: 50%;
        }

        .input-control input {
          position: absolute;
          height: 100%;
          width: 100%;
          padding-left: 45px;
        }

        .input-control input::-webkit-input-placeholder {
          font-size: 1.875rem;
          font-weight: 600;
        }

        a {
          text-decoration: none;
          color: #7ea9d7;
        }
      `}</style>
    </>
  );
};

ForgotPassword.getInitialProps = async (ctx) => {
  const cookies = new Cookies(ctx.req ? ctx.req.headers.cookie : null);
  const token = cookies.get("token");

  if (token && ctx.req) {
    ctx.res.writeHead(302, {
      Location: "/account",
    });
    ctx.res.end();
    return;
  }

  if (token) {
    Router.push("/account");
  }

  return { token };
};

export default ForgotPassword;
