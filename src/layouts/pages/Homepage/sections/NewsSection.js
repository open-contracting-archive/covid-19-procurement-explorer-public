import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {get} from 'lodash'
import {API_URL} from '../../../../helpers/api'
import InsightServices from '../../../../services/insightServices'
import Loader from '../../../../components/Loader/Loader'
import {formatDate} from "../../../../helpers/date";

const NewsSection = () => {
    const [newsData, setNewsData] = useState([])
    const [noData, setNoData] = useState(true)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        InsightServices.NewsData()
            .then((response) => {
                // console.log(response)
                setNewsData(response.items)
                setLoading(false)
                setNoData(false)
            })
            .catch(() => setLoading(false))
    }, [])

    return (
        <section className="py-24 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-10">
                    <h3 className="uppercase text-3xl font-bold leading-none">
                        <span className="block text-base font-bold">
                            Explore
                        </span>
                        News
                    </h3>
                    <p className="text-base text-opacity-50  text-primary-dark">
                        Updates from all around the world on Covid-19
                    </p>
                </div>
                {loading ? (
                    <Loader/>
                ) : noData ? (
                    <p className="text-sm text-primary-dark text-opacity-40 text-center py-16">
                        No news available
                    </p>
                ) : (
                    <>
                        <div className="grid grid-cols-12 grid-rows-2 gap-5 news-wrapper">
                            {newsData &&
                            newsData.slice(0, 5).map((news, index) => {
                                return (
                                    <div
                                        className="news-item"
                                        key={news.id}>
                                        <Link
                                            to={`/news/${news.id}`}
                                            className="news-link">
                                            <div className="img-wrapper img-gradient">
                                                {get(
                                                    news,
                                                    'content_image.meta.download_url'
                                                ) &&

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
                                                }
                                            </div>

                                            <div
                                                className={`news-caption ${
                                                    index === 0
                                                        ? 'news-caption--large'
                                                        : ''
                                                }`}>
                                                <h3 className="news-caption__title">
                                                    {news.title}
                                                </h3>
                                                <p className="news-caption__date">
                                                    {formatDate(news.published_date, 'MMM DD, YYYY')}

                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="flex justify-center mt-12">
                            <Link to="/news" className="text-blue-20">
                                View all news --&gt;{' '}
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}
export default NewsSection
