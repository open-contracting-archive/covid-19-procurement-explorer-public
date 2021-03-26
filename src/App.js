import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ModalProvider } from 'react-simple-hook-modal'
import {
    setContractMethods,
    setContractStates,
    setCountries,
    setCurrentLocale,
    setEquityIndicators,
    setProductCategories,
    setRedFlags,
    setTranslations,
    setLanguages
} from './store/reducers/general/action'
import CountryService from './services/CountryService'
import GeneralService from './services/GeneralService'
import RouterView from './RouterView'
import { init } from 'cookie-though'
import cookieConfig from './components/Utilities/CookieConfig'

init(cookieConfig)

function App() {
    const dispatch = useDispatch()
    const currentLocale = useSelector((state) => state.general.currentLocale)
    const countries = useSelector((state) => state.general.countries)

    useEffect(() => {
        dispatch(
            setCurrentLocale(window.localStorage.getItem('locale') || 'en')
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
            dispatch(setLanguages(response.results))
        })
    }, [dispatch])

    return (
        <Fragment>
            <ModalProvider>
                {countries.length > 0 && <RouterView />}
            </ModalProvider>
        </Fragment>
    )
}

export default App
