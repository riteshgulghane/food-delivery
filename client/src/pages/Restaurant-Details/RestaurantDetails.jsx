import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiFetch } from '../../utility/api';
import './RestaurantDetails.css';
import { getCategoryImagesMap } from '../../Store/Category.store';
import { API_CALL_STATUS } from '../../constants/constant';
import Pill from '../../components/common/Pill/Pill';

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [status, setStatus] = useState(API_CALL_STATUS.IDLE);
  const [error, setError] = useState(null);
  const categoryImagesMap = getCategoryImagesMap();

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        setStatus(API_CALL_STATUS.LOADING);
        const data = await apiFetch(`/restaurant/${id}`);
        setRestaurant(data);
        setStatus(API_CALL_STATUS.SUCCEEDED);
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
        setError(error.message || 'Failed to load restaurant details');
        setStatus(API_CALL_STATUS.FAILED);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  if (status === API_CALL_STATUS.LOADING) {
    return (
      <div className="restaurant-details-container">
        <div className="loading-skeleton">
          <div className="loading-header"></div>
          <div className="loading-image"></div>
          <div className="loading-info"></div>
          <div className="loading-description"></div>
        </div>
      </div>
    );
  }

  if (status === API_CALL_STATUS.FAILED) {
    return (
      <div className="restaurant-details-container">
        <div className="error-container">
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button onClick={() => window.history.back()} className="back-button">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return null;
  }

  const categories = restaurant.categories
    .map(category => categoryImagesMap?.[category])
    .filter(Boolean);

  return (
    <div className="restaurant-details-container">
      <div className="restaurant-header">
        <h1>{restaurant.restaurantName}</h1>
        {restaurant.isFeatured && <span className="featured-badge">FEATURED</span>}
      </div>

      <div className="restaurant-image-container">
        <img
          src={restaurant.restaurantThumbnail}
          alt={restaurant.restaurantName}
          className="restaurant-image"
        />
      </div>

      <div className="restaurant-info">
        <div className="info-row">
          <div className="info-item">
            <img src="/asset/icons/clock.svg" alt="Delivery Time" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div className="info-item">
            <span>Minimum Order: </span>
            <span>
              {restaurant.currencySymbol}
              {restaurant.minimumAmount}
            </span>
          </div>
        </div>

        <div className="categories-container">
          {categories.map(category => (
            <Pill key={category.title} text={category.title} icon={category.image} />
          ))}
        </div>

        <div className="restaurant-description">
          <h3>About {restaurant.restaurantName}</h3>
          <p>{restaurant.description || 'No description available.'}</p>
        </div>

        <div className="restaurant-address">
          <h3>Address</h3>
          <p>{restaurant.address || 'No address available.'}</p>
        </div>

        <div className="restaurant-hours">
          <h3>Opening Hours</h3>
          <p>{restaurant.openingHours || 'No opening hours available.'}</p>
        </div>
      </div>

      <div className="menu-section">
        <h2>Menu</h2>
        {restaurant.menu && restaurant.menu.length > 0 ? (
          <div className="menu-items">
            {restaurant.menu.map((item, index) => (
              <div key={index} className="menu-item">
                <div className="menu-item-info">
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                  <span className="price">
                    {restaurant.currencySymbol}
                    {item.price}
                  </span>
                </div>
                {item.image && (
                  <div className="menu-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No menu items available.</p>
        )}
      </div>

      <button onClick={() => window.history.back()} className="back-button">
        Back to Restaurants
      </button>
    </div>
  );
};

export default RestaurantDetails;
