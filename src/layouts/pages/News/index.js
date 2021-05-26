import React, { useState, useEffect } from 'react'
import { t } from '@transifex/native'
import { T, useLocale } from '@transifex/react'
import { MetaInformation, Breadcrumb } from '../../../components/Utilities'
import OtherNewsList from './sections/OtherNewsList'
import FeaturedNewsList from './sections/FeaturedNewsList'

const News = () => {
    const [metaInfo, setMetaInfo] = useState({ title: '', description: '' })
    const locale = useLocale()

    useEffect(() => {
        setMetaInfo({
            title: t('News'),
            description: t('Welcome Covid-19 Contract Explorer')
        })
    }, [locale])
    window.scrollTo(0, 0)

    return (
        <div>
            <MetaInformation
                title={metaInfo.title}
                description={metaInfo.description}
            />
            <section className=" news__list pt-24 px-4">
                <div className="container mx-auto">
                    <Breadcrumb />
                    <p className="text-2xl mb-10">
                        <T _str="News" />
                    </p>
                </div>
            </section>

            <FeaturedNewsList />

            <OtherNewsList />
        </div>
    )
}
export default News
