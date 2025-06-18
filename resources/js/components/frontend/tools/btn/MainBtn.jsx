import React from 'react'

function MainBtn({title = "Explore Now"}) {
  return (
    <button className="text-light  font-bold bg-main px-7 py-5 rounded-lg flex items-center gap-2">
      {title}
      <span className="text-light bg-light bg-opacity-20 w-7 h-7 rounded-full text-center flex justify-center items-center">
        <i className="fa-solid fa-arrow-right"></i>
      </span>
    </button>
  );
}

export default MainBtn