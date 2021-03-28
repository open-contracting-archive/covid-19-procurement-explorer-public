import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import TabNavigator from '../CountryProfile/sections/TabNavigator'
import WorldMap from '../../../components/Visualizations/WorldMap'
import GlobalData from './tabs/GlobalData'
import GlobalInsights from './tabs/GlobalInsights'
import GlobalContracts from './tabs/GlobalContracts'
import GlobalEquity from './tabs/GlobalEquity'
import GlobalBuyers from './tabs/GlobalBuyers'
import GlobalSuppliers from './tabs/GlobalSuppliers'
import GlobalProducts from './tabs/GlobalProducts'
import {
    BUYERS,
    CONTRACTS,
    DATA,
    EQUITY,
    INSIGHTS,
    METHODOLOGY,
    PRODUCTS,
    SUPPLIERS
} from '../../../constants/Tab'
import CountrySelector from '../../../components/CountrySelector/CountrySelector'
import MetaInformation from '../../../components/MetaInformation/MetaInformation'
import DataDisclaimerInfo from '../CountryProfile/partials/DataDisclaimerInfo'
import useCountries from '../../../hooks/useCountries'
import CountryMethodology from '../CountryProfile/tabs/CountryMethodology'

const GlobalOverview = () => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    let { tabSlug } = useParams()
    const { globalCountryItem } = useCountries()
    const disclaimerInfo = (
        <DataDisclaimerInfo forwardUrl={`/global-overview/methodology`} />
    )

    const renderTab = () => {
        switch (tabSlug) {
            case DATA:
                return <GlobalData disclaimerInfo={disclaimerInfo} />
            case INSIGHTS:
                return <GlobalInsights />
            case CONTRACTS:
                return <GlobalContracts disclaimerInfo={disclaimerInfo} />
            case EQUITY:
                return <GlobalEquity disclaimerInfo={disclaimerInfo} />
            case BUYERS:
                return <GlobalBuyers disclaimerInfo={disclaimerInfo} />
            case SUPPLIERS:
                return <GlobalSuppliers disclaimerInfo={disclaimerInfo} />
            case PRODUCTS:
                return <GlobalProducts disclaimerInfo={disclaimerInfo} />
            case METHODOLOGY:
                return <CountryMethodology countryId={globalCountryItem().id} />
            default:
                return <GlobalData disclaimerInfo={disclaimerInfo} />
        }
    }

    return (
        <Fragment>
            <MetaInformation
                title="Global Overview"
                description="Welcome Covid-19 Contract Explorer"
            />
            <section className="global-profile -mt-8">
                <section className="bg-blue-0 pt-12 md:pt-20 px-4">
                    <div className="container mx-auto">
                        <CountrySelector />
                        <WorldMap />
                    </div>
                </section>
                <TabNavigator endpoint={'global-overview'} />
                <div
                    style={{
                        borderTop: '5px solid #1fbbec'
                    }}
                    className="py-6 md:py-16 bg-primary-gray px-4">
                    <div className="container mx-auto">{renderTab()}</div>
                </div>
            </section>
        </Fragment>
    )
}

export default GlobalOverview
