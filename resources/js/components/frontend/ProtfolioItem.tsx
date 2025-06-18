import { Link } from "@inertiajs/react";
import React from "react";

export function ProtfolioItem(props) {
  return (
    <div>
      <div className="relative group">
        <img
          className="rounded-lg mb-5 w-full"
          src={props.protfolio.src}
          alt=""
        />

        <div className="absolute opacity-0 group-hover:opacity-100 w-full h-full top-0 left-0 transition-all duration-500">
          <div className="flex flex-col justify-center gap-4 bg-light bg-opacity-80 w-[90%] h-[90%] m-auto my-[5%] rounded-lg">
            <Link
              to="/protfolio-single"
              state={props.protfolio}
              className="text-md text-main text-center"
            >
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
      <h2 className="title-md mb-2">{props.protfolio.title}</h2>
      <h4 className="secondary-title mb-5">{props.protfolio.category}</h4>
    </div>
  );
}
