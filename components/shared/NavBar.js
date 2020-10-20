import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MenuToggle from "components/UI/nav/MenuToggle";
import MobileNavigation from "components/UI/nav/MobileNavigation";
import { BsChevronExpand } from "react-icons/bs";
import useSwr from "swr";
import { fetcher } from "services/fetcher";
import { ReactSVG } from "react-svg";
import NextLink from "next/link";
import { useFilter } from "services/FilterContext";
import DropdownDesktop from "components/UI/nav/DropdownDesktop";

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
      width: 0,
      transition: {
        delay: 0.26,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    };
  },
};

const SideNav = ({ width, isSideNavOpen, toggleSideNavOpen, delay }) => {
  const [isDropdownShown, toggleDropdownShown] = useState({
    brand: false,
    category: false,
    about: false,
  });
  const { dispatch } = useFilter();
  const { data: brands, error: brandError } = useSwr(
    `${process.env.API}/brands`
  );
  const { data: categories, error: categoryError } = useSwr(
    `${process.env.API}/categories`
  );

  useEffect(() => {
    // this is to hide the parent/ body HTML scrollbar when sidenav is opened
    document.body.style.overflowY = isSideNavOpen ? "hidden" : "auto";
  }, [isSideNavOpen]);

  return (
    <>
      <div className="flex items-center">
        {width < 1024 ? (
          <motion.nav
            initial={isSideNavOpen ? "open" : "closed"}
            animate={isSideNavOpen ? "open" : "closed"}
            className="flex flex-row items-center"
          >
            <motion.div
              custom={delay}
              className="background"
              variants={backgroundVariants}
              initial={{ backgroundColor: "#f3f3f9" }}
            />
            <MenuToggle toggle={toggleSideNavOpen} />
            <MobileNavigation
              isOpen={isSideNavOpen}
              toggleOpen={toggleSideNavOpen}
              delay={delay}
              brands={brands}
              categories={categories}
            />
          </motion.nav>
        ) : (
          <ul className="flex flex-row items-center space-x-16 text-3xl font-bold">
            <li className="flex items-center space-x-2">
              <span
                onClick={() => {
                  dispatch({ type: "DESELECT_BRAND" });
                  dispatch({ type: "DESELECT_CATEGORY" });
                  toggleDropdownShown(({ brand }) => ({
                    category: false,
                    about: false,
                    brand: !brand,
                  }));
                }}
                className="cursor-pointer text-gray-700 hover:text-purple-700"
              >
                Brands
              </span>
              <span>
                <BsChevronExpand size={15} className="stroke-current" />
              </span>

              <DropdownDesktop
                left="1%"
                showAll={true}
                isDropdownShown={isDropdownShown.brand}
                toggleDropdownShown={toggleDropdownShown}
              >
                {brands &&
                  brands.map((brand, i) => (
                    <NextLink href="/sneakers" key={i}>
                      <a
                        className="flex justify-between items-center space-x-6"
                        onClick={() => {
                          dispatch({
                            type: "SELECT_BRAND",
                            brand: brand.slug,
                          });
                        }}
                      >
                        <span className="text-gray-600 group-hover:text-purple-700 transform duration-300 capitalize">
                          {brand.name}
                        </span>
                        <span className="text-gray-600 group-hover:text-purple-700 fill-current transform duration-300">
                          <ReactSVG
                            src={`${process.env.API}${brand.logo.url}`}
                            alt={`${brand.name} logo`}
                            className="w-16"
                          />
                        </span>
                      </a>
                    </NextLink>
                  ))}
              </DropdownDesktop>
            </li>
            <li className="flex items-center space-x-2 text-gray-700 hover:text-purple-700">
              <span
                className="cursor-pointer"
                onClick={() => {
                  dispatch({ type: "DESELECT_BRAND" });
                  dispatch({ type: "DESELECT_CATEGORY" });
                  toggleDropdownShown(({ category }) => ({
                    category: !category,
                    about: false,
                    brand: false,
                  }));
                }}
              >
                Category
              </span>
              <span>
                <BsChevronExpand size={15} className="stroke-current" />
              </span>

              <DropdownDesktop
                left="12%"
                showAll={false}
                isDropdownShown={isDropdownShown.category}
                toggleDropdownShown={toggleDropdownShown}
              >
                {categories &&
                  categories.map((category, i) => (
                    <NextLink href="/sneakers" key={i}>
                      <a
                        className="flex justify-between items-center space-x-6"
                        onClick={() => {
                          dispatch({
                            type: "SELECT_CATEGORY",
                            category: category.slug,
                          });
                        }}
                      >
                        <span className="text-gray-600 group-hover:text-purple-700 transform duration-300 capitalize">
                          {category.name}
                        </span>
                      </a>
                    </NextLink>
                  ))}
              </DropdownDesktop>
            </li>
            <li className="flex items-center space-x-2 text-gray-700 hover:text-purple-700">
              <span
                className="cursor-pointer"
                onClick={() => {
                  dispatch({ type: "DESELECT_BRAND" });
                  dispatch({ type: "DESELECT_CATEGORY" });
                  toggleDropdownShown(({ about }) => ({
                    category: false,
                    about: !about,
                    brand: false,
                  }));
                }}
              >
                About
              </span>
              <span>
                <BsChevronExpand size={15} className="stroke-current" />
              </span>

              <DropdownDesktop
                left="25%"
                showAll={false}
                isDropdownShown={isDropdownShown.about}
                toggleDropdownShown={toggleDropdownShown}
              >
                <NextLink href="/about-us">
                  <a className="flex justify-between items-center space-x-6">
                    <span className="text-gray-600 group-hover:text-purple-700 transform duration-300 capitalize">
                      about us
                    </span>
                  </a>
                </NextLink>
                <NextLink href="/contact-us">
                  <a className="flex justify-between items-center space-x-6">
                    <span className="text-gray-600 group-hover:text-purple-700 transform duration-300 capitalize">
                      contact us
                    </span>
                  </a>
                </NextLink>
              </DropdownDesktop>
            </li>
          </ul>
        )}
      </div>
      <style>{`
        .background {
          position: absolute;
          top: 64px;
          left: 0;
          height: calc(100vh - 64px);
          z-index: 10
        }
        .nav-dropdown {
          position: absolute;
          top: 64px;
          background-color: #e2e8f0;
          min-width: 240px;
        }
        .nav-dropdown::after {
          position: absolute;
          content: " ";
          bottom: 100%;
          left:15%;
          border:solid transparent;
          height: 0;
          width: 0;
          pointer-events: none;
          border-color: transparent;
          border-bottom-color: #e2e8f0;
          border-width: 10px;
          margin-left: -10px;

        }
      `}</style>
    </>
  );
};

export default SideNav;
