import useDeviceType, { DEVICE_TYPE } from '../../../utils/deviceType';
import './DealCard.css';

const DealCard = ({ title, description, image, backgroundColor, dealColor, className, offer }) => {
  const deviceType = useDeviceType();

  return (
    <div
      className={`deal-card w-full rounded-2xl ${className} ${deviceType}`}
      style={{ backgroundColor }}
    >
      {deviceType !== DEVICE_TYPE.MOBILE ? (
        <>
          <div className={`deal-card-image ${deviceType}`}>
            <img className="absolute" src={image} alt={title} />
          </div>

          <div className="flex flex-col py-6">
            <div className="deal-card-title"> {title} </div>
            <h2 className={`deal-card-offer ${deviceType}`} style={{ color: dealColor }}>
              {offer}
            </h2>
            <p className="mt-auto  deal-card-description">{description}</p>
          </div>
        </>
      ) : (
        <div className="relative w-full ">
          <img className="absolute bottom-0" src={image} alt={title} />
          <div className="flex flex-col w-full p-4 md:p-6 ">
            <div className="flex justify-between items-center">
              <div className="deal-card-title"> {title} </div>
              <p className={`deal-card-description ${deviceType}`}>{description}</p>
            </div>

            <h2 className={`deal-card-offer ${deviceType}`} style={{ color: dealColor }}>
              {offer}
            </h2>
            <div className={`deal-card-image  ${deviceType}`}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DealCard;
