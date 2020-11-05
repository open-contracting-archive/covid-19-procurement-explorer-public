import React, { Fragment } from "react";
import useTrans from "../hooks/useTrans";


const Home = () => {

	const { trans } = useTrans();

	return (
		<Fragment>
			<main
				className="container [ mx-auto mt-12 px-4 ] [ flex flex-col justify-center ]"
				style={{ height: "600px" }}
			>
				<h1 className="[ text-4xl md:text-6xl font-bold uppercase leading-tight ] w-1/2">
					{trans("EMERGENCY PROCUREMENT")}
				</h1>

				<p className="[ text-lg uppercase ] mt-6">
					{trans("DATA, BEST PRACTICES AND RECOMMENDATIONS")}
				</p>

				<div className="mt-16 [ flex flex-wrap md:flex-no-wrap ]">
					<a href="" className="flex [ mr-12 mb-10 ]">
						<div className="home-circle mr-4 mt-1">{">"}</div>
						<div>
							<p className="[ text-2xl font-bold uppercase ]">
								{trans("Explore data")}
							</p>
							<p className="text-gray-600">
								{trans("Stats from countries")}
							</p>
						</div>
					</a>
					<a href="" className="flex">
						<div className="home-circle mr-4 mt-1">{">"}</div>
						<div>
							<p className="[ text-2xl font-bold uppercase ]">
								{trans("Explore library")}
							</p>
							<p className="text-gray-600">
								{trans("Best practices and resources")}
							</p>
						</div>
					</a>
				</div>
			</main>
			<section>
				<div className="container [ mx-auto px-4 ] [ flex md:justify-between flex-col md:flex-row ]">
					<div className="text-white bg-gray-800 [ flex flex-col justify-between ] [ p-10 ] mb-4 ">
						<p>{trans("We have aggregated best practices from all over the world")}</p>
						<a href="" className="uppercase text-white mt-10 inline-block">
							<p>{trans("explore")}</p>
							<p className="text-2xl">{trans("Library")} {">"}</p>
						</a>
					</div>
					<div className="text-white bg-gray-800 [ flex flex-col justify-between ] [ p-10 md:mx-4 mb-4 ]">
						<p>{trans("Monitor and explore Covid-19 related procurement data")}</p>
						<a href="" className="uppercase text-white mt-10 inline-block">
							<p>{trans("explore")}</p>
							<p className="text-2xl">{trans("Data")} {">"}</p>
						</a>
					</div>
					<div className="text-white bg-gray-800 [ flex flex-col justify-between ] [ p-10 ] mb-4">
						<p>{trans("Track your country's Covid-19 procurement status")}</p>
						<a href="" className="uppercase text-white mt-10 inline-block">
							<p>{trans("explore")}</p>
							<p className="text-2xl">{trans("Countries")} {">"}</p>
						</a>
					</div>
				</div>
			</section>
		</Fragment>
	);
};

export default Home;
