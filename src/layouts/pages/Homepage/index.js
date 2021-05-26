import React, { useState, useEffect, Fragment } from 'react'
import { t } from '@transifex/native'
import { useLocale } from '@transifex/react'
import { MetaInformation } from '../../../components/Utilities'
import HomeBanner from './sections/HomeBanner'
import MainVisualization from './sections/MainVisualization'
import NewsSection from './sections/NewsSection'
import LibrarySection from './sections/LibrarySection'
import LibraryUpcomingEvents from './../Library/sections/LibraryUpcomingEvents'

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
