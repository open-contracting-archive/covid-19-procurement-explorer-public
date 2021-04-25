import React, { Fragment } from 'react'
import { MetaInformation } from '../../../components/Utilities'

const HomeBanner = React.lazy(() =>
    import(/* webpackChunkName: "app-common" */ './sections/HomeBanner')
)
const MainVisualization = React.lazy(() =>
    import(
        /* webpackChunkName: "app-data-page" */ './sections/MainVisualization'
    )
)
const NewsSection = React.lazy(() =>
    import(/* webpackChunkName: "app-common" */ './sections/NewsSection')
)
const LibrarySection = React.lazy(() =>
    import(/* webpackChunkName: "app-common" */ './sections/LibrarySection')
)
const LibraryUpcomingEvents = React.lazy(() =>
    import(
        /* webpackChunkName: "app-common" */ '../Library/sections/LibraryUpcomingEvents'
    )
)

const Home = () => {
    return (
        <Fragment>
            <MetaInformation
                title="Home"
                description="Welcome Covid-19 Contract Explorer"
            />

            <HomeBanner />

            <MainVisualization />

            <NewsSection />

            <LibraryUpcomingEvents />

            <LibrarySection />
        </Fragment>
    )
}

export default Home
