import ReactMarkdown from "react-markdown";
import { NextSeo } from "next-seo";
import axios from "axios";

const AboutUs = ({ headingImage, content, crew }) => {
  return (
    <>
      <NextSeo
        title="About us"
        description="Shop 100% authentic Nike shoes, including Nike Air Force 1, Nike Air Max, Nike Dunks, Nike Basketball &amp; more. Plus, we carry Air Jordan, Adidas, Puma, Reebok, Creative Recreation &amp; more."
      />
      <div className="wrapper">
        <div className="heading-image-wrapper">
          <img
            src={`${process.env.API}${headingImage.url}`}
            alt="An image of sneaker store"
            className="heading-image"
          />
        </div>
        <div className="content text-lg my-8">
          <ReactMarkdown escapeHtml={true} source={content} />
        </div>
        <div>
          <h1 className="text-3xl font-semibold my-16">Meet our crews</h1>
          <div className="flex space-x-2">
            {crew.map((el, i) => (
              <a
                key={i}
                href={el.facebook}
                _target="true"
                aria-label={`Go to facebook page of ${el.name}`}
              >
                <div key={i} className="crew-wrapper rounded-full">
                  <img
                    src={`${process.env.API}${el.avatar.formats.thumbnail.url}`}
                    alt={`${el.name} portrait image`}
                    className="crew-image duration-200 rounded-full w-64 h-64 object-cover"
                  />
                  <span className="crew-name text-2xl font-semibold w-full text-center duration-300">
                    {el.name}
                  </span>
                  <span className="crew-position text-lg w-full text-center duration-500">
                    {String(el.position).toUpperCase()}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          max-width: 600px;
          margin: 0 auto;
          padding-top: 5rem;
          padding-bottom: 5rem;
          position: relative;
        }

        .crew-wrapper {
          position: relative;
        }

        .crew-wrapper:hover .crew-image {
          filter: blur(2px) brightness(80%);
        }

        .crew-name,
        .crew-position {
          opacity: 0;
          position: absolute;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
        }

        .crew-position {
          top: 65%;
        }

        .crew-wrapper:hover .crew-name,
        .crew-wrapper:hover .crew-position {
          opacity: 100;
        }

        @media (max-width: 639px) {
        }
        @media (min-width: 640px) {
        }
        @media (min-width: 768px) {
        }
        @media (min-width: 1024px) {
        }
        @media (min-width: 1280px) {
        }
      `}</style>
    </>
  );
};

export async function getStaticProps(context) {
  const {
    data: { headingImage, content, crew },
  } = await axios.get(`${process.env.API}/about-us`);

  return {
    props: {
      headingImage,
      content,
      crew,
    },
  };
}

export default AboutUs;
