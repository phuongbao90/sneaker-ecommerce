import { motion } from "framer-motion";
import NextLink from "next/link";

const dropdownVariants = {
  initial: () => ({
    display: "none",
  }),
  open: (left) => ({
    display: "block",
    left: left,
    scale: [0, 1],
    transition: {
      duration: 0.4,
      ease: [0.34, 1.56, 0.64, 1],
    },
  }),
  closed: () => ({
    scale: [1, 0],
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
    transitionEnd: {
      display: "none",
    },
  }),
};

const DropdownDesktop = ({
  children,
  showAll,
  left,
  isDropdownShown,
  toggleDropdownShown,
}) => {
  return (
    <motion.ul
      variants={dropdownVariants}
      initial={isDropdownShown ? "open" : "closed"}
      animate={isDropdownShown ? "open" : "closed"}
      className="nav-dropdown space-y-4 rounded-lg py-6 px-8"
      custom={left || "1%"}
      onClick={() => {
        toggleDropdownShown({
          category: false,
          about: false,
          brand: false,
        });
      }}
    >
      <>
        {showAll && (
          <motion.li className="cursor-pointer group">
            <NextLink href="/sneakers">
              <a className="text-gray-600 group-hover:text-purple-700 transform duration-300 capitalize block">
                All
              </a>
            </NextLink>
          </motion.li>
        )}
        {children &&
          children.map((el, i) => (
            <motion.li className="cursor-pointer group" key={i}>
              {el}
            </motion.li>
          ))}
      </>
    </motion.ul>
  );
};

export default DropdownDesktop;
