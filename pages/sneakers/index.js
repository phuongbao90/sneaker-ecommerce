import { useEffect } from "react";
import CardSneaker from "components/UI/CardSneaker";
import CardSkeleton from "components/UI/CardSkeleton";
import useSwr from "swr";
import Sidebar from "components/UI/Sidebar";
import { useFilter } from "services/FilterContext";
import { fetcher } from "services/fetcher";
import CardEmpty from "components/UI/CardEmpty";
import { CONSTANT } from "utils/Constant";
import { motion, AnimatePresence } from "framer-motion";
import { NextSeo } from "next-seo";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const Sneakers = () => {
  const { filterObj, dispatch } = useFilter();
  const { sneakers, nextDataLength, start } = filterObj;

  const { data, error } = useSwr(filterObj.getUrl(), fetcher);
  const { data: nextData, error: nextError } = useSwr(
    filterObj.getNextUrl(),
    fetcher
  );

  const renderSkeleton = (count) => {
    return Array(count)
      .fill(count)
      .map((el, i) => <CardSkeleton key={i} />);
  };

  const renderSneakers = () => {
    if (!sneakers)
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 row-gap-8 sm:ml-8 sm:pb-56">
          {renderSkeleton(CONSTANT.LIMIT)}
        </div>
      );

    if (sneakers.length === 0) return <CardEmpty />;

    return (
      <AnimatePresence>
        <motion.ul
          className="grid grid-cols-2 sm:grid-cols-3 row-gap-8 sm:ml-8 sm:pb-56"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {Array.from(sneakers).map((sneaker, i) => (
            <motion.li key={i} className="item" variants={item}>
              <CardSneaker
                key={`${i}-${sneaker.name}`}
                name={sneaker.name}
                slug={sneaker.slug}
                imgUrl={
                  sneaker.images.filter((el) => el.name.endsWith("-1.png"))[0]
                    .formats.thumbnail.url
                }
                brand={sneaker.brand.name}
                price={sneaker.price}
              />
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>
    );
  };

  useEffect(() => {
    dispatch({
      type: "SET_SNEAKERS",
      sneakers: data,
    });
  }, [data]);

  useEffect(() => {
    nextData &&
      dispatch({
        type: "CHECK_IS_MORE",
        nextDataLength: nextData.length,
      });
  }, [nextData]);

  return (
    <>
      <NextSeo
        title="Shop Authentic Shoes"
        description="Shop 100% authentic Nike shoes, including Nike Air Force 1, Nike Air Max, Nike Dunks, Nike Basketball &amp; more. Plus, we carry Air Jordan, Adidas, Puma, Reebok, Creative Recreation &amp; more."
      />
      <div className="wrapper flex flex-col sm:flex-row overflow-hidden">
        <Sidebar />
        <div className="w-full sm:w-3/4 bg-gray-100 rounded-lg relative">
          <h5 className="ml-8 my-16 text-4xl lg:text-5xl">Sneakers</h5>
          {renderSneakers()}
          <div className="action-wrapper">
            <div
              className={`actions text-2xl  ${
                sneakers && sneakers.length === 0 ? "hidden" : ""
              }`}
              style={{}}
            >
              <button
                onClick={() => dispatch({ type: "PREVIOUS_PAGE" })}
                disabled={start <= 0}
                className={`back inline-block py-6 pl-8 pr-20 ${
                  start === 0 ? "bg-gray-400" : "bg-purple-400"
                } text-white disable shadow-sm cursor-pointer`}
              >
                Back
              </button>
              <button
                onClick={() => dispatch({ type: "NEXT_PAGE" })}
                disabled={nextDataLength <= 0}
                className={`next inline-block py-6 pl-8 pr-20 ${
                  nextDataLength <= 0 ? "bg-gray-400" : "bg-purple-400"
                } text-white shadow-2xl cursor-pointer`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          padding-top: 2rem;
        }
        @media (max-width: 639px) {
          .action-wrapper {
            margin: 5rem 0;
          }
          .actions {
            text-align: center;
          }
        }
        @media (min-width: 640px) {
          .wrapper {
            min-height: 908px;
            padding-top: 0;
          }

          .action-wrapper {
            bottom: 4%;
            left: 35%;
            position: absolute;
            width: 100%;
          }
        }
        @media (min-width: 768px) {
        }
        @media (min-width: 1024px) {
          .wrapper {
            min-height: 1100px;
          }
        }
        @media (min-width: 1280px) {
        }
      `}</style>
    </>
  );
};

export async function getServerSideProps(ctx) {
  return {
    props: Object.assign({
      disableTransition: false,
    }),
  };
}

export default Sneakers;
