import React from 'react'

function PageBanner({title, bg}) {
  return (
    <div className={`${bg} bg-cover bg-no-repeat bg-center`}>
      <div className="container h-40 md:h-80 justify-center items-center flex">
        <h2 className="text-center title-md ">{title}</h2>
      </div>
    </div>
  );
}

export default PageBanner