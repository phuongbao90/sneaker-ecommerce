import { motion } from "framer-motion";

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

const Component = ({ children }) => {
  return (
    <>
      <motion.span
        initial={false}
        variants={titleVariants}
        className="flex justify-between text-3xl p-10 uppercase cursor-pointer"
      >
        {children}
      </motion.span>
    </>
  );
};

export default Component;
