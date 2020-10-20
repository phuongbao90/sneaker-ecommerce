import NextLink from "next/link";
import { useFilter } from "services/FilterContext";
import Img from "react-cool-img";

const Intro = () => {
  const { dispatch } = useFilter();
  return (
    <>
      <div className="intro relative overflow-hidden sm:flex sm:flex-row">
        <img
          // src="/images/home/intro-adidas/cloud-2.png"
          src="/images/home/intro-adidas/cloud-2-resized.jpg"
          alt="background image of a cloud"
          className="hidden sm:block cloud z-0 absolute bottom-0 w-full h-full"
        />
        <div className="box-text order-last sm:self-center sm:flex-1 sm:px-8 z-10">
          <h5 className="text-4xl mb-8 uppercase font-extrabold">
            Adidas <br className="hidden sm:block" /> Introduces
          </h5>
          <div className="text-xl sm:text-4xl sm:leading-10 mb-16">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat
            assumenda magni perspiciatis distinctio accusantium?
          </div>
          <span className="hidden sm:inline-block text-xl uppercase">
            <NextLink href="/sneakers">
              <a
                onClick={() => {
                  dispatch({ type: "SELECT_BRAND", brand: "adidas" });
                  dispatch({
                    type: "DESELECT_CATEGORY",
                  });
                }}
                aria-label="Checkout our adidas collection here."
              >
                <span className="border-4 border-r-0 border-black px-8 py-3">
                  Explore here
                </span>
                <span className="py-3 px-5 bg-red-600 border-red-600 border-4 text-white">
                  +
                </span>
              </a>
            </NextLink>
          </span>
        </div>
        <div className="box-brand">
          <div className="brand sm:hidden">AIR</div>
        </div>
        <div className="w-full sm:hidden">
          {/* <img
            src={`${process.env.API}/uploads/small_adidas_pharrell_williams_hu_holi_nmd_mc_ac7034_5_706fb627b5.png`}
            className="img-mobile max-w-none translate-center absolute"
            alt="Adidas sneaker image"
          /> */}
          <Img
            style={{ backgroundColor: "transparent" }}
            src={`${process.env.API}/uploads/small_adidas_pharrell_williams_hu_holi_nmd_mc_ac7034_5_706fb627b5.png`}
            alt="an image of adidas sneaker"
            className="sneaker-intro-mobile max-w-none translate-center absolute"
          />
        </div>

        <div className="w-full sm:self-center sm:flex-1 z-10">
          {/* <img
            src={`${process.env.API}/uploads/small_adidas_pharrell_williams_hu_holi_nmd_mc_ac7034_4_5ca0a22f92.png`}
            className="img-desktop hidden sm:block"
            alt="an image of adidas sneaker"
          /> */}
          <Img
            style={{
              backgroundColor: "transparent",
            }}
            src={`${process.env.API}/uploads/small_adidas_pharrell_williams_hu_holi_nmd_mc_ac7034_4_5ca0a22f92.png`}
            className="img-desktop hidden sm:block"
            alt="an image of adidas sneaker"
          />
        </div>
        <span className="intro-cta absolute text-gray-300 text-xl sm:hidden">
          <NextLink href="/sneakers">
            <a
              onClick={() => {
                dispatch({ type: "SELECT_BRAND", brand: "adidas" });
                dispatch({
                  type: "DESELECT_CATEGORY",
                });
              }}
              className="uppercase px-12 py-4 rounded-full border-gray-300 border-2 inline-block mb-2"
              aria-label="Checkout our adidas collection here."
            >
              Explore here
            </a>
          </NextLink>
          <div className="text-center text-lg">Our Adidas collection</div>
        </span>
      </div>

      <style jsx>{`
        @media (max-width: 639px) {
          .intro {
            background-image: linear-gradient(
              to top,
              #bc66c5,
              #8485e2 30%,
              #449ce6,
              #1fabd7,
              #4cb4c0,
              #5bbbb8,
              #6ec1b0,
              #83c6a8,
              #81cea4,
              #82d59f,
              #86dc98,
              #8de38f
            );
            min-height: 72rem;
          }
          .box-text {
            width: 70%;
            position: absolute;
            top: 8%;
            left: 10%;
          }

           {
            /* .img-mobile {
            top: 55%;
            left: 40%;
            width: 120%;
            max-width: 65rem;
          } */
          }
          .box-brand {
            position: absolute;
            top: 0;
            right: 0;
            transform: rotate(-90deg) translate(0, -100%);
            transform-origin: 100% 0;
            filter: opacity(40%);
          }
          .brand {
            font-size: 65vw;
            z-index: 2;
            line-height: 0.7;
            color: gray;
            font-weight: 700;
          }
          .intro-cta {
            transform: translate(-50%, -50%);
            bottom: 0;
            left: 50%;
          }
        }

        @media (min-width: 768px) {
          .box-text h5 {
            font-size: 3.7rem;
            background: -webkit-linear-gradient(#ff0000, #c41e3d);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            line-height: 1.15;
          }
          .cloud {
            filter: blur(4px) brightness(1) contrast(1);
          }
        }
      `}</style>
    </>
  );
};

export default Intro;
