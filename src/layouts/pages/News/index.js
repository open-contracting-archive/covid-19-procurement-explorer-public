import React, { useEffect, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { get } from 'lodash'
import CmsPageService from '../../../services/CmsPageService'
import Loader from '../../../components/Loader/Loader'
import { formatDate } from '../../../helpers/date'
import { API_URL } from '../../../helpers/api'
import Breadcrumb from '../../../components/website/Library/Breadcrumb'

const News = () => {
    const [newsData, setNewsData] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState([])
    window.scrollTo(0, 0)

    // const handleSearch = e => {
    // 	const post = newsData.filter(news =>
    //         {
    //             return(
    //                 news.title.toLowerCase().includes(e.target.value.toLowerCase())
    //             );
    //         }
    // 	);
    //     setNewsData(post);
    // };

    useEffect(() => {
        CmsPageService.NewsList()
            .then((response) => {
                setNewsData(response.items)
                setLoading(false)
            })
    }, [])

    return (
        <div>
            <section className=" news__list pt-24 px-4">
                <div className="container mx-auto">
                    <Breadcrumb />

                    <p className="text-2xl mb-10">News</p>
                    {loading ? (<Loader />) : (
                        <Fragment>
                            <p className="text-xl mb-6">Featured News</p>
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 ">
                                <div className="display__item md:col-span-8">
                                    {newsData && (
                                        <Link
                                            className="news-thumbnail"
                                            to={`/news/${newsData[0].id}`}
                                            key={newsData[0].id}>
                                            <div className="news__item h-full">
                                                <div className="img-wrapper h-full relative">
                                                    {get(newsData[0], 'content_image.meta.download_url') && (
                                                        <img
                                                            className="w-full h-full object-cover"
                                                            src={`${API_URL}${newsData[0].content_image.meta.download_url}`}
                                                            alt=""
                                                        />
                                                    )}
                                                    <div className="news__caption px-6 py-6 text-white">
                                                        <h3 className="news-caption__title">
                                                            {newsData[0].title}
                                                        </h3>
                                                        <p className="news-caption__date mt-2">
                                                            {formatDate(
                                                                newsData[0]
                                                                    .published_date
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    )}
                                </div>
                                <div className="list__item md:col-span-4">
                                    {newsData &&
                                    newsData.slice(1, 3).map((news) => {
                                        return (
                                            <Link
                                                className="news-thumbnail"
                                                to={`/news/${news.id}`}
                                                key={news.id}>
                                                <div className="news__item">
                                                    {get(news, 'content_image.meta.download_url') && (
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
                                                    )}
                                                    <div className="news__caption pt-6">
                                                        <h3 className="news-caption__title">
                                                            {news.title}
                                                        </h3>
                                                        <p className="news-caption__date mt-2">
                                                            {formatDate(
                                                                news.published_date,
                                                                'MMMM DD, YYYY'
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        </Fragment>
                    )}
                </div>
            </section>

            <section className="px-4 py-24">
                <div className="container mx-auto">
                    <div className="flex md: flex-nowrap flex-wrap justify-between pb-10">
                        <p className="text-xl blue-50">Other News</p>
                        <form className="mt-4 md:mt-0 flex justify-between items-center form-search px-5 py-4 rounded bg-gray">
                            <input
                                type="search"
                                className="bg-gray text-base text-primary-dark opacity-50"
                                placeholder="Search"
                            />
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15.7832 14.3911L20 18.6069L18.6069 20L14.3911 15.7832C12.8224 17.0407 10.8713 17.7246 8.86088 17.7218C3.96968 17.7218 0 13.7521 0 8.86088C0 3.96968 3.96968 0 8.86088 0C13.7521 0 17.7218 3.96968 17.7218 8.86088C17.7246 10.8713 17.0407 12.8224 15.7832 14.3911ZM13.8082 13.6605C15.0577 12.3756 15.7555 10.6532 15.7527 8.86088C15.7527 5.05267 12.6681 1.96909 8.86088 1.96909C5.05267 1.96909 1.96909 5.05267 1.96909 8.86088C1.96909 12.6681 5.05267 15.7527 8.86088 15.7527C10.6532 15.7555 12.3756 15.0577 13.6605 13.8082L13.8082 13.6605Z"
                                    fill="#1FBBEC"
                                />
                            </svg>
                        </form>
                    </div>
                    {loading ? (<Loader />) : (
                        <Fragment>
                            <div className="grid grid-cols-12 gap-x-0 gap-y-10 sm:gap-10  mb-10 ">
                                {newsData &&
                                newsData.slice(3).map((news) => {
                                    return (
                                        <Link
                                            className="news-thumbnail"
                                            to={`/news/${news.id}`}
                                            key={news.id}>
                                            {get(
                                                news,
                                                'content_image.meta.download_url'
                                            ) && (
                                                <div className="img-wrapper">
                                                    <img
                                                        className="h-full w-full object-cover"
                                                        src={`${API_URL}${get(
                                                            news,
                                                            'content_image.meta.download_url'
                                                        )}`}
                                                        alt=""
                                                    />
                                                </div>
                                            )}

                                            <div>
                                                <h3 className="news-caption__title">
                                                    {news.title}
                                                </h3>
                                                <p className="news-caption__date">
                                                    {formatDate(
                                                        news.published_date,
                                                        'MMMM DD, YYYY'
                                                    )}
                                                </p>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                            {/* {newsData.length !== 0 ? (
                        <div className="flex justify-center pt-10">
                            <Link
                                to="/news"
                                className="text-white bg-primary-blue px-32 py-4 rounded">
                                Load more
                            </Link>
                        </div>
                    ) : (
                        <p> There are no News Records</p>
                    )} */}
                        </Fragment>
                    )}
                </div>
            </section>
        </div>
    )
}
export default News
