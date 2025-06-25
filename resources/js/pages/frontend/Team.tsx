import PageBanner from '@/components/frontend/tools/PageBanner';
import bannerImage from "@/assets/banner/banner-team.jpg";
import { PaginationType, TeamType } from '@/types';
import TeamItem from '@/components/frontend/TeamITem';

function Team({ teams }: { teams: PaginationType<TeamType> }) {

    return (
        <div>
            <PageBanner bg={bannerImage} title="Team" />
            <div className="">
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
                        {
                            teams.data.map((team) => (
                                <TeamItem key={team.id} team={team} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Team
