import { fetchEvents, generateWorkLink } from "@/app/lib/data";
import Link from "next/link";
import moment from 'moment';

export const revalidate = 60;

function EventList({ events, showTickets = true, showMisc = true, emptyMessage }) {
  if (events.length === 0) {
    return <p>{emptyMessage}</p>;
  }

  return (
    <ul>
      {events.map((event, index) => {
        const pieceName = event.get('piece_name');
        const workLink = generateWorkLink(pieceName);
        
        return (
          <li key={index} className="mb-8 text-l">
            <p className="text-base font-medium">
              {moment(event.get('date')).format('DD/MM/YYYY')} - {
                workLink ? (
                  <Link href={workLink} className="underline hover:no-underline">
                    {pieceName}
                  </Link>
                ) : (
                  pieceName
                )
              }
            </p>
            <div className="font-light">
              <p>{event.get('instrumentation')}</p>
              <p>{event.get('performers')}</p>
              <p>{event.get('location')}</p>
              
              {showMisc && event.get('misc') && (
                <p>{event.get('misc')}</p>
              )}
              {showTickets && event.get('event_link') && (
                <Link href={event.get('event_link')} target="_blank" className="underline">
                  Tickets
                </Link>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default async function Events() {
  const events = await fetchEvents();
  const now = moment();
  
  const upcomingEvents = events.filter(event => moment(event.get('date')).isAfter(now)).sort((eventA, eventB) => moment(eventA.get('date')).isAfter(moment(eventB.get('date'))) ? 1 : -1);
  const pastEvents = events.filter(event => moment(event.get('date')).isSameOrBefore(now));

  // Group past events by year
  const pastEventsByYear = {};
  pastEvents.forEach(event => {
    const year = moment(event.get('date')).format('YYYY');
    if (!pastEventsByYear[year]) {
      pastEventsByYear[year] = [];
    }
    pastEventsByYear[year].push(event);
  });

  // Sort years in descending order
  const sortedYears = Object.keys(pastEventsByYear).sort((a, b) => b - a);

  return (
    <div className="flex">
      <div className="w-1/6 p-5 hidden md:block md:p-10 relative">
        <ul className="sticky top-20">
          {/* Upcoming Events Link */}
          <li className="mb-6">
            <Link href="#upcoming" className="underline font-light">
              UPCOMING
            </Link>
          </li>
          {/* Past Events by Year */}
          {sortedYears.map((year) => (
            <li key={year} className="mb-6">
              <Link href={`#${year}`} className="underline font-light">
                {year}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-5 md:p-10 text-sm">        
        {/* Upcoming Events Section */}
        <div id="upcoming" className="mb-12 scroll-my-24">
          <h2 className="text-xl font-bold mb-6">UPCOMING</h2>
          <EventList 
            events={upcomingEvents} 
            showTickets={true}
            emptyMessage="No upcoming events at the moment."
          />
        </div>

        {/* Past Events by Year */}
        {sortedYears.map((year) => (
          <div key={year} id={year} className="mb-12 scroll-my-24">
            <h2 className="text-xl font-bold mb-6">{year}</h2>
            <EventList 
              events={pastEventsByYear[year]} 
              showTickets={false}
              showMisc={false}
              emptyMessage={`No events in ${year}.`}
            />
          </div>
        ))}
      </div>
    </div>
  );
} 