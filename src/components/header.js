import React from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
		<div className="bg-gray-900 text-white py-4 px-4">
			<div className="container [ mx-auto ] [ flex justify-between items-center ]">
				<div className="w-24 leading-none">
					<NavLink to="/" className="leading-snug">
						Covid-19 Procurement Explorer
					</NavLink>
				</div>
				<div>
					<ul className="flex">
						<li className="ml-8">
							<NavLink exact activeClassName="active" to="/">
								Home
							</NavLink>
						</li>
						<li className="ml-8">
							<NavLink activeClassName="active" to="/about">
								About
							</NavLink>
						</li>
						<li className="ml-8">
							<NavLink activeClassName="active" to="/country/mexico">
								Country
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Header;
