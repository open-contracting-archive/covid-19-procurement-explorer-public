import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ModalProvider } from 'react-simple-hook-modal'
import {
    setContractMethods,
    setContractStates,
    setCountries,
    setEquityIndicators,
    setProductCategories,
    setRedFlags
} from './store/reducers/general/action'
import CountryService from './services/CountryService'
import GeneralService from './services/GeneralService'
import RouterView from './layouts/RouterView'
import { init } from 'cookie-though'
import cookieConfig from './components/Utilities/CookieConfig'
import { tx } from '@transifex/native'
import { load } from 'fathom-client'

init(cookieConfig)
tx.init({
    token: process.env.REACT_APP_TRANSIFEX_TOKEN
})

const domain =
    process.env.REACT_APP_FATHOM_ANALYTICS_DOMAIN || 'cdn.usefathom.com'
const siteKey = process.env.REACT_APP_FATHOM_ANALYTICS_ID

if (process.env.NODE_ENV === 'production' && domain && siteKey) {
    load(siteKey, {
        url: `https://${domain}/script.js`,
        excludedDomains: ['localhost', '127.0.0.1', '0.0.0.0'],
        spa: 'auto'
    })
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
