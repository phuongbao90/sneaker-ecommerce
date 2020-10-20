import "../styles/index.css";
import "react-input-range/lib/css/index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import Layout from "components/shared/Layout";
import { AuthProvider } from "services/AuthContext";
import { PageTransition } from "next-page-transitions";
import Loader from "components/shared/Loader";
import { FilterProvider } from "services/FilterContext";
import { DefaultSeo } from "next-seo";
import { SWRConfig } from "swr";

const TIMEOUT = 400;

export default function MyApp({ Component, pageProps, router }) {
  if (pageProps.error) {
    return (
      <Error
        statusCode={pageProps.error.statusCode}
        title={pageProps.error.message}
      />
    );
  }

  return (
    <>
      <SWRConfig
        value={{
          fetcher: (...args) => fetch(...args).then((res) => res.json()),
        }}
      >
        <DefaultSeo />
        <AuthProvider>
          <FilterProvider>
            <Layout>
              <PageTransition
                timeout={TIMEOUT}
                classNames={`${
                  pageProps.disableTransition ? "" : "page-transition"
                }`}
                loadingComponent={<Loader />}
                loadingDelay={500}
                loadingTimeout={{
                  enter: TIMEOUT,
                  exit: 0,
                }}
                loadingClassNames="loading-indicator"
              >
                <Component key={router.route} {...pageProps} />
              </PageTransition>
            </Layout>
          </FilterProvider>
        </AuthProvider>
      </SWRConfig>

      <style jsx global>{`
        .page-transition-enter {
          opacity: 0;
          transform: translate3d(0, 20px, 0);
        }
        .page-transition-enter-active {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          transition: opacity ${TIMEOUT}ms, transform ${TIMEOUT}ms;
        }
        .page-transition-exit {
          opacity: 1;
        }
        .page-transition-exit-active {
          opacity: 0;
          transition: opacity ${TIMEOUT}ms;
        }
        .loading-indicator-appear,
        .loading-indicator-enter {
          opacity: 0;
        }
        .loading-indicator-appear-active,
        .loading-indicator-enter-active {
          opacity: 1;
          transition: opacity ${TIMEOUT}ms;
        }
      `}</style>
    </>
  );
}
