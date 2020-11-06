import * as types from './type'

const initialState = {
    currentCountry: null,
    currentLocale: 'en',
    translations: { en: {}, es: {} }
}

const GeneralReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case types.SET_CURRENT_COUNTRY:
            return { ...state, currentCountry: payload }

        case types.SET_CURRENT_LOCALE:
            return { ...state, currentLocale: payload }

        case types.SET_TRANSLATIONS:
            return { ...state, translations: payload }

        default:
            return state
    }
}

export default GeneralReducer
