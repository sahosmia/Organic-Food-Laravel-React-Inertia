import React from "react";

function Teams({teams}) {

  return (
    <div className="py-28">
      <div className="container text-center">
        <h4 className="secondary-title pb-2">Team</h4>
        <h2 className="title-lg pb-5">Our Organic Expert</h2>
        <p className="w-full md:w-1/2 m-auto pb-10">
          Simply dummy text of the printing and typesetting industry. Lorem had
          ceased to been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley.
        </p>
      </div>
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {teams.map((team, i) => (
          <div className="rounded-xl overflow-hidden bg-whitethree hover:bg-light hover:shadow-xl transition-all duration-500" key={i}>
            <img
              className="inline-block object-fill w-full"
              src={team.src}
              alt=""
            />
            <div className="flex justify-between items-end p-5">
              <div className="">
                <h4 className="title-md pb-5">{team.name}</h4>
                <h6 className="secondary-title">{team.title}</h6>
              </div>
              <ul className="flex gap-2 text-main text-2xl">
                <li>
                  <a href={team.facebook}>
                    <i className="fa-brands fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href={team.facebook}>
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
