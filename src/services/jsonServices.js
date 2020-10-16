import countryProfiledata from "../data/country_profile.json";
import translations from "../data/lang";

class JsonServices {
	static async getProfileByCountry(country) {
		return countryProfiledata[country] || null;
	}

	static async getTranslations() {
		return translations;
	}
}

export default JsonServices;
