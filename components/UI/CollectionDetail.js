import { useState, useRef } from "react";
import NextLink from "next/link";
import Slider from "react-slick";
import { ArrowLeft, ArrowRight } from "react-feather";
import { useFilter } from "services/FilterContext";
import Img from "react-cool-img";

const Component = ({ sneakers }) => {
  const { dispatch } = useFilter();
  const [settings, setSettings] = useState({
    infinite: true,
    dots: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
    ],
  });

  const slider1 = useRef();
  const next = () => slider1.current.slickNext();
  const prev = () => slider1.current.slickPrev();

  return (
    <>
      <div className="wrapper relative md:flex md:flex-row">
        <div className="box-l z-10">
          <img
            src={`${process.env.API}/uploads/small_air_jordan_3_retro_jth_nrg_bio_beige_bio_beige_camellia_av6683_200_bstnstore_5_1_82f83dd178.jpeg?webp`}
            alt="Image background"
            className="img-l w-full h-full"
          />
        </div>
        <div className="box-r shadow-2xl bg-transparent z-20 py-10">
          <Slider {...settings} ref={(slider) => (slider1.current = slider)}>
            {sneakers.map((sneaker, i) => (
              <div className="sneaker" key={i}>
                <div className="w-full">
                  <NextLink href={`/sneakers/${sneaker.slug}`}>
                    <a>
                      <Img
                        style={{
                          backgroundColor: "transparent",
                        }}
                        src={`${process.env.API}${
                          sneaker.images.filter((el) =>
                            el.name.endsWith("-1")
                          )[0].formats.thumbnail.url
                        }`}
                        className="w-full sneaker-img-collection-detail"
                        alt={`${sneaker.name} photo`}
                      />
                      {/* <img
                        src={`${process.env.API}${
                          sneaker.images.filter((el) =>
                            el.name.endsWith("-1")
                          )[0].formats.thumbnail.url
                        }`}
                        className="w-full sneakers"
                        alt={`${sneaker.name} photo`}
                      /> */}
                    </a>
                  </NextLink>
                </div>
                <div className="text-center">
                  <NextLink href={`/sneakers/${sneaker.slug}`}>
                    <a>
                      <h6 className="text-2xl md:text-2xl lg:text-3xl font-semibold">
                        {sneaker.name}
                      </h6>
                    </a>
                  </NextLink>
                  <span className="text-3xl md:text-xl lg:text-2xl">
                    ${sneaker.price}
                  </span>
                </div>
              </div>
            ))}
          </Slider>
          <div
            className="absolute top-50 md:left-0 md:ml-10 arrow-left z-50"
            onClick={() => prev()}
          >
            <div className="cursor-pointer h-16 w-16 rounded-full bg-black flex justify-center items-center">
              <ArrowLeft size={32} color={"white"} />
            </div>
          </div>
          <div
            className="absolute top-50 md:right-0 md:mr-10 arrow-right z-50"
            onClick={() => next()}
          >
            <div className="cursor-pointer h-16 w-16 rounded-full bg-black flex justify-center items-center">
              <ArrowRight size={32} color={"white"} />
            </div>
          </div>

          <div className="text-center cta absolute w-full">
            <span className="px-8 py-4 bg-gray-900 text-white text-2xl sm:text-3xl cursor-pointer">
              <NextLink href="/sneakers">
                <a
                  className="capitalize"
                  onClick={() => {
                    dispatch({ type: "DESELECT_CATEGORY" });
                    dispatch({
                      type: "SELECT_BRAND",
                      brand: "puma",
                    });
                  }}
                >
                  <span className="hidden sm:inline-block">view</span>{" "}
                  <span>PUMA collection</span>
                </a>
              </NextLink>
            </span>
          </div>
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          max-height: 100rem;
        }
        .cta {
          transform: translate(-50%, -50%);
          left: 50%;
          bottom: -12%;
        }

        @media (max-width: 767px) {
          .wrapper {
            height: 90vh;
          }
          .box-l {
            height: 100%;
          }
          .box-l img {
            object-fit: cover;
          }
          .box-r {
            position: absolute;
            top: 70%;
            left: 50%;
            width: 90%;
            transform: translate(-50%, -50%);
            backdrop-filter: blur(3px);
            -webkit-backdrop-filter: blur(5px);
          }
          .arrow-right {
            right: -5%;
          }
          .arrow-left {
            left: -5%;
          }
        }

        @media (min-width: 768px) {
          .box-l {
            width: 40%;
            height: 46rem;
            min-height: 60rem;
          }
          .box-r {
            min-height: 25rem;
            position: absolute;
            transform: translateY(-50%);
            top: 50%;
            right: 0%;
            width: 75%;

            padding: 3rem 7rem;
          }
          .img-l {
            object-fit: cover;
            object-position: right;
          }
        }
        @media (min-width: 1024px) {
          .box-l {
            min-height: 70rem;
          }
          .box-r {
            padding: 5rem 7rem;
          }
        }
        @media (min-width: 1280px) {
          .box-l {
            height: 76.8rem;
          }
          .cta {
            bottom: -10%;
          }
        }
      `}</style>
    </>
  );
};

export default Component;
