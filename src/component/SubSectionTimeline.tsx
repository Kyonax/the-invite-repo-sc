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
  { time: "", title: "", icon: "" },
  { time: "17:00 AM", title: "Photos", icon: "SvgCamera" },
  { time: "", title: "", icon: "" },
  { time: "19:30 PM", title: "Dessert", icon: "SvgDessert" },
  { time: "", title: "", icon: "" },
  { time: "21:00 PM", title: "First Dance", icon: "SvgFirstDance" },
  { time: "", title: "", icon: "" },
  { time: "2:00 AM", title: "Carriages Home", icon: "SvgFireworks" },
  { time: "", title: "", icon: "" },
];

const rightEvents: TimelineEvent[] = [
  { time: "15:30 PM", title: "Wedding Ceremony", icon: "SvgWeddingCeremony" },
  { time: "", title: "", icon: "" },
  { time: "18:30 PM", title: "Wedding Lunch", icon: "SvgLunch" },
  { time: "", title: "", icon: "" },
  { time: "20:00 PM", title: "Cocktail Hour", icon: "SvgCocktail" },
  { time: "", title: "", icon: "" },
  { time: "23:00 PM", title: "Crazy Hour", icon: "SvgCrazyHour" },
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
                <SvgIcon name={event.icon} />
                <div class="timeline__text timeline__text--left">
                  <div class="timeline__time">{event.time}</div>
                  <div class="timeline__title">{event.title}</div>
                </div>
              </div>
            ))}
          </div>

          <div class="timeline__column timeline__column--right">
            {rightEvents.map((event, index) => (
              <div class="timeline__item" key={`right-${index}`}>
                <SvgIcon name={event.icon} />
                <div class="timeline__text timeline__text--right">
                  <div class="timeline__time">{event.time}</div>
                  <div class="timeline__title">{event.title}</div>
                </div>
              </div>
            ))}
          </div>

          <div class="timeline__vertical-line"></div>
        </div>
      </section>
    </div>
  );
};

export default SubSectionTimeline;
