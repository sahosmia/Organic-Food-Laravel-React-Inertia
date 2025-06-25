import { TeamType } from "@/types";
import React from "react";

function TeamItem({ team }: { team: TeamType }) {
    console.log(team);

    return (


        <div className="rounded-xl overflow-hidden bg-whitethree hover:bg-light hover:shadow-xl transition-all duration-500">
            <img
                className="inline-block object-fill w-full"
                src={team.image_url}
                alt=""
            />
            <div className="flex justify-between items-end p-5">
                <div className="">
                    <h4 className="title-md pb-5">{team.name}</h4>
                    <h6 className="secondary-title">{team.designation}</h6>
                </div>
                <ul className="flex gap-2 text-main text-2xl">
                    <li>
                        <a href={team.facebook_url}>
                            <i className="fa-brands fa-facebook"></i>
                        </a>
                    </li>
                    <li>
                        <a href={team.facebook_url}>
                            <i className="fa-brands fa-twitter"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>



    );
}

export default TeamItem;
