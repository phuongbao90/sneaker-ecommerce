import NextLink from "next/link";
import { useFilter } from "services/FilterContext";

const Component = () => {
  const { dispatch } = useFilter();

  return (
    <>
      <div className="wrapper sm:flex sm:flex-row relative">
        <div className="box-l sm:relative">
          <div className="heading translate-center z-20">
            <h4 className="">
              <span className="text-5xl md:text-6xl text-white sm:text-black">
                casual
              </span>
            </h4>
            <h4 className="ml-12">
              <span className="text-5xl md:text-6xl text-white sm:text-black">
                colle
              </span>
              <span className="text-5xl md:text-6xl text-white ">ction</span>
            </h4>
          </div>
          <div className="content translate-center">
            <h5 className="text-3xl md:text-4xl xl:text-5xl font-semibold mb-4">
              Lorem, ipsum dolor.
            </h5>
            <p className="text-lg md:text-xl xl:text-2xl mb-8">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Accusantium ullam reiciendis esse ea maxime ad consequuntur,
              excepturi distinctio culpa ipsum repellat!
            </p>
            <span className="px-6 py-3 text-xl xl:text-2xl bg-gray-900 text-white">
              <NextLink href="/sneakers">
                <a
                  onClick={() => {
                    dispatch({
                      type: "DESELECT_BRAND",
                    });
                    dispatch({
                      type: "SELECT_CATEGORY",
                      category: "casual",
                    });
                  }}
                >
                  view collection
                </a>
              </NextLink>
            </span>
          </div>

          <div className="img-top hidden sm:block sm:absolute z-0 bg-pink-500">
            <img
              src={`${process.env.API}/uploads/thumbnail_FW_4980_F19_001_01_236cfdb75d.png`}
              className="w-full z-0"
              alt="background photo"
            />
          </div>
        </div>
        <div className="box-r">
          <img
            // srcSet="
            // /api/image?url=/uploads/small_5_E5_AD_033_8277_47_EE_B287_371_F03455_C03_80255f9bfc.jpeg 333w,
            // /api/image?url=/uploads/medium_5_E5_AD_033_8277_47_EE_B287_371_F03455_C03_80255f9bfc.jpeg 500w,
            // /api/image?url=/uploads/large_5_E5_AD_033_8277_47_EE_B287_371_F03455_C03_80255f9bfc.jpeg 619w"
            src="/api/image?url=/uploads/medium_5_E5_AD_033_8277_47_EE_B287_371_F03455_C03_80255f9bfc.jpeg"
            // sizes="(min-width: 512px) 40vw, 100vw"
            className="w-full max-w-none"
            alt="background photo"
          />
        </div>
      </div>
      <style jsx>{`
        .box-r img {
          height: 100%;
          object-fit: cover;
        }
        @media (max-width: 639px) {
          .box-r {
            min-height: 48rem;
          }
          .content {
            left: 50%;
            width: 100%;
            padding: 2rem;
            bottom: -10%;
            color: white;
          }
          .heading {
            left: 50%;
            top: 10%;
            color: white;
          }
        }

        @media (min-width: 640px) {
          .box-r {
            min-height: 55rem;
            width: 50%;
          }
          .heading {
            top: 13%;
            left: 43%;
          }
          .content {
            top: 70%;
            left: 40%;
            width: 70%;
          }
          .box-l {
            width: 50%;
          }

          .img-top {
            width: 50%;
            top: 0;
            left: 40%;
          }
        }
        @media (min-width: 768px) {
          .box-l {
            width: 55%;
          }
          .box-r {
            width: 45%;
            min-height: 60rem;
          }
          .img-top {
            width: 40%;
          }
        }
      `}</style>
    </>
  );
};

export default Component;
