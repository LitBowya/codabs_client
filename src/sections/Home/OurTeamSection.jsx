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
          <h4
            className={`tag text-white`}
          >
            People, Passion, Precision
          </h4>
          <h2
            className={`title text-secondary lowercase`}
          >
            The Minds Behind the Build
          </h2>

          <p
            className={`subtitle`}
          >
            Our strength lies in the talent and collaboration of individuals united by a shared pursuit of excellence in
            construction.
          </p>
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
