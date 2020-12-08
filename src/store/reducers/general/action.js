import { createAction } from 'redux-actions'
import * as types from './type'

export const setCurrentCountry = createAction(types.SET_CURRENT_COUNTRY)

export const setCurrentLocale = (locale) => {
    window.localStorage.setItem('locale', locale)

    return {
        type: types.SET_CURRENT_LOCALE,
        payload: locale
    }
}

export const setCurrency = createAction(types.SET_CURRENCY)

export const setTranslations = createAction(types.SET_TRANSLATIONS)
