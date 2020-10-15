import React from "react";

function CountryProfile() {
	return (
		<div>
			<table>
				<thead>
					<tr>
						<th style={{ width: "35%" }}>Project Title</th>
						<th>Procurement Method</th>
						<th>Supplier</th>
						<th>Status</th>
						<th>Value (USD)</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							Esse velit incididunt laboris tempor eiusmod aliqua tempor duis ex
							aute.
						</td>
						<td>open</td>
						<td className="uppercase">uniparts, s.a. de c.v</td>
						<td>active</td>
						<td>2,236,000</td>
						<td>
							<span className="bg-gray-300 inline-block px-4 rounded-full text-orange-500 text-xs">
								3
							</span>
						</td>
					</tr>
					<tr>
						<td>
							Esse velit incididunt laboris tempor eiusmod aliqua tempor duis ex
							aute.
						</td>
						<td>open</td>
						<td className="uppercase">uniparts, s.a. de c.v</td>
						<td>active</td>
						<td>2,236,000</td>
						<td>
							<span className="bg-gray-300 inline-block px-4 rounded-full text-orange-500 text-xs">
								1
							</span>
						</td>
					</tr>
					<tr>
						<td>
							Esse velit incididunt laboris tempor eiusmod aliqua tempor duis ex
							aute.
						</td>
						<td>open</td>
						<td className="uppercase">uniparts, s.a. de c.v</td>
						<td>active</td>
						<td>2,236,000</td>
						<td>
							<span></span>
						</td>
					</tr>
					<tr>
						<td>
							Esse velit incididunt laboris tempor eiusmod aliqua tempor duis ex
							aute.
						</td>
						<td>open</td>
						<td className="uppercase">uniparts, s.a. de c.v</td>
						<td>active</td>
						<td>2,236,000</td>
						<td>
							<span className="bg-gray-300 inline-block px-4 rounded-full text-orange-500 text-xs">
								10
							</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default CountryProfile;
