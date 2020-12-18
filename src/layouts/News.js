import newsImage from '../assets/img/news.jpg'
import React, { useEffect, useState } from 'react'
import { useHistory, Link, useParams } from 'react-router-dom'
import { get } from 'lodash'
import { API_URL } from '../helpers'
import InsightServices from '../services/insightServices'
import Loader from '../components/loader/Loader'

const News = () => {
    const [newsDetail, setNewsDetail] = useState({})
    const [newsData, setNewsData] = useState([])
    const [loading, setLoading] = useState(true)
    let history = useHistory()
    let { id: newsId } = useParams()
    window.scrollTo(0, 0)

    const previousPage = () => {
        history.goBack()
    }

    useEffect(() => {
        // InsightServices.NewsDetailData(newsId).then((response) => {
        //     // console.log(response)
        //     setNewsDetail(response)
        // })
        InsightServices.NewsData().then((response) => {
            setNewsData(response.items)
            setLoading(false)
        })
    }, [])

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div>
                    <section className=" news__list pt-24 px-4">
                        <div className="container mx-auto">
                            <p className="text-2xl mb-10">News</p>
                            <p className="text-xl mb-6 ">Featured News</p>
                            <div className="grid grid-cols-12 gap-x-10">
                                <div className="display__item col-span-8">
                                    {newsData && (
                                        <Link
                                            className="news-thumbnail"
                                            to={`/news-detail/${newsData[0].id}`}
                                            key={newsData[0].id}>
                                            <div className="news__item h-full">
                                                <div className="img-wrapper h-full relative">
                                                    <img
                                                        className="w-full h-full object-cover"
                                                        src={`${API_URL}${newsData[0].content_image.meta.download_url}`}
                                                        alt=""
                                                    />
                                                    <div className="news__caption px-6 py-6 text-white">
                                                        <h3 className="news-caption__title">
                                                            {newsData[0].title}
                                                        </h3>
                                                        <p className="news-caption__date mt-2">
                                                            {
                                                                newsData[0]
                                                                    .published_date
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    )}
                                </div>
                                <div className="list__item col-span-4">
                                    {newsData &&
                                        newsData.slice(1, 3).map((news) => {
                                            return (
                                                <Link
                                                    className="news-thumbnail"
                                                    to={`/news-detail/${news.id}`}
                                                    key={news.id}>
                                                    <div className="news__item">
                                                        <div className="img-wrapper w-full h-auto">
                                                            <img
                                                                className="w-full"
                                                                src={`${API_URL}${get(
                                                                    news,
                                                                    'content_image.meta.download_url'
                                                                )}`}
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="news__caption pt-6">
                                                            <h3 className="news-caption__title">
                                                                {news.title}
                                                            </h3>
                                                            <p className="news-caption__date mt-2">
                                                                {
                                                                    news.published_date
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            )
                                        })}
                                    {/* <div className="news__item">
                                    <div className="img-wrapper w-full h-auto">
                                        <img src={newsImage} alt="" />
                                    </div>
                                    <div className="news__caption pt-6">
                                        <h3 className="news-caption__title">
                                            How COVID-19 has advanced the case for
                                            procurement reform
                                        </h3>
                                        <p className="news-caption__date mt-2">Nov 19, 2020</p>
                                    </div>
                                </div> */}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="px-4 py-24">
                        <div className="container mx-auto">
                            <div className="text-left">
                                <p className="text-xl blue-50 pb-10">
                                    Other News
                                </p>
                            </div>
                            <div className="grid grid-cols-12 gap-10 mb-10 ">
                                {newsData &&
                                    newsData.slice(3).map((news) => {
                                        return (
                                            <Link
                                                className="news-thumbnail"
                                                to={`/news-detail/${news.id}`}
                                                key={news.id}>
                                                <div className="img-wrapper">
                                                    <img
                                                        className="h-full object-cover"
                                                        src={`${API_URL}${get(
                                                            news,
                                                            'content_image.meta.download_url'
                                                        )}`}
                                                        alt=""
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="news-caption__title">
                                                        {news.title}
                                                    </h3>
                                                    <p className="news-caption__date">
                                                        {news.published_date}
                                                    </p>
                                                </div>
                                            </Link>
                                        )
                                    })}
                            </div>
                            <div className="flex justify-center pt-10">
                                <Link
                                    to="/news"
                                    className="text-white bg-primary-blue px-32 py-4 rounded">
                                    Load More
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </>
    )
}
export default News
