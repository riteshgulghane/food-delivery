import Pill from '../Pill/Pill';
import './RestaurantCard.css';
import { useMemo, memo } from 'react';
import ShoppingBag, { ShoppingBagVariant } from '../Shopping-bag/ShoppingBag';
import { getCategoryImagesMap } from '../../../Store/Category.store';

const RestaurantCard = ({ restaurant, className, isLoading }) => {
  const categoryImagesMap = getCategoryImagesMap();

  // Use useMemo instead of useState + useEffect to avoid unnecessary re-renders
  const categories = useMemo(() => {
    if (isLoading || !restaurant || !categoryImagesMap) return [];
    return restaurant.categories.map(category => categoryImagesMap[category]);
  }, [restaurant, categoryImagesMap, isLoading]);

  return (
    <div className={`restaurant-card ${className} flex flex-col md:flex-row lg:flex-col gap-4`}>
      <div className="restaurant-image relative">
        {isLoading ? (
          <div className="loading restaurant-card-image"></div>
        ) : (
          <img
            className={`restaurant-card-image w-full object-cover`}
            src={restaurant.restaurantThumbnail}
            alt={restaurant.restaurantName}
          />
        )}
        {restaurant.isFeatured && <div className="featured absolute top-0 right-0">FEATURED</div>}
      </div>
      <div className="p-4 flex flex-col gap-3">
        <div className="flex gap-3 justify-between">
          <div className={`flex flex-col gap-1 ${isLoading ? 'loading' : ''}`}>
            <h2 className={`restaurant-card-title ${isLoading ? 'loading' : ''}`}>
              {restaurant.restaurantName}
            </h2>
            <div className={`flex gap-[6px] items-center ${isLoading ? 'loading' : ''}`}>
              {!isLoading && (
                <>
                  <div className="clock">
                    <img src="/asset/icons/clock.svg" alt="Delivery Time" />
                  </div>
                  <div
                    className={`delivery-time  flex gap-2 items-center ${
                      isLoading ? 'loading' : ''
                    }`}
                  >
                    <span>{restaurant.deliveryTime}</span>
                    <span className="divider"></span>
                    <span>
                      {restaurant.currencySymbol}
                      {restaurant.minimumAmount} min sum
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          <ShoppingBag
            variant={isLoading ? ShoppingBagVariant.LOADING : ShoppingBagVariant.RESTAURANT}
            count={restaurant.count}
          />
        </div>
        <div className={`flex gap-2`}>
          {isLoading
            ? Array.from({ length: 2 }).map((_, index) => (
                <Pill
                  key={`loading-${index}`}
                  className={isLoading ? 'loading' : ''}
                  text="      "
                />
              ))
            : categories.map(category => (
                <Pill key={category.title} text={category.title} icon={category.image} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default memo(RestaurantCard);
