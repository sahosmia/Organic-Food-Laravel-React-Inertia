import { Link } from "@inertiajs/react";
import React from "react";

function MainTransparentBtn({ link, text, icon }) {
  return (
    <Link
      to={link}
      className="outline outline-2 outline-main hover:bg-main hover:text-light text-main font-bold  px-7 py-5 rounded-xl flex items-center gap-2"
    >
      {text}
      {icon && (
        <span className="text-light hover:bg-light hover:bg-opacity-50 bg-main w-7 h-7 rounded-full text-center flex justify-center items-center">
          <i className="fa-solid fa-arrow-right"></i>
        </span>
      )}
    </Link>
  );
}

export default MainTransparentBtn;
