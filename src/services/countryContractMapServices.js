import countryContractMapdata from '../data/map_country.json'


class CountryContractMapServices {
    static async getContractData() {
        return countryContractMapdata
    }
}

export default CountryContractMapServices
