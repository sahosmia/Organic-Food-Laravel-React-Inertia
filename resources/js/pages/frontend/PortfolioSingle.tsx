import FrontLayout from "@/layouts/front-layout";
import { PortfolioType } from "@/types";

import banner from "@/assets/banner/banner-portfolio.png";

import React from "react";
import PageBanner from "@/components/frontend/tools/PageBanner";
import { Head } from "@inertiajs/react";

function PortfolioSingle({ portfolio }: { portfolio: PortfolioType }) {

    console.log("PortfolioSingle:", portfolio);

    return (
        <FrontLayout>
            <Head title={portfolio.title} />
            <PageBanner bg={banner} title="Portfolio Standerd" />


            <div className="container -mt-28 mb-20 ">
                <div className="flex flex-col lg:flex-row rounded-lg overflow-hidden shadow">
                    <div className="lg:w-8/12  bg-white px-10 sm:px-20 lg:px-10 py-20">
                        <h4 className="title-lg font-semibold text-opacity-90 mb-4">
                            {portfolio.title}
                        </h4>
                        <p className="md:w-4/5">
                           {portfolio.description}
                        </p>
                    </div>

                    <div className="lg:w-4/12 bg-whitefour px-10 sm:px-20 lg:px-10 py-20">
                        <ul>
                            <li className="flex text-main mb-4">
                                <span className="w-2/5 font-bold text-lg">Date</span>
                                <span className="w-3/5 font-thin">
                                    <span className="font-bold text-lg pr-2">:</span> 20 Nov, 2023
                                </span>
                            </li>
                            <li className="flex text-main mb-4">
                                <span className="w-2/5 font-bold text-lg">Category</span>
                                <span className="w-3/5 font-thin">
                                    <span className="font-bold text-lg pr-2">:</span>{portfolio.category}
                                </span>
                            </li>
                            <li className="flex text-main mb-4">
                                <span className="w-2/5 font-bold text-lg">Client</span>
                                <span className="w-3/5 font-thin">
                                    <span className="font-bold text-lg pr-2">:</span> Jons Bashed
                                </span>
                            </li>
                            <li className="flex text-main mb-4">
                                <span className="w-2/5 font-bold text-lg">Service</span>
                                <span className="w-3/5 font-thin">
                                    <span className="font-bold text-lg pr-2">:</span> Organic
                                    Products
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="w-3/5 m-auto">
                <h4 className="title-md mb-5">About The Farm:</h4>
                <p className="mb-5">
                    t is a long established fact that a reader will be distracted by the
                    readable content of a page when looking a layout. The point of using
                    Lorem Ipsum is that it has a more-or-less normal distribution of
                    letters, as opposed to using 'Content here, content here', making it
                    look like readable English.
                </p>
                <p className="mb-5">
                    Many desktop publishing packages and web page editors now use Lorem
                    Ipsum as their default model text, and auncover many web sites still
                    in their infancy. Various versions have evolved over the years
                </p>

                <img
                    className="w-full rounded-xl mb-10"
                    src={portfolio.thumbnail_url}
                    alt=""
                />
                <h4 className="title-md mb-5">How to Farm:</h4>
                <p className="mb-5">
                    It is a long established fact that a reader will be distracted by the
                    readable content of a page when looking a layout. The point of using
                    Lorem Ipsum is that it has a more-or-less normal distribution of
                    letters, as opposed to using 'Content here, content here', making it
                    look like readable English.
                </p>
                <p className="mb-5">
                    Many desktop publishing packages and web page editors now use Lorem
                    Ipsum as their default model text, and auncover many web sites still
                    in their infancy. Various versions have evolved over the years
                </p>

                <h4 className="title-md mb-5">Calculation:</h4>
                <p className="mb-5">
                    It is a long established fact that a reader will be distracted by the
                    readable content of a page when looking a layout. The point of using
                    Lorem Ipsum is that it has a more-or-less normal distribution of
                    letters, as opposed to using 'Content here, content here', making it
                    look like readable English.
                </p>
                <p className="mb-5">
                    Many desktop publishing packages and web page editors now use Lorem
                    Ipsum as their default model text, and auncover many web sites still
                    in their infancy. Various versions have evolved over the years
                </p>
            </div>
        </FrontLayout>
    );
}

export default PortfolioSingle;
