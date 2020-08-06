import React from "react";

export default function Decorator({ image, fulltext, toDecorate }) {
  const splitted = fulltext.split(toDecorate);
  console.log(splitted);
  return (
    <>
      <span className="decorator__item">{splitted[0]}</span>
      <span>
        <p
          className="decorator__chosen--blue"
          style={
            {
              // background: "radial-gradient(circle, black, white)",
              // backgroundImage: `url(${image})`,
              // borderRadius: "100px",
              // backgroundImage:
              //   "linear-gradient(#22c1c3 40%, rgba(45,253,193,1) 30%)",
              // backgroundRepeat: "no-repeat",
              // backgroundSize: "contain",
              // backgroundPosition: "center",
            }
          }
        >
          {toDecorate}
        </p>
      </span>
      <span className="decorator__item">{splitted[1]}</span>
    </>
  );
}
