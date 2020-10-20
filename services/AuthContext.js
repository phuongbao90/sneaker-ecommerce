import React, {
  useReducer,
  useContext,
  useEffect,
  createContext,
  useState,
} from "react";
import Cookies from "universal-cookie";
import api from "services/api";
import useSwr from "swr";
import { fetchWithToken } from "services/fetcher";

// create context
export const AuthStateContext = createContext({});

const initialState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case "SELECT_CART":
      return [
        ...state,
        {
          orderId: action.payload.orderId,
          sneakerId: action.payload.sneakerId,
          availability: action.payload.availability,
          orderQuanity: action.payload.orderQuanity,
        },
      ];

    case "DESELECT_CART":
      return [];

    default:
      break;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkout, dispatch] = useReducer(reducer, initialState);

  const cookies = new Cookies();
  const token = cookies.get("token");

  const { data, mutate } = useSwr(
    () => (token ? ["users/me", token] : null),
    fetchWithToken
  );

  // console.log(user);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
    setLoading(false);
  }, [data]);

  // useEffect(() => {
  //   async function loadUserFromCookies() {
  //     const token = cookies.get("token");

  //     if (token) {
  //       api.defaults.headers.Authorization = `Bearer ${token}`;
  //       const { data } = await api.get("users/me");

  //       if (data) setUser(data);
  //     }
  //     setLoading(false);
  //   }
  //   loadUserFromCookies();
  // }, []);

  const login = async ({ email, password }) => {
    const {
      data: { jwt, user },
    } = await api.post("auth/local", {
      identifier: email,
      password,
    });

    if (jwt) {
      cookies.set("token", jwt, { path: "/" });
      api.defaults.headers.Authorization = `Bearer ${jwt}`;
      const { data } = await api.get("users/me");
      setUser(data);

      return {
        statusCode: 200,
        message: "Login successfully",
        data: { user },
      };
    } else {
      return {
        statusCode: 400,
        message: data[0].messages[0].message,
      };
    }
  };

  const logout = () => {
    cookies.remove("token", { path: "/" });
    setUser(null);
    window.location.pathname = "/sign-in";
  };

  /* ---------------------------------------------------------------- */
  // STORE USERINFO INTO LOCALSTORAGE
  // let localState = null;
  // if (typeof localStorage !== "undefined" && localStorage.getItem("userInfo")) {
  //   localState = JSON.parse(localStorage.getItem("userInfo") || "");
  // }

  // const [userInfo, dispatch] = useReducer(reducer, localState || initialState);

  // useEffect(() => {
  //   if (typeof localStorage !== "undefined") {
  //     localStorage.setItem("userInfo", JSON.stringify(userInfo));
  //   }
  // }, [userInfo]);
  /* ---------------------------------------------------------------- */

  return (
    <AuthStateContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        loading,
        logout,
        checkout,
        dispatch,
        token,
      }}
    >
      {children}
    </AuthStateContext.Provider>
  );
};

// export const AuthProvider = ({ children }) => {
//   let localState = null;
//   if (typeof localStorage !== "undefined" && localStorage.getItem("userInfo")) {
//     localState = JSON.parse(localStorage.getItem("userInfo") || "");
//   }

//   const [state, dispatch] = useReducer(reducer, localState || initialState);

//   useEffect(() => {
//     if (typeof localStorage !== "undefined") {
//       localStorage.setItem("userInfo", JSON.stringify(state));
//     }
//   }, [state]);

//   return (
//     <AuthStateContext.Provider value={[state, dispatch]}>
//       {children}
//     </AuthStateContext.Provider>
//   );
// };

export const useAuth = () => useContext(AuthStateContext);
