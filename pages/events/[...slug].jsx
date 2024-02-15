import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../helpers/api-util";

function FilteredEventsPage(props) {
  if (props.hasError) {
    return (
      <>
        <ErrorAlert>Invalid Filter Please Adjust Your Values</ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = props.filteredEventes;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>No Events Found for The Chosen Dates</ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(props.date.numYear, props.date.numMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
}

export async function getServerSideProps(context) {
  const filterDate = context.params.slug;

  const filteredYear = filterDate[0];
  const filteredMonth = filterDate[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: {
        hasError: true,
      },
      //other pproches to handle error:
      // notFound: true,
      // redirect: {
      //   destination: '/error',
      // }
    };
  }

  const dateFilter = { year: numYear, month: numMonth };

  const filteredEventes = await getFilteredEvents(dateFilter);
  return {
    props: { filteredEventes: filteredEventes, date: dateFilter },
  };
}

export default FilteredEventsPage;
