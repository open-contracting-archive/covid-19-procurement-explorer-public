import { createAction } from 'redux-actions'
import * as types from './type'

export const setCurrentCountry = createAction(types.SET_CURRENT_COUNTRY)

export const setCurrency = createAction(types.SET_CURRENCY)

export const setCurrentLocale = (locale) => {
    window.localStorage.setItem('locale', locale)
    return {
        type: types.SET_CURRENT_LOCALE,
        payload: locale
    }
}

export const setTranslations = createAction(types.SET_TRANSLATIONS)

export const setCountries = (countries) => {
    return {
        type: types.SET_COUNTRIES,
        payload: countries
    }
}
