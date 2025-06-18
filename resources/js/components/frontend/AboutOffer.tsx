import React from "react";

function AboutOffer() {
    const offers = [
      { src: "/img/about-offer/one.jpg", text: "Fruits" },
      { src: "/img/about-offer/two.jpg", text: "Nuts & Feesd" },
      { src: "/img/about-offer/three.jpg", text: "Spicy" },
      { src: "/img/about-offer/four.png", text: "Vegetable" },
    ];
  return (
    <div className="bg-main py-20">
      <div className="container text-center">
        <h4 className="secondary-title pb-2">Category</h4>
        <h2 className="title-lg text-light pb-10">What We Offer for You</h2>
      </div>
      <div className="container grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-3">
        {offers.map((item, i) => (
          <div key={i} className="text-center">
            <img className="rounded-xl object-fill" src={item.src} alt="" />
            <h3 className="text-light pt-8 title-sm">{item.text}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutOffer;
