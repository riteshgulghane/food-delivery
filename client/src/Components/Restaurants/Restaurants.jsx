import { useGetRestaurant } from "../../Adapters/Resaturant.Adapter";
import RestaurantCard from "../common/Restaurant-Card/RestaurantCard";
import "./Restaurants.css";
import { useEffect } from "react";

const Restaurants = () => {
  const { getRestaurants, restaurantData, loading } = useGetRestaurant();

  useEffect(() => {
    getRestaurants();
  }, []);

  return (
    <div className="w-full mt-10">
      <h5>Nearby restaurants</h5>
      {loading && <p>Loading...</p>}
      <div className="flex flex-wrap gap-8 mt-3">
        {restaurantData.length === 0 ? (
          <p>No restaurants found</p>
        ) : (
          restaurantData.map((restaurant) => (
            <RestaurantCard
              className="w-1/3 max-w-[calc(33.33%-2rem)]"
              key={restaurant.restaurantName}
              restaurant={restaurant}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Restaurants;
