import { useState, useEffect } from "react";
import { Lock } from "react-feather";
import NextLink from "next/link";
import Router from "next/router";
import { resetPassword } from "actions/index";

const ResetPassword = ({ resetCode }) => {
  const [
    { password, passwordConfirmation, errors, errorMessage, success },
    setState,
  ] = useState({
    password: "test1234",
    passwordConfirmation: "test1234",
    errors: false,
    errorMessage: null,
    success: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setState((prev) => ({
        ...prev,
        errors: true,
        errorMessage: "Password and Password Confirmation do not match!",
        success: false,
      }));
      return;
    }

    try {
      const { res } = await resetPassword({
        resetCode,
        password,
        passwordConfirmation,
      });

      if (res.status === 200) {
        Router.push("/sign-in");
      }
    } catch (error) {
      const { message } = error.response.data.message[0].messages[0];

      setState((prev) => ({
        ...prev,
        errors: true,
        errorMessage: message,
        success: false,
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

  useEffect(() => {}, []);
  return (
    <>
      <div className="main-wrapper">
        <div className="form-container mx-8 py-24">
          <form
            onSubmit={handleSubmit}
            className="form-group mx-auto bg-gray-300"
          >
            <h5 className="capitalize text-5xl font-bold text-center mb-16 text-gray-700">
              Reset Password
            </h5>

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
                name="passwordConfirmation"
                required
                minLength={6}
                maxLength={16}
                value={passwordConfirmation}
                placeholder="Password Confirmation"
                className="outline-none rounded-xxl w-full bg-gray-300 text-3xl placeholder-gray-600  text-gray-600 font-semibold"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="mb-4">
              <button
                className="text-3xl capitalize font-bold text-gray-600 w-full py-4 rounded-xxl transform duration-300"
                type="submit"
              >
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

export async function getServerSideProps(context) {
  const resetCode = context.query.code || null;

  if (!resetCode) {
    context.res.writeHead(302, { Location: "/" });
    context.res.end();
  }
  return {
    props: {
      resetCode,
    },
  };
}

export default ResetPassword;
