import React from "react";

export default function Decorator({ image, fulltext, toDecorate }) {
  const splitted = fulltext.split(toDecorate);
  console.log(splitted);
  return (
    <>
      <span className="decorator__item">{splitted[0]}</span>
      <span>
        <p
          className="decorator__item__chosen"
          style={{
            background: "radial-gradient(circle, black, white)",

            // backgroundImage: `url(${image})`,
            borderRadius: "5px",
            backgroundImage:
              "linear-gradient(0deg, rgba(34,193,195,1) 5%, rgba(45,253,193,1) 17%, rgba(255,255,255,0) 37%)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        >
          &nbsp;{toDecorate}&nbsp;
        </p>
      </span>
      <span className="decorator__item">{splitted[1]}</span>
    </>
  );
}
