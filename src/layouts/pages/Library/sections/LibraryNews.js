import React, { useEffect, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { get } from 'lodash'
import { T } from '@transifex/react'
import CmsPageService from '../../../../services/CmsPageService'
import { Loader } from '../../../../components/Utilities'
import { formatDate } from '../../../../helpers/date'
import { API_URL } from '../../../../helpers/api'
import DefaultImage from '../../../../assets/img/default_image.png'

const LibraryNews = () => {
    const [newsList, setNewsList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        CmsPageService.NewsList().then((response) => {
            setNewsList(response.items)
            setLoading(false)
        })

        return () => {
            setNewsList([])
        }
    }, [])

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
                        <div className="display__item flex flex-col">
                            <div className="news__item flex-1">
                                <p className="text-xl mb-6 ">
                                    <T _str="News" />
                                </p>
                                {newsList.length && (
                                    <Link
                                        className="news-thumbnail"
                                        to={`/news/${newsList[0].id}`}>
                                        <div className="img-wrapper relative">
                                            {get(
                                                newsList[0],
                                                'content_image.meta.download_url'
                                            ) ? (
                                                <img
                                                    className="w-full h-full object-cover"
                                                    src={`${API_URL}${newsList[0].content_image.meta.download_url}`}
                                                    alt=""
                                                />
                                            ) : (
                                                <img
                                                    className="w-full h-full object-cover"
                                                    src={DefaultImage}
                                                    alt="No image"
                                                />
                                            )}
                                            <div className="news__caption px-6 py-6 text-white">
                                                <h3 className="hover:text-primary-blue focus:text-primary-blue news-caption__title">
                                                    {newsList[0].title}
                                                </h3>
                                                <p className="news-caption__date mt-2">
                                                    {formatDate(
                                                        newsList[0].news_date,
                                                        'MMM DD, YYYY'
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                )}
                            </div>
                        </div>
                        <div className="list__item">
                            <p className="text-lg mb-6 mt-4 uppercase">
                                <T _str="Recent Posts" />
                            </p>
                            {newsList &&
                                newsList.slice(1, 4).map((news) => {
                                    return (
                                        <Link
                                            className="news-thumbnail"
                                            to={`/news/${news.id}`}
                                            key={news.id}>
                                            <div className="news__item flex">
                                                {get(
                                                    news,
                                                    'content_image.meta.download_url'
                                                ) != null ? (
                                                    <div className="img-wrapper">
                                                        <img
                                                            className="w-full h-full object-cover"
                                                            src={`${API_URL}${get(
                                                                news,
                                                                'content_image.meta.download_url'
                                                            )}`}
                                                            alt=""
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="img-wrapper">
                                                        <img
                                                            className="w-full h-full object-cover"
                                                            src={DefaultImage}
                                                            alt="No image"
                                                        />
                                                    </div>
                                                )}
                                                <div className="news__caption pl-6">
                                                    <h3 className="hover:text-primary-blue focus:text-primary-blue news-caption__title">
                                                        {news.title}
                                                    </h3>
                                                    <p className="news-caption__date mt-2">
                                                        {formatDate(
                                                            news.news_date,
                                                            'MMM DD, YYYY'
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })}
                        </div>
                    </div>
                    {newsList.length !== 0 ? (
                        <div className="flex justify-end pt-10">
                            <Link to="/news" className="text-blue-20">
                                <T _str="View all news" /> --&gt;{' '}
                            </Link>
                        </div>
                    ) : (
                        <p>
                            <T _str="There are no news" />
                        </p>
                    )}
                </Fragment>
            )}
        </Fragment>
    )
}
export default LibraryNews
