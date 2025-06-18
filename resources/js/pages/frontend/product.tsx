import React from "react";
import ProductAll from "../component/ProductAll";
import PageBanner from "../component/tools/PageBanner";

function Shop() {
  const products = [
    {
      title: "Calabrese Brocoli",
      oldPrice: 20.0,
      currentPrice: 13.0,
      category: "vegetable",
      src: "/img/product/one.png",
      tab: [
        {
          title: "Product Description",
          des: "Welcome to the world of natural and organic. Here you can discover the bounty of nature. We have grown on the principles of health, ecology, and care. We aim to give our customers a healthy chemical-free meal for perfect nutrition. It offers about 8–10% carbs. Simple sugars — such as glucose and fructose — make up 70% and 80% of the carbs in raw.",
        },
        {
          title: "Additional Info",
          des: "Info to the world of natural and organic. Here you can discover the bounty of nature. We have grown on the principles of health, ecology, and care. We aim to give our customers a healthy chemical-free meal for perfect nutrition. It offers about 8–10% carbs. Simple sugars — such as glucose and fructose — make up 70% and 80% of the carbs in raw.",
        },
        {
          title: "Review",
          des: "Review",
        },
      ],
    },
    {
      title: "Calabrese Brocoli",
      oldPrice: 20.0,
      currentPrice: 13.0,
      category: "vegetable",
      src: "/img/product/two.png",
      tab: [
        {
          title: "Product Description",
          des: "Welcome to the world of natural and organic. Here you can discover the bounty of nature. We have grown on the principles of health, ecology, and care. We aim to give our customers a healthy chemical-free meal for perfect nutrition. It offers about 8–10% carbs. Simple sugars — such as glucose and fructose — make up 70% and 80% of the carbs in raw.",
        },
        {
          title: "Additional Info",
          des: "Info to the world of natural and organic. Here you can discover the bounty of nature. We have grown on the principles of health, ecology, and care. We aim to give our customers a healthy chemical-free meal for perfect nutrition. It offers about 8–10% carbs. Simple sugars — such as glucose and fructose — make up 70% and 80% of the carbs in raw.",
        },
        {
          title: "Review",
          des: "Review",
        },
      ],
    },
    {
      title: "Calabrese Brocoli",
      oldPrice: 20.0,
      currentPrice: 13.0,
      category: "vegetable",
      src: "/img/product/three.png",
      tab: [
        {
          title: "Product Description",
          des: "Welcome to the world of natural and organic. Here you can discover the bounty of nature. We have grown on the principles of health, ecology, and care. We aim to give our customers a healthy chemical-free meal for perfect nutrition. It offers about 8–10% carbs. Simple sugars — such as glucose and fructose — make up 70% and 80% of the carbs in raw.",
        },
        {
          title: "Additional Info",
          des: "Info to the world of natural and organic. Here you can discover the bounty of nature. We have grown on the principles of health, ecology, and care. We aim to give our customers a healthy chemical-free meal for perfect nutrition. It offers about 8–10% carbs. Simple sugars — such as glucose and fructose — make up 70% and 80% of the carbs in raw.",
        },
        {
          title: "Review",
          des: "Review",
        },
      ],
    },
    {
      title: "Calabrese Brocoli",
      oldPrice: 20.0,
      currentPrice: 13.0,
      category: "vegetable",
      src: "/img/product/four.png",
      tab: [
        {
          title: "Product Description",
          des: "Welcome to the world of natural and organic. Here you can discover the bounty of nature. We have grown on the principles of health, ecology, and care. We aim to give our customers a healthy chemical-free meal for perfect nutrition. It offers about 8–10% carbs. Simple sugars — such as glucose and fructose — make up 70% and 80% of the carbs in raw.",
        },
        {
          title: "Additional Info",
          des: "Info to the world of natural and organic. Here you can discover the bounty of nature. We have grown on the principles of health, ecology, and care. We aim to give our customers a healthy chemical-free meal for perfect nutrition. It offers about 8–10% carbs. Simple sugars — such as glucose and fructose — make up 70% and 80% of the carbs in raw.",
        },
        {
          title: "Review",
          des: "Review",
        },
      ],
    },
    {
      title: "Calabrese Brocoli",
      oldPrice: 20.0,
      currentPrice: 13.0,
      category: "vegetable",
      src: "/img/product/five.png",
      tab: [
        {
          title: "Product Description",
          des: "Welcome to the world of natural and organic. Here you can discover the bounty of nature. We have grown on the principles of health, ecology, and care. We aim to give our customers a healthy chemical-free meal for perfect nutrition. It offers about 8–10% carbs. Simple sugars — such as glucose and fructose — make up 70% and 80% of the carbs in raw.",
        },
        {
          title: "Additional Info",
          des: "Info to the world of natural and organic. Here you can discover the bounty of nature. We have grown on the principles of health, ecology, and care. We aim to give our customers a healthy chemical-free meal for perfect nutrition. It offers about 8–10% carbs. Simple sugars — such as glucose and fructose — make up 70% and 80% of the carbs in raw.",
        },
        {
          title: "Review",
          des: "Review",
        },
      ],
    },
    {
      title: "Calabrese Brocoli",
      oldPrice: 20.0,
      currentPrice: 13.0,
      category: "vegetable",
      src: "/img/product/six.png",
      tab: [
        {
          title: "Product Description",
          des: "Welcome to the world of natural and organic. Here you can discover the bounty of nature. We have grown on the principles of health, ecology, and care. We aim to give our customers a healthy chemical-free meal for perfect nutrition. It offers about 8–10% carbs. Simple sugars — such as glucose and fructose — make up 70% and 80% of the carbs in raw.",
        },
        {
          title: "Additional Info",
          des: "Info to the world of natural and organic. Here you can discover the bounty of nature. We have grown on the principles of health, ecology, and care. We aim to give our customers a healthy chemical-free meal for perfect nutrition. It offers about 8–10% carbs. Simple sugars — such as glucose and fructose — make up 70% and 80% of the carbs in raw.",
        },
        {
          title: "Review",
          des: "Review",
        },
      ],
    },
    {
      title: "Calabrese Brocoli",
      oldPrice: 20.0,
      currentPrice: 13.0,
      category: "vegetable",
      src: "/img/product/seven.png",
      tab: [
        {
          title: "Product Description",
          des: "Welcome to the world of natural and organic. Here you can discover the bounty of nature. We have grown on the principles of health, ecology, and care. We aim to give our customers a healthy chemical-free meal for perfect nutrition. It offers about 8–10% carbs. Simple sugars — such as glucose and fructose — make up 70% and 80% of the carbs in raw.",
        },
        {
          title: "Additional Info",
          des: "Info to the world of natural and organic. Here you can discover the bounty of nature. We have grown on the principles of health, ecology, and care. We aim to give our customers a healthy chemical-free meal for perfect nutrition. It offers about 8–10% carbs. Simple sugars — such as glucose and fructose — make up 70% and 80% of the carbs in raw.",
        },
        {
          title: "Review",
          des: "Review",
        },
      ],
    },
    {
      title: "Calabrese Brocoli",
      oldPrice: 20.0,
      currentPrice: 13.0,
      category: "vegetable",
      src: "/img/product/eight.png",
      tab: [
        {
          title: "Product Description",
          des: "Welcome to the world of natural and organic. Here you can discover the bounty of nature. We have grown on the principles of health, ecology, and care. We aim to give our customers a healthy chemical-free meal for perfect nutrition. It offers about 8–10% carbs. Simple sugars — such as glucose and fructose — make up 70% and 80% of the carbs in raw.",
        },
        {
          title: "Additional Info",
          des: "Info to the world of natural and organic. Here you can discover the bounty of nature. We have grown on the principles of health, ecology, and care. We aim to give our customers a healthy chemical-free meal for perfect nutrition. It offers about 8–10% carbs. Simple sugars — such as glucose and fructose — make up 70% and 80% of the carbs in raw.",
        },
        {
          title: "Review",
          des: "Review",
        },
      ],
    },
    {
      title: "Calabrese Brocoli",
      oldPrice: 20.0,
      currentPrice: 13.0,
      category: "vegetable",
      src: "/img/product/nine.png",
      tab: [
        {
          title: "Product Description",
          des: "Welcome to the world of natural and organic. Here you can discover the bounty of nature. We have grown on the principles of health, ecology, and care. We aim to give our customers a healthy chemical-free meal for perfect nutrition. It offers about 8–10% carbs. Simple sugars — such as glucose and fructose — make up 70% and 80% of the carbs in raw.",
        },
        {
          title: "Additional Info",
          des: "Info to the world of natural and organic. Here you can discover the bounty of nature. We have grown on the principles of health, ecology, and care. We aim to give our customers a healthy chemical-free meal for perfect nutrition. It offers about 8–10% carbs. Simple sugars — such as glucose and fructose — make up 70% and 80% of the carbs in raw.",
        },
        {
          title: "Review",
          des: "Review",
        },
      ],
    },
    {
      title: "Calabrese Brocoli",
      oldPrice: 20.0,
      currentPrice: 13.0,
      category: "vegetable",
      src: "/img/product/ten.png",
      tab: [
        {
          title: "Product Description",
          des: "Welcome to the world of natural and organic. Here you can discover the bounty of nature. We have grown on the principles of health, ecology, and care. We aim to give our customers a healthy chemical-free meal for perfect nutrition. It offers about 8–10% carbs. Simple sugars — such as glucose and fructose — make up 70% and 80% of the carbs in raw.",
        },
        {
          title: "Additional Info",
          des: "Info to the world of natural and organic. Here you can discover the bounty of nature. We have grown on the principles of health, ecology, and care. We aim to give our customers a healthy chemical-free meal for perfect nutrition. It offers about 8–10% carbs. Simple sugars — such as glucose and fructose — make up 70% and 80% of the carbs in raw.",
        },
        {
          title: "Review",
          des: "Review",
        },
      ],
    },
  ];
  return (
    <div>
      <PageBanner bg="bg-banner-shop" title="Shop Now" />
      <div className="py-20">
        <ProductAll products={products} />
      </div>
    </div>
  );
}

export default Shop;
