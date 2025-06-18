import React from "react";

function WhyChoose() {
  return (
    <div className="bg-whitetwo py-20">
      <div className="container flex gap-5 flex-col-reverse lg:flex-row items-center">
        <div className="w-full lg:w-1/2">
          <h4 className="secondary-title pb-2">Why Choose us?</h4>
          <h2 className="title-lg pb-8">
            We do not buy from the open market & traders.
          </h2>
          <p className="pb-10">
            Simply dummy text of the printing and typesetting industry. Lorem
            had ceased to been the industry standard the 1500s, when an unknown
          </p>
          <div className="mb-10 sm:w-4/5 ">
            <h6 className="bg-whitefour inline-block px-10 py-5 mb-5 rounded-full relative after:absolute after:w-4 after:h-4 after:top-6 after:left-4 after:border-2 after:border-secondary after:rounded-full">
              100% Nutural Product
            </h6>
            <p>
              Simply dummy text of the printing and typesetting industry. Lorem
              had ceased to been the industry standard the 1500s, when an
              unknown
            </p>
          </div>
          <div className="mb-10 sm:w-4/5 ">
            <h6 className="bg-whitefour inline-block px-10 py-5 mb-5 rounded-full relative after:absolute after:w-4 after:h-4 after:top-6 after:left-4 after:border-2 after:border-secondary after:rounded-full">
              100% Nutural Product
            </h6>
            <p>
              Simply dummy text of the printing and typesetting industry. Lorem
              had ceased to been the industry standard the 1500s, when an
              unknown
            </p>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <img
            className="rounded-xl inline-block w-10/12 justify-self-end"
            src="/img/about/whychoose.jpg"
            alt=""
          />
        </div>
      </div>

      <div className="m-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5 w-3/5 pt-20">
        <div className="bg-light shadow text-center text-main px-5 py-10 rounded-xl">
          <span className="pb-5 block text-4xl">
            <i className="fa-solid fa-cart-plus"></i>
          </span>
          <h4 className="title-xs mb-2">Return Policy</h4>

          <p>Simply dummy text of the printing and typesetting industry</p>
        </div>
        <div className="bg-light shadow text-center text-main px-5 py-10 rounded-xl">
          <span className="pb-5 block text-4xl">
            <i className="fa-solid fa-cart-plus"></i>
          </span>
          <h4 className="title-xs mb-2">Return Policy</h4>

          <p>Simply dummy text of the printing and typesetting industry</p>
        </div>
        <div className="bg-light shadow text-center text-main px-5 py-10 rounded-xl">
          <span className="pb-5 block text-4xl">
            <i className="fa-solid fa-cart-plus"></i>
          </span>
          <h4 className="title-xs mb-2">Return Policy</h4>

          <p>Simply dummy text of the printing and typesetting industry</p>
        </div>
        <div className="bg-light shadow text-center text-main px-5 py-10 rounded-xl">
          <span className="pb-5 block text-4xl">
            <i className="fa-solid fa-cart-plus"></i>
          </span>
          <h4 className="title-xs mb-2">Return Policy</h4>

          <p>Simply dummy text of the printing and typesetting industry</p>
        </div>
      </div>
    </div>
  );
}

export default WhyChoose;
