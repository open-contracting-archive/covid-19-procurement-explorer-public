import React, { useState, useEffect } from "react";
import Iframe from "react-iframe";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import CountryProfileTable from "../components/countryProfileTable";
import CountryProfile from "../components/countryProfile";
import JsonServices from "../services/jsonServices";
import useTrans from "../hooks/useTrans";

function Country() {
	const [selectedCountry] = useState("mexico");
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		JsonServices.getProfileByCountry(selectedCountry).then((response) => {
			if (response) {
				setData(response);
			}
			setLoading(false);
		});
	}, [selectedCountry]);

	const { trans } = useTrans();

	return (
		<section className="px-4 py-8">
			<div className="container mx-auto">
				<h2 className="font-bold mb-5 text-3xl text-gray-900">{data.name}</h2>
				<div className="flex flex-wrap -mx-4 -mb-4">
					<div className="w-full md:w-1/2 lg:w-7/12 px-4 mb-4">
						<div className="">
							<Iframe
								url={data.map_url}
								width="100%"
								height="450px"
								id=""
								className=""
								display="initial"
								position="relative"
							/>
						</div>
					</div>
					<div className="w-full md:w-1/2 lg:w-5/12 px-4 mb-4">
						<div className="flex flex-col text-gray-800 font-extrabold">
							<div className="p-8 py-4 border border-gray-800">
								<div className="flex flex-wrap -mx-4 -mb-4">
									<div className="w-full xs:w-1/2 px-4 mb-4">
										<div>
											<span className="text-lg inline-block">
												{trans("general.Population")}
											</span>
											<h2 className="text-3xl">{data.population}</h2>
										</div>
									</div>
									<div className="w-full xs:w-1/2 px-4 mb-4">
										<div>
											<span className="text-lg inline-block">
												{trans("GDP")}
											</span>
											<h2 className="text-3xl">
												{data.gdp}
												<span className="inline-block uppercase text-xl tracking-tight">
													{data.currency}
												</span>
											</h2>
										</div>
									</div>
									<div className="w-full xs:w-1/2 px-4 mb-4">
										<div>
											<span className="text-lg font-extrabold  inline-block">
												{trans("general.Healthcare budget")}
											</span>
											<h2 className="text-3xl">
												{data.healthcare_budget}
												<span className="inline-block uppercase text-sm tracking-tight">
													{data.currency}
												</span>
											</h2>
											<span className="block text-lg font-extrabold">
												{trans("general.per capita")}
											</span>
										</div>
									</div>
									<div className="w-full xs:w-1/2 px-4 mb-4">
										<div>
											<span className="text-lg font-extrabold  inline-block">
												{trans("general.% of GDP to healthcare")}
											</span>
											<h2 className="text-3xl">
												{data.healthcare_gdp}
												<span className="inline-block uppercase text-sm tracking-tight">
													%
												</span>
											</h2>
										</div>
									</div>
									<div className="w-full px-4 mb-4">
										<div>
											<p className="text-sm font-normal">
												{trans("general.Source")}:
												<a
													href={data.source}
													className="ml-1 text-blue-600"
													title="John Hopkins University"
												>
													{trans("general.John Hopkins University")}
												</a>
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className="p-8 py-4 border border-t-0 border-gray-800">
								<div className="flex flex-wrap -mx-4 -mb-4">
									<div className="w-full xs:w-1/2 px-4 mb-4">
										<div>
											<span className="text-lg inline-block">
												{trans("general.Total Covid-19 cases")}
											</span>
											<h2 className="text-3xl">{data.covid_case}</h2>
										</div>
									</div>
									<div className="w-full xs:w-1/2 px-4 mb-4">
										<div>
											<span className="text-lg inline-block">
												{trans("general.Total deaths by Covid-19")}
											</span>
											<h2 className="text-3xl">{data.covid_case_deaths}</h2>
										</div>
									</div>
									<div className="w-full px-4 mb-4">
										<div>
											<p className="text-sm font-normal">
												{trans("general.Source")}:
												<a
													href={data.source}
													className="ml-1 text-blue-600"
													title="John Hopkins University"
												>
													{trans("general.John Hopkins University")}
												</a>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div>
					<Tabs>
						<TabList>
							<Tab>{trans("general.Tenders")}</Tab>
							<Tab>{trans("general.Profile")}</Tab>
						</TabList>
						<TabPanel>
							<CountryProfileTable tenderData={data.tender} />
						</TabPanel>
						<TabPanel>
							<CountryProfile profileData={data.profile} />
						</TabPanel>
					</Tabs>
				</div>
			</div>
		</section>
	);
}

export default Country;
