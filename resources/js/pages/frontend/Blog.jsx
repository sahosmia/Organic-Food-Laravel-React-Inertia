import React from "react";
import NewsAll from "../component/NewsAll";
import PageBanner from "../component/tools/PageBanner";

function Blog() {
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
      title: "Our Favorite Summertime Tomato",
      des: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum",
    },
    {
      src: "/img/news/three.png",
      date: "25 Nov",
      created_by: "Rachi Card",
      title: "Benefits of Vitamin C & How to get it",
      des: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum",
    },
    {
      src: "/img/news/four.png",
      date: "25 Nov",
      created_by: "Rachi Card",
      title: "Research More Organic Foods",
      des: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum",
    },
    {
      src: "/img/news/five.png",
      date: "25 Nov",
      created_by: "Rachi Card",
      title: "The Benefits of Vitamin D & How to get it",
      des: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum",
    },
    {
      src: "/img/news/six.png",
      date: "25 Nov",
      created_by: "Rachi Card",
      title: "The Benefits of Vitamin D & How to get it",
      des: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum",
    },
  ];
  return (
    <div>
      <PageBanner bg="bg-banner-blog" title="Recant Blog" />
      <div className="py-20">
        <NewsAll newses={newses} />
      </div>
    </div>
  );
}

export default Blog;
