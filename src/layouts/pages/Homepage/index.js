import React, { Fragment } from 'react'
import HomeBanner from "./sections/HomeBanner"
import MainVisualization from './sections/MainVisualization'
import NewsSection from './sections/NewsSection'
import LibrarySection from './sections/LibrarySection'
import LibraryUpcomingEvents from '../Library/sections/LibraryUpcomingEvents'

const Home = () => {
    return (
        <Fragment>
            <HomeBanner />

            <MainVisualization />

            <NewsSection />
            <LibraryUpcomingEvents />
            <LibrarySection />
        </Fragment>
    )
}

export default Home
