import EventItem from "./event-item";

function EventList({ items }) {
  return (
    <ul>
      {items.map((event) => (
        <EventItem item={event} key={event.id} />
      ))}
    </ul>
  );
}
export default EventList;
