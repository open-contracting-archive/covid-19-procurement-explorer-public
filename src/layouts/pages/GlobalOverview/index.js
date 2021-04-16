import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import useCountries from '../../../hooks/useCountries'
import { WorldMap } from '../../../components/Visualizations'
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
import { CountrySelector, MetaInformation } from '../../../components/Utilities'

const TabNavigator = React.lazy(() =>
    import(
        /* webpackChunkName: "app-data-page" */ '../CountryProfile/sections/TabNavigator'
    )
)
const GlobalData = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './tabs/GlobalData')
)
const GlobalInsights = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './tabs/GlobalInsights')
)
const GlobalContracts = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './tabs/GlobalContracts')
)
const GlobalEquity = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './tabs/GlobalEquity')
)
const GlobalBuyers = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './tabs/GlobalBuyers')
)
const GlobalSuppliers = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './tabs/GlobalSuppliers')
)
const GlobalProducts = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './tabs/GlobalProducts')
)
const DataDisclaimerInfo = React.lazy(() =>
    import(
        /* webpackChunkName: "app-data-page" */ '../CountryProfile/partials/DataDisclaimerInfo'
    )
)
const CountryMethodology = React.lazy(() =>
    import(
        /* webpackChunkName: "app-data-page" */ '../CountryProfile/tabs/CountryMethodology'
    )
)

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
