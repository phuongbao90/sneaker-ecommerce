import { motion } from "framer-motion";
import { Search, X } from "react-feather";
import SearchForm from "components/UI/nav/SearchForm";
import { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import NextLink from "next/link";
import useSwr from "swr";

const backgroundVariants = {
  open: (delay) => {
    return {
      backgroundColor: "#f3f3f9",
      width: "100%",
      transition: {
        delay: delay ? 0.7 : 0,
        type: "spring",
        stiffness: 60,
        restDelta: 0.5,
      },
    };
  },
  closed: (delay) => {
    return {
      width: "0%",
      transition: {
        delay: 0.26,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    };
  },
};

const searchVariants = {
  open: (delay) => ({
    y: 0,
    x: 0,
    opacity: 1,
    display: "block",
    transition: {
      duration: 0.8,
      // staggerChildren: 0.07,
      // delayChildren: delay ? 0.7 + 0.2 : 0.2,
      delay: delay ? 0.8 : 0.1,
    },
  }),
  closed: () => ({
    y: 0,
    x: -200,
    opacity: 0,
    transition: {
      duration: 0.4,
      // staggerChildren: 0.05,
      // staggerDirection: -1,
    },
    transitionEnd: {
      display: "none",
    },
  }),
};

const SearchToggle = ({ isSearchOpen, toggleSearchOpen, delay }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [trendingSneakers, setTrendingSneakers] = useState([]);

  const { data, error } = useSwr(
    `${process.env.API}/sneakers?_sort=sold:DESC&_limit=6`
  );

  useEffect(() => {
    setTrendingSneakers(data);
  }, [data]);

  useEffect(() => {
    // this is to hide the parent/ body HTML scrollbar when searchBar is opened
    document.body.style.overflowY = isSearchOpen ? "hidden" : "auto";
  }, [isSearchOpen]);

  return (
    <>
      <motion.nav
        initial={isSearchOpen ? "open" : "closed"}
        animate={isSearchOpen ? "open" : "closed"}
        className="flex flex-row items-center"
      >
        <div onClick={() => toggleSearchOpen()}>
          {isSearchOpen ? <X /> : <Search />}
        </div>
        <motion.div
          custom={delay}
          className="background"
          variants={backgroundVariants}
          initial={{ backgroundColor: "#f3f3f9" }}
        />
        <motion.section
          custom={delay}
          variants={searchVariants}
          className="search-section w-full"
        >
          <div className="search-container h-full flex flex-col justify-center items-center mx-12">
            <SearchForm setSearchResults={setSearchResults} />
            {!isEmpty(searchResults) ? (
              <div className="w-full mt-16">
                <h4 className="mb-12 text-3xl">Results</h4>
                <div className="flex flex-row flex-wrap items-center underline text-2xl font-thin">
                  {searchResults.map((el, i) => (
                    <NextLink href={`/sneakers/${el.slug}`} key={i}>
                      <a
                        className="mr-8 mb-4 capitalize hover:text-indigo-700"
                        onClick={() => toggleSearchOpen()}
                      >
                        <span>{el.name}</span>
                      </a>
                    </NextLink>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="w-full mt-16">
              <h4 className="mb-12 text-3xl">Trends</h4>
              {!isEmpty(trendingSneakers) ? (
                <div className="flex flex-row flex-wrap items-center underline text-2xl font-thin">
                  {trendingSneakers.map((el, i) => (
                    <NextLink href={`/sneakers/${el.slug}`} key={i}>
                      <a
                        className="mb-4 mr-4 capitalize hover:text-indigo-700"
                        onClick={() => toggleSearchOpen()}
                      >
                        <span>{el.name}</span>
                      </a>
                    </NextLink>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </motion.section>
      </motion.nav>
      <style>
        {`
        .background {
          position: absolute;
          top: 64px;
          left: 0;
          height: calc(100vh - 64px);
          z-index: 10
        }
        .search-section {
          position: absolute;
          top: 64px;
          left: 0;
          z-index: 20;
          height: calc(100vh - 64px);
          overflow-y: ${isSearchOpen ? "hidden" : "hidden"};
          overflow-x: hidden;
        }
        input::-webkit-input-placeholder {
          font-size: 24px;
          line-height: 4;
        }
        input {
          height: 50px;
          font-size: 24px;
        }
      `}
      </style>
    </>
  );
};

export default SearchToggle;
