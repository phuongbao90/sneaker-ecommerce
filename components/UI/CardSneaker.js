import NextLink from "next/link";
import React from "react";
import { ArrowRight } from "react-feather";
import { motion, AnimatePresence } from "framer-motion";

const CardSneaker = ({ slug, imgUrl, brand, name, price }) => (
  <>
    <div>
      <div className="card flex flex-col items-center sm:items-start relative">
        <div className="img-wrapper relative bg-purple-300 rounded-xl sm:rounded-xxl">
          <NextLink href={`/sneakers/${slug}`}>
            <a>
              <img
                src={`${imgUrl}`}
                alt={`${name} photo`}
                className="absolute max-w-none"
              />
            </a>
          </NextLink>
        </div>
        <div className="mt-2 sm:mt-6">
          <h6 className="text-base sm:text-lg lg:text-2xl text-gray-700 font-semibold absolute sm:relative sm:hidden brand capitalize">
            {brand}
          </h6>
          <h6 className="name text-base sm:text-xl lg:text-2xl text-gray-700 font-semibold absolute sm:relative capitalize">
            <NextLink href={`/sneakers/${slug}`}>
              <a>{name}</a>
            </NextLink>
          </h6>
          <span className="price text-2xl sm:text-3xl lg:text-5xl font-semibold mt-0 sm:mt-2 inline-block text-orange-900 absolute sm:relative">
            ${price}
          </span>
          <span className="action flex flex-row items-center mt-0 sm:mt-2 absolute sm:relative">
            <span className="mr-4 sm:mr-6 hidden sm:block">
              <NextLink href={`/sneakers/${slug}`}>
                <a className="text-lg lg:text-2xl text-orange-900">
                  View details
                </a>
              </NextLink>
            </span>
            <span>
              <NextLink href={`/sneakers/${slug}`}>
                <a>
                  <ArrowRight
                    color="#7b341e"
                    className="w-8 h-8 md:w-12 md:h-12"
                  />
                </a>
              </NextLink>
            </span>
          </span>
        </div>
      </div>
      <style jsx>{`
        .img-wrapper {
          width: 13rem;
          height: 18rem;
        }

        .img-wrapper img {
          transform: translate(-50%, -50%) rotate(-25deg);
          top: 60%;
          left: 60%;
          max-width: none;
          width: 120%;
        }

        .img-wrapper:hover img {
          transform: translate(-50%, -55%) rotate(-25deg);
          transition-duration: 500ms;
        }

        @media (max-width: 639px) {
          .card {
            width: 130px;
            margin: 0 auto;
          }
          .brand {
            top: 3%;
            left: 10%;
          }

          .name {
            top: 13%;
            left: 10%;
          }
          .price {
            top: 25%;
            left: 10%;
          }
          .action {
            bottom: 5%;
            right: 10%;
          }
        }
        @media (min-width: 640px) {
          .img-wrapper img {
            transform: translate(-50%, -50%) rotate(-25deg);
            top: 40%;
            left: 60%;
            width: 120%;
          }

          .img-wrapper {
            width: 12rem;
            height: 12rem;
          }
        }
        @media (min-width: 768px) {
          .img-wrapper {
            width: 14rem;
            height: 14rem;
          }
        }
        @media (min-width: 1024px) {
          .img-wrapper {
            width: 19rem;
            height: 19rem;
          }
        }
        @media (min-width: 1280px) {
          .img-wrapper {
            width: 23rem;
            height: 23rem;
          }
        }
      `}</style>
    </div>
  </>
);

export default CardSneaker;
