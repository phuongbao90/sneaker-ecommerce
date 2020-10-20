import { motion } from "framer-motion";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
    display: "block",
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
    transitionEnd: {
      display: "none",
    },
  },
};

const colors = [
  "#d16ba5",
  "#c777b9",
  "#ba83ca",
  "#aa8fd8",
  "#9a9ae1",
  "#8aa7ec",
  "#79b3f4",
  "#69bff8",
  "#52cffe",
  "#41dfff",
  "#46eefa",
  "#5ffbf1",
];

const Component = ({ i }) => {
  return (
    <>
      <motion.li variants={variants}>
        <hr
          className="my-8"
          style={{ height: "1px", backgroundColor: colors[i] }}
        />
        <style>{`
          hr {
            width: 170px
          }
          @media (min-width: 375px) {
            hr {
              width: 210px
            }
            
          }
        `}</style>
      </motion.li>
    </>
  );
};

export default Component;
