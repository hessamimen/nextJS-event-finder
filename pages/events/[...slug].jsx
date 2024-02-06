import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";

function FilteredEventsPage() {
  const router = useRouter();

  const filterDate = router.query.slug;

  if (!filterDate) {
    return <p className="center">Loading ...</p>;
  }

  const filteredYear = filterDate[0];
  const filteredMonth = filterDate[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    // NaN(numYear) ||
    // NaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return <p>Invalid Filter Please Adjust Your Values</p>;
  }

  const dateFilter = { year: numYear, month: numMonth };

  const filteredEvents = getFilteredEvents(dateFilter);

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p>No Events Found for The Chosen Dates</p>;
  }

  return (
    <div>
      <h1>Filtered Events Page</h1>
    </div>
  );
}
export default FilteredEventsPage;
