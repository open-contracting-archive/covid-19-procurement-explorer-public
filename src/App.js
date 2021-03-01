import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ModalProvider } from 'react-simple-hook-modal'
import ReactGA from 'react-ga'
import {
    setContractMethods,
    setContractStates,
    setCountries,
    setCurrentLocale,
    setEquityIndicators,
    setProductCategories,
    setRedFlags,
    setTranslations
} from './store/reducers/general/action'
import CountryService from './services/CountryService'
import GeneralService from './services/GeneralService'
import RouterView from "./RouterView"

if (
    process.env.NODE_ENV === 'production' &&
    process.env.REACT_APP_GOOGLE_ANALYTICS_ID
) {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID)
    ReactGA.pageview(window.location.pathname + window.location.search)
}

function App() {
    const dispatch = useDispatch()
    const currentLocale = useSelector((state) => state.general.currentLocale)

    useEffect(() => {
        dispatch(
            setCurrentLocale(window.localStorage.getItem('locale') || 'es')
        )

        CountryService.getTranslations(currentLocale)
            .then((response) => {
                if (response) {
                    dispatch(setTranslations(response))
                }
            })
            .catch((error) => console.log(error))
    }, [dispatch, currentLocale])

    useEffect(() => {
        CountryService.Countries().then((response) => {
            if (response) {
                dispatch(setCountries(response))
            }
        })

        GeneralService.getStaticFilters(currentLocale)
            .then((response) => {
                if (response) {
                    dispatch(setContractMethods(response.method))
                    dispatch(setContractStates(response.status))
                    dispatch(setProductCategories(response.products))
                    dispatch(setEquityIndicators(response.equity))
                    dispatch(setRedFlags(response.red_flag))
                }
            })
    }, [dispatch])

    return (
        <Fragment>
            <ModalProvider>
                <RouterView />
            </ModalProvider>
        </Fragment>
    )
}

export default App
