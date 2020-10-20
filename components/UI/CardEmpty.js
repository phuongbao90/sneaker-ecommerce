import React from "react";

const CardEmpty = () => (
  <>
    <div className="flex flex-col items-center space-y-8 mb-16">
      <img
        className="w-1/3"
        src={`/images/sneakers/sad-icon.png`}
        alt="sad-icon"
      />

      <span className="text-3xl font-bold">Oops!</span>

      <p className="text-xl">
        Sorry, Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste,
        voluptas.
      </p>
    </div>
  </>
);

export default CardEmpty;
