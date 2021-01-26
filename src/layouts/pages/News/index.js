import React from 'react'
import Breadcrumb from '../../../components/website/Library/Breadcrumb'
import FeaturedNewsList from "./sections/FeaturedNewsList"
import OtherNewsList from "./sections/OtherNewsList"
import useTrans from "../../../hooks/useTrans"

const News = () => {
    const { trans } = useTrans()
    window.scrollTo(0, 0)

    return (
        <div>
            <section className=" news__list pt-24 px-4">
                <div className="container mx-auto">
                    <Breadcrumb />
                    <p className="text-2xl mb-10">{trans('News')}</p>
                </div>
            </section>

            <FeaturedNewsList />

            <OtherNewsList />
        </div>
    )
}
export default News
