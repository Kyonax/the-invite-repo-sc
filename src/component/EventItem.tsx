import InviteTitle from "./InviteTitle";
import SvgIcon from "./SvgIcon";
import "./scss/EventItem.scss";

type Props = {
  iconName: string;
  title: string;
  background: string;
  place: string;
  description?: string;
  date: string;
  locationUrl?: string;
  locationText?: string;
};

const EventItem = ({
  iconName,
  title,
  background,
  place,
  description,
  date,
  locationUrl,
  locationText,
}: Props) => (
  <div className="event-item">
    <div className="event-item__icon">
      <SvgIcon name={iconName} />
    </div>
    <div className="event-item__texts">
      <InviteTitle main={title} background={background} />
      <div className="event-item__place">{place}</div>
      <div className="event-item__description">{description}</div>
      <div className="event-item__date">{date}</div>

      {locationUrl && (
        <a
          href={locationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="event-item__button"
        >
          {locationText ? locationText : "Click para ver ubicación"}
        </a>
      )}
    </div>
  </div>
);

export default EventItem;
