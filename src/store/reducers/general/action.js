import { createAction } from 'redux-actions'
import * as types from './type'

export const setCurrentCountry = createAction(types.SET_CURRENT_COUNTRY)

export const setCurrency = (currency) => {
    return {
        type: types.SET_CURRENCY,
        payload: currency
    }
}

export const setCountryCurrency = (currency) => {
    return {
        type: types.SET_COUNTRY_CURRENCY,
        payload: currency
    }
}

export const setCurrentLocale = (locale) => {
    window.localStorage.setItem('locale', locale)
    return {
        type: types.SET_CURRENT_LOCALE,
        payload: locale
    }
}

export const setCountries = (countries) => {
    return {
        type: types.SET_COUNTRIES,
        payload: countries
    }
}

export const setContractMethods = (methods) => {
    return {
        type: types.SET_CONTRACT_METHODS,
        payload: methods
    }
}

export const setContractStates = (states) => {
    return {
        type: types.SET_CONTRACT_STATES,
        payload: states
    }
}

export const setProductCategories = (productCategories) => {
    return {
        type: types.SET_PRODUCT_CATEGORIES,
        payload: productCategories
    }
}

export const setEquityIndicators = (equityIndicators) => {
    return {
        type: types.SET_EQUITY_INDICATORS,
        payload: equityIndicators
    }
}

export const setRedFlags = (redFlags) => {
    return {
        type: types.SET_RED_FLAGS,
        payload: redFlags
    }
}

export const setLanguages = (languages) => {
    return {
        type: types.SET_LANGUAGES,
        payload: languages
    }
}
