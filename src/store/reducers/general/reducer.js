import * as types from './type'
import Default from '../../../constants/Default'

const initialState = {
    currentCountry: null,
    currentLocale: Default.LOCALE,
    translations: { en: {}, es: {} },
    currency: Default.CURRENCY_USD,
    countryCurrency: '',
    countries: [],
    equities: [],
    contractMethods: [],
    contractStates: [],
    productCategories: [],
    redFlags: [],
    languages: []
}

const GeneralReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case types.SET_CURRENT_COUNTRY:
            return { ...state, currentCountry: payload }

        case types.SET_CURRENT_LOCALE:
            return { ...state, currentLocale: payload }

        case types.SET_TRANSLATIONS:
            return { ...state, translations: payload }

        case types.SET_CURRENCY:
            return { ...state, currency: payload }

        case types.SET_COUNTRY_CURRENCY:
            return { ...state, countryCurrency: payload }

        case types.SET_COUNTRIES:
            return { ...state, countries: payload }

        case types.SET_CONTRACT_METHODS:
            return { ...state, contractMethods: payload }

        case types.SET_CONTRACT_STATES:
            return { ...state, contractStates: payload }

        case types.SET_PRODUCT_CATEGORIES:
            return { ...state, productCategories: payload }

        case types.SET_EQUITY_INDICATORS:
            return { ...state, equities: payload }

        case types.SET_RED_FLAGS:
            return { ...state, redFlags: payload }

        case types.SET_LANGUAGES:
            return { ...state, languages: payload }

        default:
            return state
    }
}

export default GeneralReducer
