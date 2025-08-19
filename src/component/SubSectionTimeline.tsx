import InviteTitle from "./InviteTitle";
import "./scss/SubSectionTimeline.scss";
import SvgIcon from "./SvgIcon";

interface TimelineEvent {
  time: string;
  title: string;
  icon: string;
}

const leftEvents: TimelineEvent[] = [
  { time: "", title: "", icon: "" },
  { time: "15:30", title: "Recepción", icon: "SvgArcDoor" },
  { time: "", title: "", icon: "" },
  { time: "17:00", title: "fotos", icon: "SvgCamera" },
  { time: "", title: "", icon: "" },
  { time: "19:30", title: "Postre", icon: "SvgDessert" },
  { time: "", title: "", icon: "" },
  { time: "21:00", title: "Primer baile", icon: "SvgFirstDance" },
  { time: "", title: "", icon: "" },
  { time: "2:00", title: "Regreso a casa", icon: "SvgFireworks" },
  { time: "", title: "", icon: "" },
];

const rightEvents: TimelineEvent[] = [
  { time: "16:00", title: "Ceremonia", icon: "SvgWeddingCeremony" },
  { time: "", title: "", icon: "" },
  { time: "18:30", title: "Banquete de boda", icon: "SvgLunch" },
  { time: "", title: "", icon: "" },
  { time: "20:00", title: "Cóctel", icon: "SvgCocktail" },
  { time: "", title: "", icon: "" },
  { time: "23:00", title: "Hora loca", icon: "SvgCrazyHour" },
  { time: "", title: "", icon: "" },
];

const SubSectionTimeline = () => {
  return (
    <div class="section-timeline">
      <InviteTitle
        main="Itinerario de Ceremonia"
        background="Wedding Itinerary"
      />

      <section class="timeline">
        <div class="timeline__line">
          <div class="timeline__column timeline__column--left">
            {leftEvents.map((event, index) => (
              <div class="timeline__item" key={`left-${index}`}>
                <div data-animate="in-place" class="timeline__icon">
                  <SvgIcon name={event.icon} />
                </div>
                <div
                  data-animate="left"
                  class="timeline__text timeline__text--left"
                >
                  <div class="timeline__time">{event.time}</div>
                  <div class="timeline__title">{event.title}</div>
                </div>
              </div>
            ))}
          </div>

          <div class="timeline__column timeline__column--right">
            {rightEvents.map((event, index) => (
              <div class="timeline__item" key={`right-${index}`}>
                <div data-animate="in-place" class="timeline__icon">
                  <SvgIcon name={event.icon} />
                </div>
                <div
                  data-animate="right"
                  class="timeline__text timeline__text--right"
                >
                  <div class="timeline__time">{event.time}</div>
                  <div class="timeline__title">{event.title}</div>
                </div>
              </div>
            ))}
          </div>

          <div data-animate="in-place" class="timeline__vertical-line"></div>
        </div>
      </section>
    </div>
  );
};

export default SubSectionTimeline;
