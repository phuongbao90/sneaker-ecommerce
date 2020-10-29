import React from "react";
import Footer from "./Footer";
import Header from "./Header";
// import _JSXStyle from "styled-jsx/style";

const Layout = ({ children }) => {
  return (
    <>
      <div className="page-container">
        <Header />
        <div className="content-container">{children}</div>
        <Footer />
      </div>
      <style jsx>{`
        .page-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .content-container {
          padding-top: 1rem;
          min-height: calc(100vh - 64px - 350px);
        }
        @media (min-width: 640px) {
          .content-container {
            padding-top: 0;
          }
        }
      `}</style>
    </>
  );
};

export default Layout;
