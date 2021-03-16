import { get, isEmpty } from 'lodash'
import { useSelector } from 'react-redux'

const useCountries = () => {
    const countries = useSelector((state) => state.general.countries)
    const languages = useSelector((state) => state.general.languages)

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
        },

        languageById: (languageId) => {
            if (!languageId) {
                return ''
            }

            const language = languages.find((language) => language.id === languageId)
            return language ? language.name : languageId
        },

        globalCountryItem: () => countries.find((country) => country.slug === 'global')
    }
}

export default useCountries
