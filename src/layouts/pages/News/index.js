import React from 'react'
import { t } from '@transifex/native'
import { MetaInformation, Breadcrumb } from '../../../components/Utilities'

const OtherNewsList = React.lazy(() =>
    import(/* webpackChunkName: "app-common" */ './sections/OtherNewsList')
)
const FeaturedNewsList = React.lazy(() =>
    import(/* webpackChunkName: "app-common" */ './sections/FeaturedNewsList')
)

const News = () => {
    window.scrollTo(0, 0)

    return (
        <div>
            <MetaInformation
                title="News"
                description="Welcome Covid-19 Contract Explorer"
            />
            <section className=" news__list pt-24 px-4">
                <div className="container mx-auto">
                    <Breadcrumb />
                    <p className="text-2xl mb-10">{t('News')}</p>
                </div>
            </section>

            <FeaturedNewsList />

            <OtherNewsList />
        </div>
    )
}
export default News
