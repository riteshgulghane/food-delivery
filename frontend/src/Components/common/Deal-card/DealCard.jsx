import "./DealCard.css";

const DealCard = ({
  title,
  description,
  image,
  backgroundColor,
  dealColor,
  className,
  offer,
}) => {
  return (
    <div
      className={`deal-card w-full rounded-2xl ${className}`}
      style={{ backgroundColor }}
    >
      <div className="deal-card-image">
        <img className="absolute" src={image} alt={title} />
      </div>
      <div className="flex flex-col py-6">
        <div className="deal-card-title"> {title} </div>
        <h2 className="deal-card-offer" style={{ color: dealColor }}>
          {offer}
        </h2>
        <p className="mt-auto  deal-card-description">{description}</p>
      </div>
    </div>
  );
};

export default DealCard;
