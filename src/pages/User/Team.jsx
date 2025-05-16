import React from "react";
import SectionHero from "../../components/User/SectionHero.jsx";
import TeamList from "../../sections/OurTeam/TeamList.jsx";

const Team = () => {
    return (
        <div>
            <SectionHero
                tags="Meet the Team, Experts, Leadership"
                title="People Behind the Projects"
                subtitle="Get to know the experienced professionals who drive our mission and ensure the success of every build."
                imageUrl="/images/construction.jpg"
                pattern="diagonal"
            />

            <TeamList/>
        </div>
    );
};
export default Team;
