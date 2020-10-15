import React from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <div className="container [ m-auto py-4 px-4 ] [ flex justify-between items-center ]">
      <div className="w-24 leading-none">
        <NavLink to="/" className="font-bold">
          Covid-19 Procurement Explorer
        </NavLink>
      </div>
      <div>
        <ul className="flex">
          <li className="ml-12">
            <NavLink exact activeClassName="active" to="/">
              Home
            </NavLink>
          </li>
          <li className="ml-12">
            <NavLink activeClassName="active" to="/about">
              About
            </NavLink>
          </li>
          <li className="ml-12">
            <NavLink activeClassName="active" to="/country/mexico">
              Country
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
