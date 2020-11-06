import React from "react";
import {
	Accordion,
	AccordionItem,
	AccordionItemHeading,
	AccordionItemButton,
	AccordionItemPanel,
} from "react-accessible-accordion";

import "react-accessible-accordion/dist/fancy-example.css";
import useTrans from "../hooks/useTrans";

const CountryProfile = ({ profileData }) => {
	const { trans } = useTrans();

	const SI_SYMBOL = ["", "k", "M", "B", "T", "P", "E"];
	const formatNumber = (number) => {
		// what tier? (determines SI symbol)
		var tier = (Math.log10(number) / 3) | 0;

		// if zero, we don't need a suffix
		if (tier === 0) return number;

		// get suffix and determine scale
		var suffix = SI_SYMBOL[tier];
		var scale = Math.pow(10, tier * 3);

		// scale the number
		var scaled = number / scale;

		// format number and add suffix
		return scaled.toFixed(1) + suffix;
	};

	return (
		<Accordion allowMultipleExpanded allowZeroExpanded>
			<AccordionItem>
				<AccordionItemHeading>
					<AccordionItemButton>{trans("Equity Level")}</AccordionItemButton>
				</AccordionItemHeading>
				<AccordionItemPanel>
					<div className="[ flex flex-wrap ] px-4">
						<div className="mr-4 md:mr-12 mb-6">
							<h4>{trans("Unemployment rate")}</h4>
							<p className="text-3xl font-extrabold text-gray-900">
								{profileData.equity_unemployment_rate}%
							</p>
						</div>
						<div className="mr-4 md:mr-12 mb-6">
							<h4>{trans("Average income")}</h4>
							<p className="text-3xl font-extrabold text-gray-900">
								${profileData.equity_income_avg}
							</p>
						</div>
						<div className="mr-4 md:mr-12 mb-6">
							<h4>{trans("Gender distribution")}</h4>
							<div className="flex">
								<div className="mr-8 mb-4 md:mb-0">
									<p className="text-3xl font-extrabold text-gray-900">
										{profileData.equity_gender_dist_male}%
									</p>
									<p className="uppercase text-sm">{trans("male")}</p>
								</div>
								<div className="mr-8 mb-4 md:mb-0">
									<p className="text-3xl font-extrabold text-gray-900">
										{profileData.equity_gender_dist_female}%
									</p>
									<p className="uppercase text-sm">{trans("female")}</p>
								</div>
							</div>
						</div>
						<div className="mr-4 md:mr-12 mb-6">
							<h4>{trans("Age distribution")}</h4>
							<div className="flex flex-wrap">
								<div className="mr-8 mb-4 md:mb-0">
									<p className="text-3xl font-extrabold text-gray-900">
										{profileData.equity_age_dist_0_14}%
									</p>
									<p className="uppercase text-sm">0-14 {trans("yrs")}</p>
								</div>
								<div className="mr-8 mb-4 md:mb-0">
									<p className="text-3xl font-extrabold text-gray-900">
										{profileData.equity_age_dist_15_24}%
									</p>
									<p className="uppercase text-sm">15-24 {trans("yrs")}</p>
								</div>
								<div className="mr-8 mb-4 md:mb-0">
									<p className="text-3xl font-extrabold text-gray-900">
										{profileData.equity_age_dist_25_54}%
									</p>
									<p className="uppercase text-sm">25-54 {trans("yrs")}</p>
								</div>
								<div className="mr-8 mb-4 md:mb-0">
									<p className="text-3xl font-extrabold text-gray-900">
										{profileData.equity_age_dist_55_64}%
									</p>
									<p className="uppercase text-sm">55-64 {trans("yrs")}</p>
								</div>
								<div>
									<p className="text-3xl font-extrabold text-gray-900">
										{profileData.equity_age_dist_65_above}%
									</p>
									<p className="uppercase text-sm">65 & above</p>
								</div>
							</div>
						</div>
					</div>
				</AccordionItemPanel>
			</AccordionItem>
			<AccordionItem>
				<AccordionItemHeading>
					<AccordionItemButton>{trans("Procurement")}</AccordionItemButton>
				</AccordionItemHeading>
				<AccordionItemPanel>
					<div className="[ flex flex-wrap px-4 ] ">
						<div className="mr-4 md:mr-12 mb-6">
							<h4>{trans("Annual public procurement spending")}</h4>
							<p className="text-3xl font-extrabold text-gray-900">
								${formatNumber(profileData.procurement_annual_public_spending)}
							</p>
						</div>
						<div className="mr-4 md:mr-12 mb-6">
							<h4>{trans("% of Procurement to GDP")}</h4>
							<p className="text-3xl font-extrabold text-gray-900">
								{profileData.procurement_gdp_pc}%
							</p>
						</div>
						<div className="mr-4 md:mr-12 mb-6">
							<h4>{trans("COVID-19 spending")}</h4>
							<p className="text-3xl font-extrabold text-gray-900">
								${formatNumber(profileData.procurement_covid_spending)}
							</p>
						</div>
						<div className="mr-4 md:mr-12 mb-6">
							<h4>{trans("% from total procurement market")}</h4>
							<p className="text-3xl font-extrabold text-gray-900">
								{profileData.procurement_total_market_pc}%
							</p>
						</div>
					</div>
					<div className="px-4">
						<a href="" className="text-blue-600">
							{trans("See Mexico's procurement portal")}
						</a>
					</div>
				</AccordionItemPanel>
			</AccordionItem>
			<AccordionItem>
				<AccordionItemHeading>
					<AccordionItemButton>
						{trans("COVID-19 Procurement Policy")}
					</AccordionItemButton>
				</AccordionItemHeading>
				<AccordionItemPanel>
					<div className="px-4">
						<p>{profileData.covid19_procurement_policy}</p>
					</div>
				</AccordionItemPanel>
			</AccordionItem>
			<AccordionItem>
				<AccordionItemHeading>
					<AccordionItemButton>
						{trans("COVID-19 Preparedness")}
					</AccordionItemButton>
				</AccordionItemHeading>
				<AccordionItemPanel>
					<div className="px-4">
						<p>{profileData.covid19_preparedness}</p>
					</div>
				</AccordionItemPanel>
			</AccordionItem>
		</Accordion>
	);
};

export default CountryProfile;
