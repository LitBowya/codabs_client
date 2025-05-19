import React from "react";
import { useGetAllTeamMembersQuery } from "../../redux/services/teamApi.js";
import Spinner from "../../components/Spinner.jsx";
import ErrorMessage from "../../components/ErrorMessage.jsx";
import AnimatedScrollElement from "../../components/AnimatedScrollElement.jsx";
import { TeamCard } from "../../components/User/TeamCard.jsx";
import EmptyState from "../../components/EmptyState.jsx";

const TeamList = () => {
  const { data, isLoading, isError } = useGetAllTeamMembersQuery();

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage />;

  const teamMembers = data?.teamMembers || [];

  // Group team members by role
  const groupByRole = teamMembers.reduce((acc, member) => {
    const role = member.roles[0]; // Assuming one role per member
    if (!acc[role]) acc[role] = [];
    acc[role].push(member);
    return acc;
  }, {});

  // Sort roles with Leadership first
  const sortedRoles = Object.keys(groupByRole).sort((a, b) => {
    if (a === "Leadership") return -1;
    if (b === "Leadership") return 1;
    return a.localeCompare(b);
  });

  return (
    <div className="bg-primary py-24 lg:py-48">
      <div className="max-width">
        <div className="text-center mb-12">
          <div className="w-20 h-1 mx-auto mb-6 bg-secondary"></div>
          <p className="text-lg max-w-3xl mx-auto text-white">
            Meet the passionate professionals behind our projects — a dedicated team of architects, engineers,
            designers,
            and builders committed to excellence, collaboration, and turning bold ideas into remarkable realities.
          </p>
        </div>


        {
          teamMembers.length === 0 ? <EmptyState /> : (sortedRoles.map((role) => (
            <section key={role} className="">
              <div className="flex items-center mt-12 mb-6">
                <h2 className="mx-6 text-3xl font-bold text-secondary text-start">
                  {role}
                </h2>
                <div className="flex-1 h-px bg-secondary"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {groupByRole[role].map((member, index) => (
                  <AnimatedScrollElement
                    key={member._id}
                    animationProps={{
                      from: { opacity: 0, y: 50 },
                      to: {
                        duration: 1,
                        opacity: 1,
                        y: 0,
                        delay: index * 0.3
                      },
                      scrollTrigger: { once: true }
                    }}
                  >
                    <TeamCard member={member} />
                  </AnimatedScrollElement>
                ))}
              </div>
            </section>
          )))
        }
      </div>
    </div>
  );
};

export default TeamList;
