import { get, isEmpty } from 'lodash'
import { useSelector } from 'react-redux'

const useCountries = () => {
    const countries = useSelector((state) => state.general.countries)

    return {
        countryNameById: (countryId) => {
            if (!countryId) {
                return ''
            }

            const country = countries.find((country) => country.id === countryId)
            return country ? country.name : countryId
        },
        countryDetailByCode: (countryCode) => {
            if (!countryCode) {
                return ''
            }

            const country = countries.find((country) => country.country_code_alpha_2 === countryCode)
            return country ? country.name : countryCode
        }
    }
}

export default useCountries
