import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CmsPageService from '../../../../services/CmsPageService'
import useTrans from '../../../../hooks/useTrans'
import Loader from '../../../../components/Loader/Loader'
import { transformNews } from '../../../../helpers/transformers'
import DefaultImage from '../../../../assets/img/default_image.png'

const FeaturedNewsList = () => {
    const otherFeaturedNewsLimit = 4
    const [newsList, setNewsList] = useState([])
    const [loading, setLoading] = useState(true)
    const { trans } = useTrans()
    const mainNews = newsList.length ? newsList[0] : {}
    const otherFeaturedNews = newsList.length
        ? newsList.slice(1, otherFeaturedNewsLimit)
        : []

    useEffect(() => {
        CmsPageService.NewsList({ featured: true })
            .then((response) => {
                setNewsList(response.items.map((item) => transformNews(item)))
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
            })

        return () => {
            setNewsList([])
        }
    }, [])

    return loading ? (
        <Loader />
    ) : (
        <section className=" news__list px-4">
            <div className="container mx-auto">
                <p className="text-xl mb-6">{trans('Featured News')}</p>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                    <div className="display__item md:col-span-8">
                        {mainNews && (
                            <Link
                                className="news-thumbnail"
                                to={mainNews.detailUrl}
                                key={mainNews.id}>
                                <div className="news__item h-full">
                                    <div className="img-wrapper h-full relative">
                                        {mainNews.image && (
                                            <img
                                                src={mainNews.image}
                                                className="w-full h-full object-cover"
                                                alt={mainNews.title}
                                            />
                                        )}
                                        <div className="news__caption px-6 py-6 text-white">
                                            <h3 className="news-caption__title hover:text-primary-blue focus:text-primary-blue">
                                                {mainNews.title}
                                            </h3>
                                            <p className="news-caption__date mt-2">
                                                {mainNews.formattedPublishDate}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )}
                    </div>
                    <div className="list__item md:col-span-4">
                        {otherFeaturedNews &&
                            otherFeaturedNews.map((news) => (
                                <Link
                                    className="news-thumbnail"
                                    to={news.detailUrl}
                                    key={news.id}>
                                    <div className="news__item flex flex-wrap">
                                        {news.image != null ? (
                                            <div className="img-wrapper w-full h-auto">
                                                <img
                                                    className="w-full h-full object-cover"
                                                    src={news.image}
                                                    alt={news.title}
                                                />
                                            </div>
                                        ) : (
                                            <div className="img-wrapper w-full h-auto">
                                                <img
                                                    className="w-full h-full object-cover"
                                                    src={DefaultImage}
                                                    alt="No image"
                                                />
                                            </div>
                                        )}
                                        <div className="news__caption mt-4">
                                            <h3 className="news-caption__title hover:text-primary-blue focus:text-primary-blue">
                                                {news.title}
                                            </h3>
                                            <p className="news-caption__date mt-2">
                                                {news.formattedPublishDate}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
export default FeaturedNewsList
