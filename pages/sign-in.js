import { useState, useEffect } from "react";
import NextLink from "next/link";
import Router from "next/router";
import Cookies from "universal-cookie";
import { useAuth } from "services/AuthContext";
import { Mail, Lock } from "react-feather";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "testing14@mailsac.com",
    password: "test1234",
    errors: false,
    errorMessage: null,
    success: false,
  });

  const [{ error, errorMessage }, setError] = useState({
    error: null,
    errorMessage: "",
  });

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login({
        email: formData.email,
        password: formData.password,
      });

      if (res.statusCode === 200) {
        Router.push("/account");
      }
    } catch (error) {
      const { id, message } = error.response.data.message[0].messages[0];

      setError((prev) => ({
        ...prev,
        error: true,
        errorMessage: message,
      }));

      if (id === "Auth.form.error.invalid") {
        setError((prev) => ({
          ...prev,
          error: true,
          errorMessage: message,
        }));
      }
      if (id === "Auth.form.error.blocked") {
        setError((prev) => ({
          ...prev,
          error: true,
          errorMessage: message,
        }));
      }
      if (id === "Auth.form.error.confirmed") {
        setError((prev) => ({
          ...prev,
          error: true,
          errorMessage: message,
        }));
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      errors: false,
      errorMessage: null,
      success: false,
    });
    setError({
      error: null,
      errorMessage: "",
    });
  };

  useEffect(() => {
    Router.prefetch("/account");
  }, []);

  return (
    <>
      <div className="main-wrapper">
        <div className="form-container mx-8 pb-24 pt-12">
          <form
            onSubmit={handleSubmit}
            className="form-group mx-auto bg-gray-300"
          >
            <h5 className="capitalize text-5xl font-bold text-center mb-16 text-gray-700">
              login form
            </h5>
            {/* <div className="space-x-4 flex items-center justify-between"> */}
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
                // placeholder="email"
                className="outline-none rounded-xxl w-full bg-gray-300 text-3xl placeholder-gray-600  text-gray-600 font-semibold"
                value={formData.email}
                onChange={(e) => handleChange(e)}
                placeholder="Email"
                required
                autoComplete="off"
              />
            </div>
            <div className="input-control mb-4">
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
                placeholder="Password"
                className="outline-none rounded-xxl w-full bg-gray-300 text-3xl placeholder-gray-600 text-gray-600 font-semibold"
                value={formData.password}
                onChange={(e) => handleChange(e)}
                required
                autoComplete="off"
              />
            </div>
            <div className="mb-10">
              <NextLink href="/forgot-password">
                <a className="text-2xl font-semibold capitalize">
                  forgot password?
                </a>
              </NextLink>
            </div>
            <div className="mb-10">
              <button className="text-3xl capitalize font-bold text-gray-600 w-full py-4 rounded-xxl transform duration-300">
                sign in
              </button>
            </div>
            {error && (
              <div className="text-center mb-8">
                <span className="text-2xl font-semibold text-red-600">
                  {errorMessage}
                </span>
              </div>
            )}

            <div className="text-center">
              <span className="text-2xl font-semibold text-gray-600">
                New user?{" "}
                <NextLink href="/sign-up">
                  <a className="text-blue-700 underline">Signup now</a>
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

SignIn.getInitialProps = async (ctx) => {
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

export default SignIn;
