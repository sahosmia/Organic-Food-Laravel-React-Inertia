import { Link } from "@inertiajs/react";
import React from "react";

export function PortfolioItem({ portfolio }) {
    return (
        <div>
            <div className="relative group">
                <img
                    className="rounded-lg mb-5 w-full"
                    src={portfolio.thumbnail_url}
                    alt=""
                />

                {/* <div className="absolute opacity-0 group-hover:opacity-100 w-full h-full top-0 left-0 transition-all duration-500">
          <div className="flex flex-col justify-center gap-4 bg-light bg-opacity-80 w-[90%] h-[90%] m-auto my-[5%] rounded-lg">
            <Link
                 href={`/portfolios/${portfolio.id}`}
              state={portfolio}
              className="text-md text-main text-center"
            >
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div> */}
            </div>
            <h2 className="title-md mb-2">{portfolio.title}</h2>
            <h4 className="secondary-title mb-5">{portfolio.category}</h4>
            <Link
                 href={`/portfolios/${portfolio.id}`}
                state={portfolio}
                className="text-main font-bold rounded-xl flex items-center gap-2"
            >
                Read More
                <span className="text-light bg-main w-7 h-7 rounded-full text-center flex justify-center items-center">
                    <i className="fa-solid fa-arrow-right"></i>
                </span>
            </Link>
        </div>
    );
}
