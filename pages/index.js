import HomeHeading from "components/UI/HomeHeading";
import DiscoverNew from "components/UI/DiscoverNew";
import Intro from "components/UI/Intro";
import Subscription from "components/UI/Subscription";
import CollectionBrief from "components/UI/CollectionBrief";
import CollectionDetail from "components/UI/CollectionDetail";
import axios from "axios";
import { NextSeo } from "next-seo";

const Home = ({ features, pumas, newArrivalSneakers }) => {
  return (
    <>
      <NextSeo
        title="Shop Authentic Shoes"
        description="Shop 100% authentic Nike shoes, including Nike Air Force 1, Nike Air Max, Nike Dunks, Nike Basketball &amp; more. Plus, we carry Air Jordan, Adidas, Puma, Reebok, Creative Recreation &amp; more."
      />

      <main>
        <div className="sm:mb-20 home-heading">
          <HomeHeading sneakers={features} />
        </div>
        <div className="py-24">
          <DiscoverNew sneakers={newArrivalSneakers} />
        </div>
        <div className="sm:mt-20 sm:mb-40">
          <Intro />
        </div>
        <div>
          <CollectionBrief />
        </div>
        <div>
          <CollectionDetail sneakers={pumas} />
        </div>
        <div>
          <Subscription />
        </div>
      </main>
      <style jsx>{`
        .home-heading {
          min-height: 60vh;
        }

        @media (min-width: 640px) {
          .home-heading {
            min-height: 50vh;
          }
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

export async function getServerSideProps() {
  const homeData = await axios.get(`${process.env.API}/home`);
  const newArrival = await axios.get(
    `${process.env.API}/sneakers?_sort=created_at:DESC&_limit=24`
  );
  const resPumas = await axios.get(
    `${process.env.API}/sneakers?brand.name=puma&_sort=created_at:DESC&_limit=12`
  );

  return {
    props: {
      features: homeData.data.headSlider,
      newArrivalSneakers: newArrival.data,
      pumas: resPumas.data,
    },
  };
}

export default Home;
