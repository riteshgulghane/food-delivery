import RestaurantCard from "../common/Restaurant-Card/RestaurantCard";
import "./Restaurants.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchRestaurants,
  filterRestaurants,
} from "../../Store/Restaurant.store";
import { useSelector } from "react-redux";
import { API_CALL_STATUS } from "../../constants/constant";
import { useTransition, animated } from 'react-spring';

const Restaurants = () => {
  const dispatch = useDispatch();

  const restaurantData = useSelector((state) => state.restaurant.restaurants);
  const loading = useSelector((state) => state.restaurant.status);
  const error = useSelector((state) => state.restaurant.error);
  const categories = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  useEffect(() => {
    const selectedCategory = categories.category
      .filter((category) => category.select)
      .map((category) => category.title);
    dispatch(filterRestaurants(selectedCategory));
  }, [categories, dispatch]);

  const transitions = useTransition(restaurantData, {
    keys: (restaurant) => restaurant.restaurantName,
    from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
    enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
    leave: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
    trail: 100,
  });

  return (
    <div className="w-full mt-10 max-w-screen-lg ">
      <h5>Nearby restaurants</h5>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {loading === API_CALL_STATUS.LOADING && (
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-8 mt-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <RestaurantCard
              className="w-full md:w-1/2 lg:w-1/3 max-w-full "
              key={`loading-${index}`}
              restaurant={{

              }}
              isLoading={loading}
            />
          ))}
        </div>
      )}

      {loading !== API_CALL_STATUS.LOADING && (
        <div className="flex flex-wrap gap-8 mt-3">
          {restaurantData.length === 0 ? (
            <p>No restaurants found</p>
          ) : (
            transitions((style, restaurant) => (
              <animated.div style={style} className="w-full md:w-1/2 lg:w-1/3 max-w-full md:max-w-[calc(50%-1rem)] lg:max-w-[calc(33.33%-1.34rem)]">
                <RestaurantCard
                  key={restaurant.restaurantName}
                  restaurant={restaurant}
                />
              </animated.div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Restaurants;
