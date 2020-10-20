import React from "react";

export const FetchSneakers = React.createContext();

const initialState = {
  sneakers: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SELECT_BRAND":
      return { ...state, selectedBrand: action.selectedBrand };

    case "SELECT_CATEGORY":
      return { ...state, selectedCategory: action.selectedCategory };

    case "DESELECT_BRAND":
      return { ...state, selectedBrand: null };

    case "DESELECT_CATEGORY":
      return { ...state, selectedCategory: null };

    case "SET_PRICE":
      return { ...state, setPrice: action.setPrice };

    case "REMOVE_SET_PRICE":
      return { ...state, setPrice: null };

    default:
      break;
  }
};

export const FilterProvider = ({ children }) => {
  const [filterObj, dispatch] = React.useReducer(reducer, initialState);
  return (
    <FetchSneakers.Provider value={{ filterObj, dispatch }}>
      {children}
    </FetchSneakers.Provider>
  );
};

export const useFilter = () => React.useContext(FetchSneakers);
