import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { isEmpty } from 'lodash'
import {
    setCountryCurrency,
    setCurrency
} from '../../../store/reducers/general/action'
import {
    DATA,
    INSIGHTS,
    CONTRACTS,
    EQUITY,
    BUYERS,
    SUPPLIERS,
    PRODUCTS,
    METHODOLOGY
} from '../../../constants/Tab'
import Default from '../../../constants/Default'
import {
    CountryBuyers,
    CountryContracts,
    CountryData,
    CountryEquity,
    CountryInsights,
    CountryMethodology,
    CountryProducts,
    CountrySuppliers
} from './tabs'
import {
    CountrySelector,
    MetaInformation,
    ErrorHandler
} from '../../../components/Utilities'
import { CountryWrapper } from '../../../context/CountryContext'
import TabNavigator from './sections/TabNavigator'
import CountryMapElement from './sections/CountryMapElement'
import CountryInfo from './sections/CountryInfo'

const CountryProfile = () => {
    const countries = useSelector((state) => state.general.countries)
    const [countryData, setCountryData] = useState({})
    const { countrySlug } = useParams()
    const { tabSlug } = useParams()
    const dispatch = useDispatch()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        try {
            let country = countries.find(
                (country) => country.slug === countrySlug
            )

            if (!country) {
                throw 'Country not found'
            }

            setCountryData(country)
            dispatch(setCountryCurrency(country.currency))
        } catch (error) {
            console.log(error)
        }

        return () => {
            dispatch(setCurrency(Default.CURRENCY_USD))
        }
    }, [countries, countrySlug])

    const renderTab = () => {
        switch (tabSlug) {
            case DATA:
                return <CountryData />
            case INSIGHTS:
                return <CountryInsights />
            case CONTRACTS:
                return <CountryContracts />
            case EQUITY:
                return <CountryEquity />
            case BUYERS:
                return <CountryBuyers />
            case SUPPLIERS:
                return <CountrySuppliers />
            case PRODUCTS:
                return <CountryProducts />
            case METHODOLOGY:
                return <CountryMethodology countryId={countryData.id} />
            default:
                return <CountryData />
        }
    }

    return isEmpty(countryData) ? (
        <ErrorHandler message="Country not found" />
    ) : (
        <section className="pt-10 md:pt-20 -mt-8 bg-blue-0">
            <MetaInformation
                title={countryData.name}
                description={countryData.name}
            />
            <CountryWrapper country={countryData}>
                <section className="px-4">
                    <div className="container mx-auto">
                        <CountrySelector />

                        <div className="relative flex flex-wrap -mx-2 -mb-4">
                            <CountryMapElement />
                            <CountryInfo />
                        </div>
                    </div>
                </section>

                <TabNavigator
                    endpoint={'country'}
                    countrySlug={countryData.slug}
                />

                <div
                    style={{
                        borderTop: '5px solid #1fbbec'
                    }}
                    className="py-6 md:py-16 bg-primary-gray px-4"
                >
                    <div className="container mx-auto">{renderTab()}</div>
                </div>
            </CountryWrapper>
        </section>
    )
}
export default CountryProfile
