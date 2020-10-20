import React from "react";
import { CONSTANT } from "utils/Constant";
export const FilterContext = React.createContext();

const initialState = {
  start: 0,
  limit: CONSTANT.LIMIT,
  nextDataLength: null,
  getUrl: function () {
    const {
      start,
      limit,
      filters: { brand, category, setPrice },
    } = this;
    return `${process.env.API}/sneakers?_start=${start}&_limit=${limit}${
      brand ? `&brand.slug=${brand}` : ""
    }${category ? `&category.slug=${category}` : ""}${
      setPrice.altered
        ? `&price_gte=${setPrice.min}&price_lte=${setPrice.max}`
        : ""
    }`;
  },
  getNextUrl: function () {
    const {
      start,
      limit,
      filters: { brand, category, setPrice },
    } = this;
    return `${process.env.API}/sneakers?_start=${
      start + limit
    }&_limit=${limit}${brand ? `&brand.slug=${brand}` : ""}${
      category ? `&category.slug=${category}` : ""
    }${
      setPrice.altered
        ? `&price_gte=${setPrice.min}&price_lte=${setPrice.max}`
        : ""
    }`;
  },
  sneakers: [],
  filters: {
    brand: null,
    category: null,
    setPrice: {
      min: CONSTANT.minValue,
      max: CONSTANT.maxValue,
      altered: false,
    },
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SELECT_BRAND":
      return {
        ...state,
        start: 0,
        filters: Object.assign({}, state.filters, { ["brand"]: action.brand }),
      };

    case "DESELECT_BRAND":
      return {
        ...state,
        start: 0,
        filters: Object.assign({}, state.filters, { ["brand"]: null }),
      };

    case "SELECT_CATEGORY":
      return {
        ...state,
        start: 0,
        filters: Object.assign({}, state.filters, {
          ["category"]: action.category,
        }),
      };

    case "DESELECT_CATEGORY":
      return {
        ...state,
        start: 0,
        filters: Object.assign({}, state.filters, {
          ["category"]: null,
        }),
      };

    case "SET_PRICE":
      return {
        ...state,
        filters: Object.assign({}, state.filters, {
          ["setPrice"]: action.setPrice,
        }),
      };

    case "SET_SNEAKERS":
      return { ...state, sneakers: action.sneakers };

    case "NEXT_PAGE":
      return { ...state, start: state.start + state.limit };

    case "PREVIOUS_PAGE":
      return { ...state, start: state.start - state.limit };

    case "CHECK_IS_MORE":
      return { ...state, nextDataLength: action.nextDataLength };

    default:
      break;
  }
};

export const FilterProvider = ({ children }) => {
  const [filterObj, dispatch] = React.useReducer(reducer, initialState);
  return (
    <FilterContext.Provider value={{ filterObj, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => React.useContext(FilterContext);
