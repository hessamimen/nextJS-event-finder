import Link from "next/link";

function EventItem({ item }) {
  const humanReadableDate = new Date(item.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedLocation = item.location.replace(", ", "\n");

  const exploreLink = `/events/${item.id}`;
  return (
    <li>
      <img src={item.image} alt={item.title} style={{ width: "200px" }} />
      <div>
        <div>
          <h2>{item.title}</h2>
          <div>
            <time>{humanReadableDate}</time>
          </div>
          <div>
            <address>{formattedLocation}</address>
          </div>
        </div>
        <div>
          <Link href={exploreLink}>Explore Event</Link>
        </div>
      </div>
    </li>
  );
}
export default EventItem;
