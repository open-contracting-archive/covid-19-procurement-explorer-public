import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ModalProvider } from 'react-simple-hook-modal'
import { tx } from '@transifex/native'
import { load } from 'fathom-client'
import {
    setContractMethods,
    setContractStates,
    setCountries,
    setEquityIndicators,
    setLanguages,
    setProductCategories,
    setRedFlags
} from './store/reducers/general/action'
import CountryService from './services/CountryService'
import GeneralService from './services/GeneralService'
import RouterView from './layouts/RouterView'
import { LocaleProvider } from './context/LocaleProvider'

if (process.env.NODE_ENV === 'production') {
    const domain =
        process.env.REACT_APP_FATHOM_ANALYTICS_DOMAIN || 'cdn.usefathom.com'
    const siteKey = process.env.REACT_APP_FATHOM_ANALYTICS_ID

    if (domain && siteKey) {
        load(siteKey, {
            url: `https://${domain}/script.js`,
            excludedDomains: ['localhost', '127.0.0.1', '0.0.0.0'],
            spa: 'auto'
        })
    }

    if (process.env.REACT_APP_TRANSIFEX_TOKEN) {
        const locale = window.localStorage.getItem('locale')
        tx.init({
            token: process.env.REACT_APP_TRANSIFEX_TOKEN
        })
        tx.setCurrentLocale(locale)
    }
}

function App() {
    const dispatch = useDispatch()
    const countries = useSelector((state) => state.general.countries)

    useEffect(() => {
        CountryService.Countries().then((response) => {
            if (response) {
                dispatch(setCountries(response))
            }
        })

        GeneralService.getStaticFilters().then((response) => {
            if (response) {
                dispatch(setContractMethods(response.method))
                dispatch(setContractStates(response.status))
                dispatch(setProductCategories(response.products))
                dispatch(setEquityIndicators(response.equity))
                dispatch(setRedFlags(response.red_flag))
            }
        })
        CountryService.getLanguages().then((response) => {
            if (response) {
                dispatch(setLanguages(response.results))
            }
        })
    }, [dispatch])

    return (
        <Fragment>
            <ModalProvider>
                <LocaleProvider>
                    {countries.length > 0 ? <RouterView /> : ''}
                </LocaleProvider>
            </ModalProvider>
        </Fragment>
    )
}

export default App
