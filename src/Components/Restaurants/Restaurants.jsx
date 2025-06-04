import RestaurantCard from "../common/Restaurant-Card/RestaurantCard";
import "./Restaurants.css";

const RestaurantCardList = [
  {
    restaurantName: "Royal Sushi House",
    count: 0,
    restaurantThumbnail: "/asset/images/Restaurants/royal-sushi-house.svg",
    deliveryTime: "30-40 mins",
    minimumAmount: 10,
    currencySymbol: "$",
    categories: ["Sushi"],
    isFeatured: true,
  },
  {
    restaurantName: "Burgers & Pizza",
    count: 2,
    restaurantThumbnail: "/asset/images/Restaurants/burgers-pizza.svg",
    deliveryTime: "30-40 mins",
    minimumAmount: 10,
    currencySymbol: "$",
    categories: ["Burger", "Pizza"],
    isFeatured: true,
  },
  {
    restaurantName: "Ninja sushi",
    count: 0,
    restaurantThumbnail: "/asset/images/Restaurants/ninja-sushi.svg",
    deliveryTime: "30-40 mins",
    minimumAmount: 10,
    currencySymbol: "$",
    categories: ["Sushi"],
    isFeatured: false,
  },
  {
    restaurantName: "Sushi master",
    count: 0,
    restaurantThumbnail: "/asset/images/Restaurants/sushi-master.svg",
    deliveryTime: "30-40 mins",
    minimumAmount: 10,
    currencySymbol: "$",
    categories: ["Sushi"],
    isFeatured: false,
  },
  {
    restaurantName: "Japanese sushi",
    count: 0,
    restaurantThumbnail: "/asset/images/Restaurants/japanese-sushi.svg",
    deliveryTime: "30-40 mins",
    minimumAmount: 10,
    currencySymbol: "$",
    categories: ["Sushi"],
    isFeatured: false,
  },
  {
    restaurantName: "Kobe",
    count: 0,
    restaurantThumbnail: "/asset/images/Restaurants/kobe.svg",
    deliveryTime: "30-40 mins",
    minimumAmount: 10,
    currencySymbol: "$",
    categories: ["Sushi"],
    isFeatured: false,
  },
];

const Restaurants = () => {
  return (
    <div className="w-full mt-10">
      <h5>Nearby restaurants</h5>
      <div className="flex flex-wrap gap-8 mt-3">
        {RestaurantCardList.map((restaurant) => (
          <RestaurantCard
            className="w-1/3 max-w-[calc(33.33%-2rem)]"
            key={restaurant.restaurantName}
            restaurant={restaurant}
          />
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
