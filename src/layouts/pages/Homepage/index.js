import React, { useState, useEffect, Fragment } from 'react'
import { t } from '@transifex/native'
import { useLocale } from '@transifex/react'
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
    const [metaInfo, setMetaInfo] = useState({ title: '', description: '' })
    const locale = useLocale()

    useEffect(() => {
        setMetaInfo({
            title: t('Home'),
            description: t('Welcome Covid-19 Contract Explorer')
        })
    }, [locale])
    return (
        <Fragment>
            <MetaInformation
                title={metaInfo.title}
                description={metaInfo.description}
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
