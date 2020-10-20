import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <>
    <div className="skeleton mb-8 sm:m-0 sm:p-8">
      <ContentLoader
        speed={2}
        width={300}
        height={390}
        viewBox="0 0 300 390"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        style={{ width: "100%", height: "auto" }}
        {...props}
      >
        <rect x="4" y="348" rx="5" ry="5" width="171" height="19" />
        <rect x="3" y="297" rx="5" ry="5" width="114" height="30" />
        <rect x="2" y="258" rx="5" ry="5" width="151" height="19" />
        <rect x="1" y="7" rx="15" ry="15" width="275" height="231" />
      </ContentLoader>
    </div>
  </>
);

export default MyLoader;
