import React, { useEffect, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { get } from 'lodash'
import { API_URL } from '../../../../helpers/api'
import CmsPageService from '../../../../services/CmsPageService'
import { Loader } from '../../../../components/Utilities'
import { formatDate } from '../../../../helpers/date'
import { t } from '@transifex/native'

const NewsSection = () => {
    const [newsList, setNewsList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        CmsPageService.NewsList({ limit: 5 })
            .then((response) => {
                setNewsList(response.items)
                setLoading(false)
            })
            .catch(() => setLoading(false))

        return () => {
            setNewsList([])
        }
    }, [])

    return (
        <section className="py-8 md:py-24 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-6 md:mb-10">
                    <h3 className="uppercase text-2xl md:text-3xl font-bold leading-none">
                        <span className="block text-base font-bold">
                            {t('Explore')}
                        </span>
                        {t('News')}
                    </h3>
                    <p className="text-xs md:text-base text-opacity-50 text-primary-dark">
                        {t('Updates from all around the world on Covid-19')}
                    </p>
                </div>
                {loading ? (
                    <Loader sm />
                ) : newsList.length ? (
                    <Fragment>
                        <div className="grid grid-cols-12 grid-rows-2 gap-2 md:gap-5 news-wrapper">
                            {newsList.map((news, index) => {
                                return (
                                    <div key={news.id} className="news-item">
                                        <Link
                                            to={`/news/${news.id}`}
                                            className="news-link">
                                            <div className="img-wrapper img-gradient">
                                                {get(
                                                    news,
                                                    'content_image.meta.download_url'
                                                ) && (
                                                    <img
                                                        src={`${API_URL}${get(
                                                            news,
                                                            'content_image.meta.download_url'
                                                        )}`}
                                                        className="news-img"
                                                        alt={get(
                                                            news,
                                                            'content_image.title'
                                                        )}
                                                    />
                                                )}
                                            </div>
                                            <div
                                                className={`news-caption ${
                                                    index === 0
                                                        ? 'news-caption--large'
                                                        : ''
                                                }`}>
                                                <h3 className="news-caption__title hover:text-primary-blue focus:text-primary-blue">
                                                    {news.title}
                                                </h3>
                                                <p className="news-caption__date">
                                                    {formatDate(
                                                        news.news_date,
                                                        'MMM DD, YYYY'
                                                    )}
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="text-right md:text-center mt-6 md:mt-12">
                            <Link to="/news" className="text-blue-20">
                                {t('View all news')} --&gt;{' '}
                            </Link>
                        </div>
                    </Fragment>
                ) : (
                    <p className="text-sm md:text-base text-primary-dark text-opacity-40 text-center py-16">
                        {t('No news available')}
                    </p>
                )}
            </div>
        </section>
    )
}
export default NewsSection
