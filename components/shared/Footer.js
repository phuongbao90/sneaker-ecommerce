import { ReactSVG } from "react-svg";
import NextLink from "next/link";
import { Facebook, Instagram, Youtube } from "react-feather";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="box-l">
          <div className="container">
            <div className="logo mb-8">
              <ReactSVG
                src="/images/logos/1517505968.svg"
                afterInjection={(error, svg) => {
                  if (error) return;
                }}
                beforeInjection={(svg) => {
                  svg.classList.add("svg-class-name");
                  svg.setAttribute(
                    "style",
                    "width: 85px; height: 80px; cursor: pointer"
                  );
                }}
                evalScripts="always"
                fallback={() => <span>Error!</span>}
                loading={() => <span>Loading</span>}
                wrapper="span"
                renumerateIRIElements={false}
                className="logo-wrapper mx-auto"
                onClick={() => {
                  Router.push("/");
                }}
              />
            </div>
            <div className="flex mb-10">
              <a
                href="https://www.instagram.com/"
                className="mr-4 cursor-pointer"
                aria-label="Go to our instagram page"
              >
                <Instagram className="text-gray-600 hover:text-purple-700 stroke-current" />
              </a>
              <a
                href="https://www.facebook.com/"
                className="mr-4 cursor-pointer"
                aria-label="Go to our facebook page"
              >
                <Facebook className="text-gray-600 hover:text-purple-700 stroke-current" />
              </a>
              <a
                href="https://www.youtube.com/"
                className="cursor-pointer"
                aria-label="Go to our youtube page"
              >
                <Youtube className="text-gray-600 hover:text-purple-700 stroke-current" />
              </a>
            </div>

            <div>
              <ul className="space-y-6 font-semibold">
                <li className="text-lg sm:text-xl text-gray-600 hover:text-purple-700">
                  <NextLink href="/about-us">
                    <a>About us</a>
                  </NextLink>
                </li>
                <li className="text-lg sm:text-xl text-gray-600 hover:text-purple-700">
                  <NextLink href="/contact-us">
                    <a>Contact us</a>
                  </NextLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="box-r">
          <div className="container">
            <p className="text-3xl sm:text-4xl font-bold mb-8">
              Lorem ipsum dolor sit, amet consectetur.
            </p>
            <p className="text-xl sm:text-2xl font-semibold mb-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
              deserunt fugiat soluta repellat quam, repudiandae at iure dolor.
            </p>
            <p className="text-lg sm:text-xl">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni
              incidunt aliquid praesentium fuga voluptates.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .footer {
          max-width: 1280px;
          background-color: #edf2f7;
          display: flex;
          flex-direction: row;
          padding-top: 7rem;
          padding-bottom: 7rem;
          padding-left: 2rem;
          padding-right: 2rem;
        }
        .box-l {
          flex-grow: 1;
          flex-basis: 40%;
        }
        .box-r {
          flex-grow: 1;
          flex-basis: 60%;
        }

        @media (min-width: 640px) {
          .footer {
            padding-left: 5rem;
            padding-right: 5rem;
          }
        }

        @media (min-width: 1024px) {
          .footer {
            padding-left: 10rem;
            padding-right: 10rem;
          }
        }
        @media (min-width: 1280px) {
          .footer {
            padding-left: 13rem;
            padding-right: 13rem;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;
