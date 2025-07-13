import React from "react";
import banner from "@/assets/banner/banner-portfolio.png";
import PageBanner from "@/components/frontend/tools/PageBanner";
import { PortfolioItem } from "@/components/frontend/PortfolioItem";
import FrontLayout from "@/layouts/front-layout";
import { PaginationType, PortfolioType } from "@/types";
import { Head } from "@inertiajs/react";

function Portfolio({ portfolios }: { portfolios: PaginationType<PortfolioType> }) {

    return (
        <FrontLayout>
            <Head title="Portfolios" />
            <PageBanner bg={banner} title="Portfolio Standerd" />

            <div className="py-20 container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    portfolios.data.map((portfolio, index) => (
                        <PortfolioItem key={index} portfolio={portfolio}></PortfolioItem>
                    ))}


            </div>
        </FrontLayout>
    );
}

export default Portfolio;
