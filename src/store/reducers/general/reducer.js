import * as types from './type'

const initialState = {
    currentCountry: null,
    currentLocale: 'en',
    translations: { en: {}, es: {} },
    currency: 'usd',
    countries: []
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

        case types.SET_COUNTRIES:
            return { ...state, countries: payload }

        default:
            return state
    }
}

export default GeneralReducer
