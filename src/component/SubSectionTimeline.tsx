import "./scss/SubSectionTimeline.scss";

const timelineEvents = [
  { time: "17:00", title: "Coctel de bienvenida", date: "26 febrero" },
  { time: "15:00", title: "Llegada invitados", date: "27 febrero" },
  { time: "16:00", title: "Ceremonia", date: "27 febrero" },
  { time: "17:30", title: "Sesión de fotos", date: "27 febrero" },
  { time: "18:30", title: "Cena", date: "27 febrero" },
  { time: "20:00", title: "Fiesta", date: "27 febrero" },
];

const SubSectionTimeline = () => {
  return (
    <div class="timeline-section">
      <h2 class="timeline-section__title">Cronograma del Día</h2>
      <ul class="timeline-section__list">
        {timelineEvents.map((event) => (
          <li
            class="timeline-section__item"
            key={`${event.time}-${event.title}`}
          >
            <span class="timeline-section__time">{event.time}</span>
            <span class="timeline-section__content">
              <span class="timeline-section__event">{event.title}</span>
              <span class="timeline-section__date">{event.date}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubSectionTimeline;
