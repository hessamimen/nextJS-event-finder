import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import Button from "../../components/ui/button";
import Head from "next/head";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";

function EventDetailPage(props) {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <>
        <ErrorAlert>
          <p>No Event Found</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }
  // if (!event) {
  //   return (
  //     <div className="center">
  //       <p>LOADING...</p>
  //     </div>
  //   );
  // }

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta
          name="description"
          content="Find a lot of great event that allow you to evolve"
        />
      </Head>
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

  if (!event) {
    return {
      props: {}, // You could pass default props here
      notFound: false, // if true Causes Next.js to render a 404 page
    };
  }
  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

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
    fallback: true,
  };
}
