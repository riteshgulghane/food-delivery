import RestaurantCard from '../common/Restaurant-Card/RestaurantCard';
import './Restaurants.css';
import { useEffect, useMemo, memo } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRestaurants, filterRestaurants } from '../../Store/Restaurant.store';
import { useSelector } from 'react-redux';
import { API_CALL_STATUS } from '../../constants/constant';

// Memoize the RestaurantCard to prevent unnecessary re-renders
const MemoizedRestaurantCard = memo(RestaurantCard);

const Restaurants = () => {
  const dispatch = useDispatch();

  // Use filteredRestaurants instead of restaurants
  const restaurantData = useSelector(state => state.restaurant.filteredRestaurants);
  const loading = useSelector(state => state.restaurant.status);
  const error = useSelector(state => state.restaurant.error);
  const categories = useSelector(state => state.category);

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  // Memoize the selected categories to prevent unnecessary filtering
  const selectedCategories = useMemo(() => {
    return categories.category.filter(category => category.select).map(category => category.title);
  }, [categories]);

  useEffect(() => {
    dispatch(filterRestaurants(selectedCategories));
  }, [selectedCategories, dispatch]);

  return (
    <div className="w-full mt-10 max-w-screen-lg ">
      <h5>Nearby restaurants</h5>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {loading === API_CALL_STATUS.LOADING && (
        <div className="flex flex-wrap gap-8 mt-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <RestaurantCard
              className="w-full md:w-1/2 lg:w-1/3 max-w-full md:max-w-[calc(50%-1rem)] lg:max-w-[calc(33.33%-1.34rem)]"
              key={`loading-${index}`}
              restaurant={{}}
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
            restaurantData.map(restaurant => (
              <div
                key={restaurant.restaurantName}
                className="w-full md:w-1/2 lg:w-1/3 max-w-full md:max-w-[calc(50%-1rem)] lg:max-w-[calc(33.33%-1.34rem)]"
              >
                <MemoizedRestaurantCard restaurant={restaurant} />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Restaurants;
