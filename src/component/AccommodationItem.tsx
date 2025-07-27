import InviteTitle from "./InviteTitle";
import SvgIcon from "./SvgIcon";
import "./scss/AccommodationItem.scss";

type Props = {
  iconName: string;
  name: string;
  background: string;
  description: string;
  phone?: string;
  web?: string;
  price?: string;
};

const AccommodationItem = ({
  iconName,
  name,
  background,
  description,
  phone,
  web,
  price,
}: Props) => (
  <div className="accommodation-item">
    <div data-animate="up" className="accommodation-item__icon">
      <SvgIcon name={iconName} />
    </div>
    <div className="accommodation-item__texts">
      <InviteTitle main={name} background={background} />
      <div data-animate="in-place" className="accommodation-item__description">
        {description}
      </div>
      {phone && (
        <div data-animate="in-place" className="accommodation-item__contact">
          Tel:
          <a href={`tel:+57${phone}`}>{phone}</a>
        </div>
      )}

      {web && (
        <div
          data-animate="in-place"
          className="accommodation-item__contact website"
        >
          Web:
          <a href={web} target="_blank" rel="noopener noreferrer">
            {`${name.toLowerCase().replace(/\s+/g, "")}.com`}
          </a>
        </div>
      )}
      {price && <div className="accommodation-item__price">{price}</div>}
    </div>
  </div>
);

export default AccommodationItem;
