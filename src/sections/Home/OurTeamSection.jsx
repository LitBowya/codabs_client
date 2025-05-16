import Spinner from "../../components/Spinner.jsx";
import ErrorMessage from "../../components/ErrorMessage.jsx";
import AnimatedScrollText from "../../components/AnimatedScrollText.jsx";
import EmptyState from "../../components/EmptyState.jsx";
import { useGetAllTeamMembersQuery } from "../../redux/services/teamApi.js";
import { TeamList } from "../../components/User/TeamCard.jsx";

const OurTeamSection = () => {

  const { data, isLoading, isError } = useGetAllTeamMembersQuery();

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage />;

  const teams = data?.teamMembers || [];

  return (
    <section className="bg-primary border-r-[10px] md:border-r-[15px] border-orange-500 py-24">
      <div className="max-width">
        <div className="mb-12 text-end">
          <AnimatedScrollText
            types="chars"
            tagName="h4"
            className={`tag text-white`}
          >
            People, Passion, Precision
          </AnimatedScrollText>
          <AnimatedScrollText
            types="chars"
            tagName="h2"
            animationProps={
              {
                opacity: 0,
                ease: "power1.inOut",
                stagger: 0.1
              }
            }
            className={`title text-secondary lowercase`}
          >
            The Minds Behind the Build
          </AnimatedScrollText>

          <AnimatedScrollText
            types="chars"
            tagName="p"
            animationProps={
              {
                opacity: 0,
                rotationZ: 50,
                ease: "power1.inOut",
                stagger: 0.1
              }
            }
            className={`subtitle`}
          >
            Our strength lies in the talent and collaboration of individuals united by a shared pursuit of excellence in
            construction.
          </AnimatedScrollText>
        </div>

        {teams.length === 0 ? (
          <EmptyState title="No team members found" />
        ) : (
          <TeamList team={teams} />
        )}
      </div>
    </section>
  );
};
export default OurTeamSection;
