import { motion } from "framer-motion";
import { isEmpty } from "lodash";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    // transition: {
    //   y: { stiffness: 1000, velocity: -100 },
    // },
    display: "flex",
  },
  closed: {
    y: 50,
    opacity: 0,
    // transition: {
    //   y: { stiffness: 1000 },
    // },
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

const Component = ({ i, user }) => {
  const style = { border: `2px solid ${colors[i]}` };

  return (
    <>
      <motion.li
        className="flex flex-col items-center mb-8 xs:mb-10"
        variants={variants}
      >
        <img
          src={
            user.avatar && !isEmpty(user.avatar)
              ? `${process.env.API}${user.avatar.url}`
              : `/images/others/Portrait_Placeholder.png`
          }
          alt="User Photo"
          className=" rounded-full object-center object-cover shadow-lg h-32 w-32 mb-4"
        />

        <span
          className="text-2xl xs:text-3xl capitalize text-center"
          style={{ color: colors[i] }}
        >
          {user.username}
        </span>
      </motion.li>
      <style>{`
        
      `}</style>
    </>
  );
};

export default Component;
