import React, { useState } from "react";
import NextLink from "next/link";
import { ArrowLeft, ArrowRight } from "react-feather";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "@popmotion/popcorn";
import { withSize } from "react-sizeme";

const time = {
  duration: 0.7,
  delay: 0.4,
};

const circleVariants = {
  enter: ({ sneakers, existingColorIndex, width }) => {
    return {
      backgroundColor: sneakers[existingColorIndex].bgColor,
      width: width >= 640 ? "45%" : "65%",
      margin: "0 auto",
      padding: width >= 640 ? "23% 0px" : "32% 0px",
      borderRadius: "50%",
    };
  },
  visible: ({ sneakers, imageIndex, existingColorIndex }) => {
    return {
      scale: [1, 0.5, 1.2, 1, 1.1, 1],
      backgroundColor: [
        sneakers[existingColorIndex].bgColor,
        sneakers[existingColorIndex].bgColor,
        sneakers[imageIndex].bgColor,
        sneakers[imageIndex].bgColor,
        sneakers[imageIndex].bgColor,
        sneakers[imageIndex].bgColor,
      ],

      transition: {
        duration: 1.5,
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.6, 0.7, 1],
        delay: 0,
      },
    };
  },
};

const sneakerLeftVariants = {
  enter: ({ width }) => {
    return {
      x: "-250%",
      y: "-70%",
      left: width >= 640 ? "37%" : "33%",
      top: "40%",
      width: width >= 640 ? "40%" : "55%",
      position: "absolute",
      zIndex: 20,
    };
  },
  visible: {
    x: "-50%",
    y: "-50%",
    rotate: ["-60deg", "0deg"],
    transition: {
      ease: "easeInOut",
      times: [0, 1],
      duration: time.duration,
      delay: time.delay,
    },
    transitionEnd: {
      zIndex: 0,
    },
  },
  exit: (direction) => {
    return {
      x: "-300%",
      y: "-70%",
      rotate: direction >= 1 ? ["0deg", "110deg"] : ["0deg", "-110deg"],
      zIndex: 20,
      transition: {
        ease: [0.83, 0, 0.17, 1],
        times: [0, 1],
        duration: time.duration,
      },
    };
  },
};

const sneakerRightVariants = {
  enter: ({ width }) => {
    return {
      x: "250%",
      y: "-70%",
      left: width >= 640 ? "65%" : "70%",
      top: width >= 640 ? "56%" : "60%",
      filter: "blur(0.8px)",
      width: width >= 640 ? "37%" : "50%",
      position: "absolute",
    };
  },

  visible: {
    x: "-50%",
    y: "-50%",
    rotate: ["60deg", "-30deg"],
    transition: {
      ease: "easeInOut",
      duration: time.duration,
      times: [0, 1],
      delay: time.delay,
    },
  },

  exit: (direction) => {
    return {
      x: "250%",
      y: "-50%",
      rotate: direction >= 1 ? ["-30deg", "-110deg"] : ["-30deg", "110deg"],
      transition: {
        ease: [0.83, 0, 0.17, 1],
        times: [0, 1],
        duration: time.duration,
      },
    };
  },
};

const sneakerNameVatiants = {
  enter: () => {
    return {
      x: "0%",
      y: "-300%",
      // rotate: "0deg",
      opacity: 0,
    };
  },
  visible: () => {
    return {
      x: "0%",
      y: "0%",
      rotate: ["15deg", "0deg", "-10deg", "5deg", "0deg"],
      opacity: 1,
      transition: {
        duration: 1,
        times: [0, 0.4, 0.6, 0.7, 1],
        type: "spring",
        stiffness: 100,
      },
    };
  },
  exit: () => {
    return {
      x: "0%",
      y: "-300%",
      opacity: 0,
      rotate: "-15deg",
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
      transitionEnd: {
        display: "none",
      },
    };
  },
};

const sneakerNameAboveSmVatiants = {
  enter: () => {
    return {
      x: "-150%",
      opacity: 0,
      transition: {},
    };
  },
  visible: () => {
    return {
      x: "0%",
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        delay: 0.6,
      },
    };
  },
  exit: () => {
    return {
      x: "180%",
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
      transitionEnd: {
        display: "none",
      },
    };
  },
};

const HomeHeading = ({ sneakers, size: { width } }) => {
  const [[iteration, direction], setCycle] = useState([0, 0]);

  const cycling = (newDirection) => {
    setCycle([iteration + newDirection, newDirection]);
  };

  const imageIndex = wrap(0, sneakers.length, iteration);

  let existingColorIndex;
  if (direction === 1) {
    existingColorIndex = wrap(0, sneakers.length, iteration - 1);
  }
  if (direction === -1) {
    existingColorIndex = wrap(0, sneakers.length, iteration + 1);
  }
  if (direction === 0) {
    existingColorIndex = 0;
  }

  const splitTextIntoMultipleLinesAndRender = (name) => {
    let maxTextLength = 3;
    const textArray = name.split(" ");
    const newArr = [];
    for (let i = 0; i < textArray.length; i = i + maxTextLength) {
      newArr.push(textArray.slice(i, i + maxTextLength).join(" "));
    }
    return newArr.map((el, i) => (
      <span className="mr-1" key={i}>
        {el}
      </span>
    ));
  };

  return (
    <div className="main-wrapper">
      <div className="heading-wrapper z-10">
        <div className="heading flex flex-row sm:flex-col">
          <span className="sm:text-base md:text-lg font-semibold hidden sm:block">
            NEW IN --
          </span>
          <span className="sneaker-name sm:mt-8 text-3xl sm:text-2xl md:text-3xl font-bold text-center sm:text-left w-full sm:w-auto">
            <AnimatePresence custom={direction}>
              <motion.div
                className="capitalize"
                variants={
                  width >= 640
                    ? sneakerNameAboveSmVatiants
                    : sneakerNameVatiants
                }
                initial="enter"
                animate="visible"
                exit="exit"
                key={iteration}
                custom={{ width, direction }}
              >
                <NextLink
                  href={`/sneakers/${sneakers[imageIndex].sneaker.slug}`}
                >
                  <a className="sm:flex sm:flex-col">
                    {splitTextIntoMultipleLinesAndRender(
                      sneakers[imageIndex].sneaker.name
                    )}
                  </a>
                </NextLink>
              </motion.div>
            </AnimatePresence>
          </span>
          <NextLink href={`/sneakers/${sneakers[imageIndex].sneaker.slug}`}>
            <a className="sm:border-b-2 sm:border-black sm:text-base md:text-lg sm:self-start sm:pb-1 font-semibold hidden sm:block cursor-pointer">
              Buy Now
            </a>
          </NextLink>
        </div>
      </div>
      <div className="relative overflow-hidden py-64 sm:py-40">
        <div className="center">
          <motion.div
            className="circle"
            custom={{
              sneakers,
              imageIndex,
              existingColorIndex,
              width,
            }}
            variants={circleVariants}
            initial="enter"
            animate="visible"
            key={iteration}
          />

          <AnimatePresence custom={direction}>
            <motion.div
              className="sneaker-left-container"
              custom={{ direction, width }}
              variants={sneakerLeftVariants}
              initial="enter"
              animate="visible"
              exit="exit"
              key={iteration}
            >
              <motion.img
                src={`${process.env.API}${sneakers[imageIndex].sneaker.images[4].formats.small.url}`}
                className="sneaker-left"
                alt="sneaker-left-photo"
                animate={{
                  rotate: ["0deg", "5deg", "0deg"],
                }}
                transition={{
                  duration: 5,
                  loop: Infinity,
                  delay: time.duration,
                }}
              />
            </motion.div>
          </AnimatePresence>
          <AnimatePresence custom={direction}>
            <motion.div
              className="sneaker-right-container"
              variants={sneakerRightVariants}
              initial="enter"
              animate="visible"
              exit="exit"
              key={iteration}
              custom={{ direction, width }}
            >
              <motion.img
                src={`${process.env.API}${sneakers[imageIndex].sneaker.images[0].formats.small.url}`}
                className="sneaker-right"
                alt="sneaker-right-photo"
                animate={{
                  rotate: ["0deg", "-5deg", "0deg"],
                }}
                transition={{
                  duration: 5,
                  loop: Infinity,
                  delay: time.duration,
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="button-wrapper sm:ml-6">
        <button
          className="group px-8 py-2 outline-none bg-black hover:bg-gray-500 transition-colors duration-500"
          onClick={() => cycling(-1)}
          aria-label="Cycle to previous sneaker"
        >
          <ArrowLeft className="text-white group-hover:text-black" size={18} />
        </button>
        <button
          className="group px-8 py-2 outline-none bg-white hover:bg-black transition-colors duration-500"
          onClick={() => cycling(1)}
          aria-label="Cycle to next sneaker"
        >
          <ArrowRight className="text-black group-hover:text-white" size={18} />
        </button>
      </div>
      <style>{`
        .main-wrapper {
          margin-top: -10rem;
        }
        .button-wrapper {
          position: absolute;
          bottom: 0;
          left: 0%;
        }

        .heading-wrapper {
          position: absolute;
          transform: translateY(-50%);
          width: 100%;
          bottom: 10%;
        }
        @media (min-width: 640px) {
          .main-wrapper {
            margin-top: 0
          }
          .heading-wrapper {
            top: 55%;
            left: 2%;
            width: auto;
          }
          .sneaker-name {
            min-height: 110px;
          }
        }
        @media (min-width: 768px) {
        }
        @media (min-width: 1024px) {
        }
        @media (min-width: 1280px) {
        }
      `}</style>
    </div>
  );
};

export default withSize()(HomeHeading);
