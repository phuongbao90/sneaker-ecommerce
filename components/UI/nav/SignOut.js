import { motion } from "framer-motion";
import NextLink from "next/link";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
    display: "flex",
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

const Component = ({ i, Icon, text, href }) => {
  const style = { border: `2px solid ${colors[i]}` };
  return (
    <>
      <NextLink href={`${href}`}>
        <a>
          <motion.li
            className="nav-li"
            variants={variants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon
              className=" icon-placeholder"
              color={colors[i]}
              style={style}
            />

            <h3
              className={`text-placeholder text-3xl capitalize`}
              style={{ color: colors[i] }}
            >
              {text}
            </h3>
          </motion.li>
        </a>
      </NextLink>
      <style>{`
        .nav-li {
          margin: 0;
          padding: 0;
          list-style: none;
          margin-bottom: 20px;
          align-items: center;
          cursor: pointer;
        }

        .icon-placeholder {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          flex: 40px 0;
          margin-right: 20px;
          padding: 5px;
        }
        
        .text-placeholder {
          // border-radius: 5px;
          // width: 200px;
          // height: 20px;
          // flex: 1;
        }
      `}</style>
    </>
  );
};

export default Component;
