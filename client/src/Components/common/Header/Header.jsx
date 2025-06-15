import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Search from '../Search/Search';
import './Header.css';
import ShoppingBag from '../Shopping-bag/ShoppingBag';
import useDeviceType, { DEVICE_TYPE } from '../../../utils/deviceType';

const Header = () => {
  const handleSearch = value => {
    console.log(value);
  };

  const deviceType = useDeviceType();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full flex justify-center ">
      <div className="container w-full mx-auto main-header max-w-screen-lg">
        <header className=" flex justify-between items-center p-4">
          <div className="flex items-center gap-12">
            <Link to="/" className="text-gray-800 dark:text-white">
              <img src="/asset/logo/shape.svg" alt="Logo" className="w-20 h-10" />
            </Link>
            {deviceType !== DEVICE_TYPE.MOBILE && <Search onSearch={handleSearch} />}
          </div>

          <div className="flex items-center space-x-6">
            {deviceType === DEVICE_TYPE.DESKTOP && (
              <div className={`lg:flex items-center space-x-6 `}>
                <div className="menus lg:flex hidden">
                  <menu>Restaurants</menu>
                  <menu>Deals</menu>
                  <menu>My Orders</menu>
                </div>
              </div>
            )}
            <Link to="/bag">
              <ShoppingBag count={4} />
            </Link>
            <Link to="/profile">
              <img
                className="w-8 h-8 cursor-pointer rounded-2xl"
                src="/asset/icons/user.svg"
                alt="Profile"
              />
            </Link>

            {deviceType !== DEVICE_TYPE.DESKTOP && (
              <div className="hamburger-menu-wrapper">
                <div className="hamburger-menu w-8 h-8  cursor-pointer rounded-2xl lg:hidden">
                  <img
                    className="w-4 h-4 "
                    src="/asset/icons/hamburger.svg"
                    alt="menu"
                    onClick={toggleMenu}
                  />
                </div>
              </div>
            )}
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
