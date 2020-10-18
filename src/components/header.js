import React from "react";
import { NavLink } from "react-router-dom";
import useTrans from "../hooks/useTrans";
import LanguageSwitcherSelector from "../components/languageSwitcherSelector";
const Header = () => {
	const { trans } = useTrans();
  return (
		<div className="bg-gray-900 text-white py-4 px-4">
			<div className="container [ mx-auto ] [ flex justify-between items-center ]">
				<div className="w-24 leading-none">
					<NavLink to="/" className="leading-snug">
						Covid-19 Procurement Explorer
					</NavLink>
				</div>
				<div className="flex items-center">
					<ul className="flex">
						<li className="mr-8">
							<NavLink exact activeClassName="active" to="/">
								{trans("general.Home")}
							</NavLink>
						</li>
						<li className="mr-8">
							<NavLink activeClassName="active" to="/about">
								{trans("general.About")}
							</NavLink>
						</li>
						<li className="mr-8">
							<NavLink activeClassName="active" to="/country/mexico">
								{trans("general.Country")}
							</NavLink>
						</li>
					</ul>
					<LanguageSwitcherSelector />
				</div>
			</div>
		</div>
	);
};

export default Header;
