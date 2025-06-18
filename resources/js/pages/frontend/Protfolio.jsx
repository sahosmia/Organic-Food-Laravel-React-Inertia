import React from "react";
import PageBanner from "../component/tools/PageBanner";
import { ProtfolioItem } from "../component/ProtfolioItem";

function Protfolio() {
  const protfolios = [
    {
      src: "/img/protfolio/one.png",
      title: "Green & Tasty Lemon",
      category: "Fruites",
    },
    {
      src: "/img/protfolio/six.png",
      title: "Green & Tasty Lemon",
      category: "Fruites",
    },
    {
      src: "/img/protfolio/five.png",
      title: "Green & Tasty Lemon",
      category: "Fruites",
    },
    {
      src: "/img/protfolio/four.png",
      title: "Green & Tasty Lemon",
      category: "Fruites",
    },
    {
      src: "/img/protfolio/two.png",
      title: "Green & Tasty Lemon",
      category: "Fruites",
    },
    {
      src: "/img/protfolio/three.png",
      title: "Green & Tasty Lemon",
      category: "Fruites",
    },
  ];
  return (
    <div>
      <PageBanner bg="bg-banner-protfolio" title="Protfolio Standerd" />
      <div className="py-20 container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {protfolios.map((protfolio, index) => (
          <ProtfolioItem key={index} protfolio={protfolio}></ProtfolioItem>
        ))}
        {/* <ProductAll products={products} /> */}
      </div>
    </div>
  );
}

export default Protfolio;
