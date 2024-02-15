import EventItem from "../../components/events/event-item";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import Button from "../../components/ui/button";
import { getAllEvents, getEventById } from "../../helpers/api-util";

function EventDetailPage(props) {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <>
        {" "}
        <ErrorAlert>
          <p>No Event Found</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }
  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}
export default EventDetailPage;

export async function getStaticProps(context) {
  const params = context.params;
  const eventId = params.eventId;
  const event = await getEventById(eventId);
  return {
    props: {
      selectedEvent: event,
    },
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents();

  const paths = events.map((event) => {
    return { params: { eventId: event.id } };
  });

  return {
    // paths: [
    //   { params: { eventId: "e1" } },
    //   { params: { eventId: "e2" } },
    //   { params: { eventId: "e3" } },
    // ],
    //INSTEAD OF ABOVE IMPLEMENTATION
    paths: paths,
    fallback: false,
  };
}
