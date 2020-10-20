import { useState, useEffect } from "react";
import Router from "next/router";
import { Mail, Lock, User } from "react-feather";
import NextLink from "next/link";
import Cookies from "universal-cookie";
import { signup } from "actions/index";
import { ToastContainer, toast } from "react-toastify";

const Component = () => {
  const [
    {
      email,
      username,
      password,
      passwordConfirm,
      errors,
      errorMessage,
      success,
    },
    setState,
  ] = useState({
    email: "testing14@mailsac.com",
    username: "testing14",
    password: "test1234",
    passwordConfirm: "test1234",
    errors: false,
    errorMessage: null,
    success: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setState((prev) => ({
        ...prev,
        errors: true,
        errorMessage: "Password and password confirm do not match!",
        success: false,
      }));
      return false;
    }

    try {
      const res = await signup({
        email,
        username,
        password,
      });

      if (res.code === 200) {
        setState((prev) => ({
          ...prev,
          errors: false,
          errorMessage: null,
          success: true,
        }));
        toast.success("We have sent you activation email. Please confirm it.");

        setTimeout(() => {
          Router.push("/");
        }, 3000);
      }
    } catch (error) {
      const message =
        error.response.data.message[0].messages[0].message ||
        "Something went wrong! Please check again latter.";
      // console.log(error.response.data.message[0].messages[0].message);

      // toast.error(error.response.data.message[0].messages[0].message);
      toast.error(message);

      setState((prev) => ({
        ...prev,
        errors: true,
        errorMessage: message,
      }));
    }
  };

  const handleChange = (e) => {
    e.persist();
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      errors: false,
      errorMessage: null,
      success: false,
    }));
  };

  useEffect(() => {
    Router.prefetch("/");
  }, []);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        className="text-3xl"
      />
      <div className="main-wrapper">
        <div className="form-container mx-8 py-24">
          <form
            onSubmit={handleSubmit}
            className="form-group mx-auto bg-gray-300"
          >
            <h5 className="capitalize text-5xl font-bold text-center mb-16 text-gray-700">
              Signup form
            </h5>

            <div className="input-control mb-10">
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
                required
                placeholder="Please enter your email."
                value={email}
                onChange={(e) => handleChange(e)}
                className="outline-none rounded-xxl w-full bg-gray-300 text-3xl placeholder-gray-600  text-gray-600 font-semibold"
              />
            </div>
            <div className="input-control mb-10">
              <User
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
                id="Username"
                type="text"
                name="username"
                required
                minLength={6}
                maxLength={24}
                value={username}
                placeholder="Your Username..."
                className="outline-none rounded-xxl w-full bg-gray-300 text-3xl placeholder-gray-600  text-gray-600 font-semibold"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="input-control mb-10">
              <Lock
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
                id="password"
                type="password"
                name="password"
                minLength={6}
                maxLength={16}
                required
                value={password}
                placeholder="Password"
                className="outline-none rounded-xxl w-full bg-gray-300 text-3xl placeholder-gray-600  text-gray-600 font-semibold"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="input-control mb-10">
              <Lock
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
                id="password-confirm"
                type="password"
                name="passwordConfirm"
                required
                minLength={6}
                maxLength={16}
                value={passwordConfirm}
                placeholder="Password Confirmation"
                className="outline-none rounded-xxl w-full bg-gray-300 text-3xl placeholder-gray-600  text-gray-600 font-semibold"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="mb-4">
              <button className="text-3xl capitalize font-bold text-gray-600 w-full py-4 rounded-xxl transform duration-300">
                Submit
              </button>
            </div>
            {/* {errors && (
              <div className="text-center mb-8">
                <span className="text-2xl font-semibold text-red-600">
                  {errorMessage}
                </span>
              </div>
            )} */}
            <div className="text-center">
              <span className="text-2xl font-semibold text-gray-600">
                Already have an account?{" "}
                <NextLink href="/sign-in">
                  <a className="text-blue-700 underline">Signin here</a>
                </NextLink>
              </span>
            </div>
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

Component.getInitialProps = async (ctx) => {
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

export default Component;
