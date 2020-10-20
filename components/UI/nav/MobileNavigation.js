import { useState } from "react";
import { motion } from "framer-motion";
import Accordion from "components/UI/nav/Accordion";
import NextLink from "next/link";
import { useAuth } from "services/AuthContext";
import MenuItem from "components/UI/nav/MenuItem";
import { ReactSVG } from "react-svg";
import { LogOut, User } from "react-feather";
import { useFilter } from "services/FilterContext";

const variants = {
  open: (delay) => ({
    display: "block",
    width: "100%",
    transition: {
      staggerChildren: 0.07,
      delayChildren: delay ? 0.7 + 0.2 : 0.2,
      delay: delay ? 0.7 : 0,
    },
  }),
  closed: (delay) => ({
    width: "0%",
    transition: {
      duration: 0.4,
      staggerChildren: 0.05,
      staggerDirection: -1,
      delay: 0.5,
    },
  }),
};

const Navigation = ({ isOpen, toggleOpen, delay, categories, brands }) => {
  const [expanded, setExpanded] = useState(false);
  const { logout, user } = useAuth();
  const { dispatch } = useFilter();

  // const { data: brands, error: brandError } = useSwr(
  //   `${process.env.API}/brands`,
  //   fetcher
  // );
  // const { data: categories, error: categoryError } = useSwr(
  //   `${process.env.API}/categories`,
  //   fetcher
  // );

  return (
    <>
      <motion.ul
        initial={false}
        variants={variants}
        className="nav-ul"
        custom={delay}
      >
        <Accordion
          isOpen={isOpen}
          i={0}
          title="shop"
          expanded={expanded}
          setExpanded={setExpanded}
          toggleOpen={toggleOpen}
        >
          <NextLink href="/sneakers">
            <a>
              <div
                className="text-3xl pl-16 pr-4 py-10 bg-white border-b-2 border-gray-200 hover:font-bold uppercase cursor-pointer"
                onClick={() => {
                  dispatch({ type: "DESELECT_BRAND" });
                  dispatch({ type: "DESELECT_CATEGORY" });
                }}
              >
                all
              </div>
            </a>
          </NextLink>
          {brands &&
            brands.map((brand, i) => (
              <NextLink href="/sneakers" key={i}>
                <div
                  className="flex justify-between items-center text-3xl pl-16 pr-4 py-6 bg-white border-b-2 border-gray-200 hover:font-bold uppercase cursor-pointer"
                  onClick={() => {
                    dispatch({ type: "SELECT_BRAND", brand: brand.slug });
                    dispatch({ type: "DESELECT_CATEGORY" });
                  }}
                >
                  <a>{brand.name}</a>
                  <ReactSVG
                    src={`${process.env.API}${brand.logo.url}`}
                    alt={`${brand.name} logo`}
                    className="w-20"
                  />
                </div>
              </NextLink>
            ))}
        </Accordion>
        <Accordion
          isOpen={isOpen}
          i={1}
          title="Collections"
          expanded={expanded}
          setExpanded={setExpanded}
          toggleOpen={toggleOpen}
        >
          {categories &&
            categories.map((category, i) => (
              <NextLink href="/sneakers" key={i}>
                <a>
                  <div
                    className="flex justify-between items-center text-3xl pl-16 pr-4 py-10 bg-white border-b-2 border-gray-200 hover:font-bold uppercase cursor-pointer"
                    onClick={() => {
                      dispatch({ type: "DESELECT_BRAND" });
                      dispatch({
                        type: "SELECT_CATEGORY",
                        category: category.slug,
                      });
                    }}
                  >
                    {category.name}
                  </div>
                </a>
              </NextLink>
            ))}
        </Accordion>
        <Accordion
          isOpen={isOpen}
          i={2}
          title="about"
          expanded={expanded}
          setExpanded={setExpanded}
          toggleOpen={toggleOpen}
        >
          <NextLink href="/about-us">
            <div className="flex items-center text-3xl pl-16 pr-4 py-10 bg-white border-b-2 border-gray-200 hover:font-bold uppercase cursor-pointer">
              <a>Company info</a>
            </div>
          </NextLink>
          <NextLink href="/contact-us">
            <div className="flex items-center text-3xl pl-16 pr-4 py-10 bg-white border-b-2 border-gray-200 hover:font-bold uppercase cursor-pointer">
              <a>contact us</a>
            </div>
          </NextLink>
        </Accordion>

        {user ? (
          <>
            <li>
              <NextLink href="/account">
                <a
                  onClick={() => toggleOpen()}
                  aria-label="Go to your account page"
                >
                  <MenuItem>
                    My account
                    <User />
                  </MenuItem>
                </a>
              </NextLink>
            </li>
            <li>
              <div
                onClick={() => {
                  logout();
                  toggleOpen();
                }}
              >
                <MenuItem>
                  <span>Logout</span>
                  <LogOut />
                </MenuItem>
              </div>
            </li>
          </>
        ) : null}
      </motion.ul>
      <style>{`
        .nav-ul {
          position: absolute;
          top: 64px;
          left: 0;
          z-index: 20;
          height: calc(100vh - 64px);
          overflow-y: ${isOpen ? "scroll" : "hidden"};
          overflow-x: hidden;
        }
      `}</style>
    </>
  );
};

export default Navigation;
