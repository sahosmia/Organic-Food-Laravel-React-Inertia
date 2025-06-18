import React from "react";
import MainTransparentBtn from "./tools/btn/MainTransparentBtn";
import NewsAll from "./NewsAll";

function News() {
  const newses = [
    {
      src: "/img/news/one.png",
      date: "25 Nov",
      created_by: "Rachi Card",
      title: "The Benefits of Vitamin D & How to get it",
      des: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum",
    },
    {
      src: "/img/news/two.png",
      date: "25 Nov",
      created_by: "Rachi Card",
      title: "The Benefits of Vitamin D & How to get it",
      des: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum",
    },

  ];
  return (
    <div className="py-20">
      <div className="container flex flex-col md:flex-row justify-between md:items-end gap-3 pb-2">
        <div className="w-full md:w-3/5">
          <h4 className="secondary-title pb-2">News</h4>
          <h2 className="title-lg">
            Discover weekly content about organic food, & more
          </h2>
        </div>
        <div className="inline-flex">
          <MainTransparentBtn link="/news" text="More News" icon={true} />
        </div>
      </div>

      <NewsAll newses={newses} />
    </div>
  );
}

export default News;
