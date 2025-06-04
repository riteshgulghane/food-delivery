import Pill from "../Pill/Pill";
import "./RestaurantCard.css";
import { categoryMap } from "../../Utils/Categories";
import { useState, useEffect } from "react";
import ShoppingBag, { ShoppingBagVariant } from "../Shopping-bag/ShoppingBag";

const RestaurantCard = ({ restaurant, className }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(
      restaurant.categories.map((category) => categoryMap[category])
    );
  }, [restaurant]);

  return (
    <div className={`restaurant-card ${className}`}>
      <div className="restaurant-image relative">
        <img
          className="w-full object-cover "
          src={restaurant.restaurantThumbnail}
          alt={restaurant.restaurantName}
        />
        {restaurant.isFeatured && (
          <div className="featured absolute top-0 right-0">FEATURED</div>
        )}
      </div>
      <div className="p-4 flex flex-col gap-3">
        <div className="flex gap-3 justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="restaurant-card-title">
              {restaurant.restaurantName}
            </h2>
            <div className="flex gap-[6px] items-center ">
              <div className="clock">
                <img src="/asset/icons/clock.svg" alt="Delivery Time" />
              </div>
              <div className="delivery-time  flex gap-2 items-center">
                <span>{restaurant.deliveryTime}</span>
                <span className="divider"></span>
                <span>{restaurant.currencySymbol}{restaurant.minimumAmount} min sum</span>
              </div>
            </div>
          </div>

          <ShoppingBag
            variant={ShoppingBagVariant.RESTAURANT}
            count={restaurant.count}
          />
        </div>
        <div className="flex gap-2">
          {categories.map((category) => (
            <Pill
              key={category.title}
              text={category.title}
              icon={category.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
