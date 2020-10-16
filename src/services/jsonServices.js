import countryProfiledata from "../data/country_profile.json";

class JsonServices {
	static async getProfileByCountry(country) {
		return countryProfiledata[country] || null;
	}
}

export default JsonServices;
