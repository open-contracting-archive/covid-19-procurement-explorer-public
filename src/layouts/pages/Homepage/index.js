import React, { Fragment } from 'react'
import HomeBanner from './sections/HomeBanner'
import MainVisualization from './sections/MainVisualization'
import NewsSection from './sections/NewsSection'
import LibrarySection from './sections/LibrarySection'
import LibraryUpcomingEvents from '../Library/sections/LibraryUpcomingEvents'
import MetaInformation from '../../../components/MetaInformation/MetaInformation'

const Home = () => {
    return (
        <Fragment>
            <MetaInformation
                title="Home"
                description="Welcome Covid-19 Contract Explorer" />

            <HomeBanner />

            <MainVisualization />

            <NewsSection />

            <LibraryUpcomingEvents />

            <LibrarySection />
        </Fragment>
    )
}

export default Home
