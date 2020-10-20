import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown } from "react-feather";

const titleVariants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      x: { stiffness: 1000, velocity: -100 },
    },
    display: "flex",
  },
  closed: {
    x: 100,
    opacity: 0,
    transition: {
      x: { stiffness: 1000 },
    },
    transitionEnd: {
      display: "none",
    },
  },
};

const sectionVariants = {
  open: {
    y: 0,
    height: "auto",
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      y: { stiffness: 1000, velocity: -100 },
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
  collapsed: {
    y: 20,
    height: 0,
    opacity: 0,
    scale: 0.7,
    transition: {
      duration: 0.4,
      y: { stiffness: 1000 },
      ease: [0.65, 0, 0.35, 1],
    },
  },
};

const Accordion = ({
  i,
  title,
  children,
  isOpen,
  expanded,
  setExpanded,
  toggleOpen,
}) => {
  const isExpanded = +i === expanded;

  useEffect(() => {
    isOpen === false ? setExpanded(false) : false;
  }, [isOpen]);

  return (
    <>
      <motion.li
        initial={false}
        onClick={() => setExpanded(isExpanded ? false : +i)}
        variants={titleVariants}
        className="flex justify-between text-3xl p-10 uppercase cursor-pointer"
      >
        <>{title}</>
        <>{isExpanded ? <ChevronDown /> : <ChevronRight />}</>
      </motion.li>
      <AnimatePresence initial={false}>
        {isOpen && isExpanded && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={sectionVariants}
            custom={+i}
            onClick={() => toggleOpen()}
          >
            {children}
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default Accordion;
