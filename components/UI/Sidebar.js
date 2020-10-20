import InputRange from "react-input-range";
import Skeleton from "react-loading-skeleton";
import useSwr from "swr";
import { useFilter } from "services/FilterContext";
import { CONSTANT } from "utils/Constant";

const Sidebar = () => {
  const { filterObj, dispatch } = useFilter();
  const {
    filters: { brand, category, setPrice },
  } = filterObj;

  const { data: brands, error: brandError } = useSwr(
    `${process.env.API}/brands`
  );

  const { data: categories, error: categoryError } = useSwr(
    `${process.env.API}/categories`
  );

  const renderSkeleton = (count) => {
    return Array(count)
      .fill(count)
      .map((el, i) => (
        <Skeleton key={i} height={18} width={150} className="mb-4" />
      ));
  };

  const renderBrands = () => {
    if (!brands) return renderSkeleton(7);

    return brands.map((el, i) => (
      <li
        key={`${i}-${el.slug}`}
        className={`hover:shadow-neuInner px-8 py-4 sm:p-0 mr-4 mb-8 sm:m-0 font-semibold normal-case rounded-xxl duration-300 cursor-pointer sm:shadow-none sm:hover:shadow-none text-gray-600 sm:font-normal sm:hover:text-black
          ${
            brand === el.slug
              ? "shadow-neuInner sm:text-black"
              : "shadow-neu sm:text-gray-500"
          }
          `}
        onClick={() => {
          brand === el.slug
            ? dispatch({ type: "DESELECT_BRAND" })
            : dispatch({ type: "SELECT_BRAND", brand: el.slug });
        }}
      >
        {el.name}
      </li>
    ));
  };

  const renderCategories = () => {
    if (!categories) return renderSkeleton(5);

    return categories.map((el, i) => (
      <li
        key={`${i}-${el.slug}`}
        className={`hover:shadow-neuInner px-8 py-4 sm:p-0 mr-4 mb-8 sm:m-0 font-semibold normal-case rounded-xxl duration-300 cursor-pointer sm:shadow-none sm:hover:shadow-none text-gray-600 sm:font-normal sm:hover:text-black
          ${
            category === el.slug
              ? "shadow-neuInner sm:text-black"
              : "shadow-neu sm:text-gray-500"
          }
          `}
        onClick={() => {
          category === el.slug
            ? dispatch({ type: "DESELECT_CATEGORY" })
            : dispatch({ type: "SELECT_CATEGORY", category: el.slug });
        }}
      >
        {el.name}
      </li>
    ));
  };

  return (
    <>
      <div
        style={{ backgroundColor: "#EBECF0" }}
        className="sm:w-1/4 rounded-lg text-xl lg:text-2xl pl-8 md:pl-12 lg:pl-16 py-8 sm:pt-16 mx-6 sm:mx-0 mb-8 sm:mb-0"
      >
        <div className="mb-6 sm:mb-20">
          <h6 className="font-semibold mb-8">Brands</h6>
          <ul className="flex flex-row flex-wrap sm:block sm:space-y-4">
            {renderBrands()}
          </ul>
        </div>
        <div className="mb-6 sm:mb-20">
          <h6 className="font-semibold mb-8">Categories</h6>
          <ul className="flex flex-row flex-wrap sm:block sm:space-y-4">
            {renderCategories()}
          </ul>
        </div>
        <div className="mb-12 sm:mb-20">
          <h6 className="font-semibold mb-8">Price </h6>
          <div className="mr-12 lg:mr-16">
            <InputRange
              draggableTrack
              maxValue={CONSTANT.maxValue}
              minValue={CONSTANT.minValue}
              value={setPrice}
              aria-labelledby="Set Price Range"
              aria-controls="Set Price Range"
              onChange={(value) => {
                dispatch({
                  type: "SET_PRICE",
                  setPrice: Object.assign({}, value),
                });
              }}
              onChangeComplete={(value) =>
                dispatch({
                  type: "SET_PRICE",
                  setPrice: Object.assign({}, value, { altered: true }),
                })
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
