import EventList from "../components/events/event-list";
import { getAllEvents, getFeaturedEvents } from "../dummy-data";

function HomePage() {
  console.log(getAllEvents());

  return (
    <div>
      <h1>Home Page</h1>
      <EventList items={getFeaturedEvents()} />
    </div>
  );
}
export default HomePage;
