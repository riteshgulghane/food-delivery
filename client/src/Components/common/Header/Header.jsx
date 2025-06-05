import React from "react";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import "./Header.css";
import ShoppingBag from "../Shopping-bag/ShoppingBag";

const Header = () => {
  const handleSearch = (value) => {
    console.log(value);
  };

  return (
    <div className="w-full main-header">
      <div className="container w-full mx-auto">
        <header className=" flex justify-between items-center p-4">
          <div className="flex items-center gap-12">
            <Link to="/" className="text-gray-800 dark:text-white">
              <img
                src="/asset/logo/shape.svg"
                alt="Logo"
                className="w-20 h-10"
              />
            </Link>
            <Search onSearch={handleSearch} />
          </div>

          <div className="flex items-center space-x-6">
            <div className="menus">
              <menu>Restaurants</menu>
              <menu>Deals</menu>
              <menu>My Orders</menu>
            </div>
            <Link to="/bag">
                <ShoppingBag count={4} />
            </Link>
            {/* <Link to="/profile">
              <img src="%PUBLIC_URL%/asset/icons/user.svg" alt="Profile" />
            </Link> */}
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
