import { useState, useEffect, useRef } from "react";
import NextLink from "next/link";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "react-feather";
import { ReactSVG } from "react-svg";
import _ from "lodash";
import Img from "react-cool-img";

const DiscoverNewSneakers = ({ sneakers }) => {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("adidas");
  const slider1 = useRef();

  const [settings, setSettings] = useState({
    dots: true,
    dotsClass: "slick-dots slick-thumb slick-dots-discovery",
    className: "text-center",
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: false,
  });

  useEffect(() => {
    setBrands(
      _.uniqBy(
        sneakers.map((el) => {
          return {
            ...el.brand,
          };
        }),
        function (el) {
          return el.id;
        }
      )
    );
  }, []);

  useEffect(() => {
    setSettings((settings) => ({
      ...settings,
      slidesToShow:
        sneakers.filter((el) => el.brand.slug === selectedBrand).length >= 2
          ? 2
          : 1,
    }));
  }, [selectedBrand]);

  return (
    <>
      <div className="flex flex-col md:flex-row relative">
        <div className="flex flex-row items-baseline md:block mb-8 ml-5 md:ml-0 md:mb-0 md:text-center md:relative md:w-2/12">
          <h4 className="title-big md:block text-4xl md:text-6xl md:font-bold md:absolute md:translate-center">
            Discover-
          </h4>

          <h5 className="title-small ml-4 md:ml-0 text-2xl md:text-3xl text-gray-600 md:absolute md:translate-center">
            New arrivals
          </h5>
        </div>

        <div className="card-wrapper order-last md:order-none md:text-center md:overflow-hidden pt-12 w-full md:w-9/12">
          <Slider ref={(slider) => (slider1.current = slider)} {...settings}>
            {sneakers
              .filter((sneaker) => sneaker.brand.slug === selectedBrand)
              .map((sneaker, i) => (
                <div
                  key={i}
                  className={`card outline-none px-8 sm:px-12 lg:px-24`}
                >
                  <div
                    className={`card-${
                      i % 2 === 0 ? "01 h-full" : "02"
                    } bg-purple-600 relative  rounded-xl`}
                  >
                    <span className="absolute top-0 left-0 text-white text-4xl sm:text-6xl font-bold pl-6 pt-4">
                      {`0${i + 1}`}
                    </span>

                    <Img
                      src={`${
                        sneaker.images.filter((el) =>
                          el.name.endsWith("-1.png")
                        )[0].formats.small.url
                      }`}
                      alt={`${sneaker.name} photo`}
                      className="card-image-discovery max-w-none"
                    />

                    <div className="card-body text-left flex flex-col justify-start">
                      <h5 className="card-title text-white capitalize text-xl sm:text-2xl lg:text-3xl xl:text-4xl mb-4 md:mb-8 lg:mb-12">
                        {sneaker.name}
                      </h5>
                      <span className="card-price text-white text-2xl sm:text-4xl lg:text-5xl">
                        ${sneaker.price}
                      </span>
                    </div>
                    <div className="cta-button absolute self-end bottom-0 right-0  text-white py-3 px-6 lg:py-6 lg:px-10 xl:py-8 xl:px-12 text-base md:text-xl lg:text-2xl xl:text-3xl bg-pink-600">
                      <NextLink href={`/sneakers/${sneaker.slug}`}>
                        <a
                          aria-label={`Hey checkout our ${sneaker.name} here.`}
                        >
                          Explore here
                        </a>
                      </NextLink>
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
        <div className="carousel-button hidden md:flex flex-row items-center md:absolute">
          <div
            className="flex flex-row items-center cursor-pointer"
            onClick={() => slider1.current.slickPrev()}
          >
            <span>
              <ChevronLeft />
            </span>
            <span className="md:font-semibold md:text-2xl lg:text-4xl xl:text-4xl">
              Prev
            </span>
          </div>

          <div
            className="flex flex-row items-center cursor-pointer md:ml-4 lg:ml-8"
            onClick={() => slider1.current.slickNext()}
          >
            <span className="md:font-semibold md:text-2xl lg:text-4xl xl:text-4xl">
              Next
            </span>
            <span>
              <ChevronRight />
            </span>
          </div>
        </div>
        <div className="flex flex-row justify-center md:flex-col md:items-center md:w-1/12 md:pr-8 md:pt-8">
          {brands &&
            brands.map((brand) => (
              <span
                key={brand.slug}
                className={`logo w-16 inline-block ${
                  brand.slug === selectedBrand ? "text-black" : "text-gray-400"
                } hover:text-black active:text-black transform transition-all duration-500 fill-current cursor-pointer ml-8 md:ml-0 md:mb-4`}
                onClick={() => setSelectedBrand(brand.slug)}
              >
                <ReactSVG
                  src={`${brand.logo.url}`}
                  alt={`${brand.name} logo`}
                />
              </span>
            ))}
        </div>
      </div>

      <style jsx>{`
        .card {
          height: 30rem;
          max-width: 200px;
        }
        .card-02 {
          height: 90%;
          margin-top: 20%;
        }
         {
          /* .card-image {
          position: absolute;
          transform: translate(-50%, -50%) rotate(-20deg);
          top: 35%;
          left: 43%;
          z-index: 2;
          width: 140%;
        } */
        }
        .card-body {
          position: absolute;
          bottom: 15%;
          left: 5%;
        }
        .cta-button {
          border-bottom-right-radius: 1.5rem;
        }

        @media (min-width: 420px) {
          .card {
            height: 36rem;
            max-width: 240px;
          }
        }

        @media (min-width: 640px) {
          .card {
            height: 42rem;
            max-width: 280px;
          }
        }
        @media (min-width: 768px) {
          .card {
            height: 46rem;
            max-width: 30.66rem;
          }
          .title-big {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-90deg);
          }
          .title-small {
            top: 50%;
            left: 80%;
            transform: translate(-50%, -50%) rotate(-90deg);
            width: 100%;
          }
          .carousel-button {
            z-index: 5;
            bottom: 5%;
            left: 2%;
          }
        }
        @media (min-width: 1024px) {
          .title-big {
            font-size: 6rem;
          }
          .title-small {
            font-size: 3rem;
            left: 90%;
            width: 250px;
          }
          .card {
            height: 55rem;
            max-width: 40rem;
          }
          .logo {
            width: 7.5rem;
          }
        }
        @media (min-width: 1280px) {
          .title-big {
            font-size: 7rem;
          }
          .title-small {
            font-size: 3.5rem;
          }
        }
      `}</style>
    </>
  );
};

export default DiscoverNewSneakers;
