import React, { useEffect, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { get } from 'lodash'
import CmsPageService from '../../../services/CmsPageService'
import Loader from '../../../components/Loader/Loader'
import { formatDate } from '../../../helpers/date'
import { API_URL } from '../../../helpers/api'
import useTrans from '../../../hooks/useTrans'

const Library = () => {
    const [newsList, setNewsData] = useState([])
    const [blogList, setBlogsData] = useState([])
    const [eventList, setEventsData] = useState([])
    const [resourceList, setResourcesData] = useState([])
    const [loading, setLoading] = useState(true)
    const { trans } = useTrans()

    useEffect(() => {
        CmsPageService.NewsList().then((response) => {
            setNewsData(response.items)
            setLoading(false)
        })
        CmsPageService.BlogList().then((response) => {
            setBlogsData(response.items)
        })
        CmsPageService.EventList().then((response) => {
            setEventsData(response.items)
        })
        CmsPageService.ResourceList().then((response) => {
            setResourcesData(response.items)
        })
    }, [])

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <div className="library">
                    <section className="news px-4 py-24 bg-blue-0 -mt-8">
                        <div className="container mx-auto">
                            <p className="text-2xl mb-10">Library</p>
                            <div className="grid md:grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10">
                                <div className="display__item flex flex-col">
                                    <p className="text-xl mb-6 ">News</p>

                                    <div className="news__item flex-1">
                                        {newsList && (
                                            <>
                                                <Link
                                                    className="news-thumbnail"
                                                    to={`/news/${newsList[0].id}`}>
                                                    <div className="img-wrapper relative">
                                                        {newsList[0]
                                                            .content_image.meta
                                                            .download_url && (
                                                            <img
                                                                className="w-full h-full object-cover"
                                                                src={`${API_URL}${newsList[0].content_image.meta.download_url}`}
                                                                alt=""
                                                            />
                                                        )}
                                                        <div className="news__caption px-6 py-6 text-white">
                                                            <h3 className="news-caption__title">
                                                                {
                                                                    newsList[0]
                                                                        .title
                                                                }
                                                            </h3>
                                                            <p className="news-caption__date mt-2">
                                                                {formatDate(
                                                                    newsList[0]
                                                                        .published_date,
                                                                    'MMM DD, YYYY'
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="list__item">
                                    <p className="text-lg mb-6 mt-4 uppercase">
                                        Recent Posts
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
                                                        ) && (
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
                                                        )}
                                                        <div className="news__caption pl-6">
                                                            <h3 className="news-caption__title">
                                                                {news.title}
                                                            </h3>
                                                            <p className="news-caption__date mt-2">
                                                                {formatDate(
                                                                    news.published_date,
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
                                        View all news --&gt;{' '}
                                    </Link>
                                </div>
                            ) : (
                                <p> There are no News Records</p>
                            )}
                        </div>
                    </section>

                    <section className="px-4 py-24 blog">
                        <div className="container mx-auto">
                            <div className="text-center">
                                <p className="text-xl blue-50 pb-10">Blogs</p>
                            </div>
                            <div className="grid grid-cols-12 gap-x-0 gap-y-10 sm:gap-10 ">
                                {blogList &&
                                    blogList.slice(0, 6).map((blog) => {
                                        return (
                                            <div
                                                className="blogs-thumbnail"
                                                to={`/blogs/${blog.id}`}
                                                key={blog.id}>
                                                {get(
                                                    blog,
                                                    'content_image.meta.download_url'
                                                ) && (
                                                    <Link
                                                        to={`/blogs/${blog.id}`}>
                                                        <div className="img-wrapper">
                                                            <img
                                                                className="h-full object-cover"
                                                                src={`${API_URL}${get(
                                                                    blog,
                                                                    'content_image.meta.download_url'
                                                                )}`}
                                                                alt=""
                                                            />
                                                        </div>
                                                    </Link>
                                                )}
                                                <div>
                                                    <Link
                                                        to={`/blogs/${blog.id}`}>
                                                        <h3 className="blogs-caption__title">
                                                            {blog.title}
                                                        </h3>
                                                    </Link>
                                                    <p className="blogs-caption__date">
                                                        {formatDate(
                                                            blog.published_date,
                                                            'MMM DD, YYYY'
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>
                            {blogList.length !== 0 ? (
                                <div className="flex justify-center pt-10">
                                    <Link to="/blogs" className="text-blue-20">
                                        View all blogs --&gt;{' '}
                                    </Link>
                                </div>
                            ) : (
                                <p> There are no Blogs Records</p>
                            )}
                        </div>
                    </section>
                    <section className="px-4 events bg-primary-gray py-24">
                        <div className="container mx-auto">
                            <div className="text-center">
                                <p className="text-xl blue-50 pb-10">
                                    Upcoming Events
                                </p>
                            </div>
                            <div className="grid grid-cols-12 gap-x-0 gap-y-4 sm:gap-4  card">
                                {eventList &&
                                    eventList.slice(0, 3).map((event) => {
                                        return (
                                            <Link
                                                className="events-thumbnail"
                                                to={`/events/${event.id}`}
                                                key={event.id}>
                                                <div className="card__item h-full px-8 py-8">
                                                    <div className="card__day text-4xl leading-none">
                                                        {formatDate(
                                                            event.event_date,
                                                            'DD'
                                                        )}
                                                    </div>
                                                    <div className="card__month text-base uppercase">
                                                        {formatDate(
                                                            event.event_date,
                                                            'MMMM'
                                                        )}
                                                    </div>
                                                    <div className="card__caption">
                                                        <h3 className="card__title mt-8 mb-4 text-lg">
                                                            {event.title}
                                                        </h3>
                                                        <div className="card__time opacity-50 text-base mb-4 uppercase flex">
                                                            <p className="from mr-1">
                                                                {
                                                                    event.time_from
                                                                }
                                                            </p>
                                                            {event.time_to && (
                                                                <>
                                                                    -
                                                                    <p className="to ml-1">
                                                                        {
                                                                            event.time_to
                                                                        }
                                                                    </p>
                                                                </>
                                                            )}
                                                        </div>

                                                        <p className="card__venue text-base">
                                                            {event.location}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    })}
                            </div>
                            {eventList.length !== 0 ? (
                                <div className="flex justify-center pt-10">
                                    <Link to="/events" className="text-blue-20">
                                        View all events --&gt;{' '}
                                    </Link>
                                </div>
                            ) : (
                                <p> There are no Events Records</p>
                            )}
                        </div>
                    </section>
                    <section className="px-4 resources py-24">
                        <div className="container mx-auto">
                            <div className="text-center">
                                <p className="text-xl blue-50 pb-10">
                                    Resources
                                </p>
                            </div>
                            <div className="grid grid-cols-4 gap-x-6 gap-y-6 card">
                                {resourceList &&
                                    resourceList.slice(0, 8).map((resource) => {
                                        return (
                                            <div
                                                className="card__item rounded px-6 py-6"
                                                key={resource.id}>
                                                <div className="card__caption">
                                                    <Link
                                                        to={`/resources/${resource.id}`}>
                                                        <h3 className="card__title mb-4 text-lg">
                                                            {resource.title}
                                                        </h3>
                                                    </Link>
                                                    {get(
                                                        resource,
                                                        'document.meta.download_url'
                                                    ) ? (
                                                        <a
                                                            href={get(
                                                                resource,
                                                                'document.meta.download_url'
                                                            )}>
                                                            <div className="download flex">
                                                                <svg
                                                                    width="24"
                                                                    height="16"
                                                                    viewBox="0 0 24 16"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        d="M19.35 6.04C19.0141 4.33772 18.0976 2.80486 16.7571 1.70325C15.4165 0.601633 13.7351 -0.000392242 12 1.91737e-07C9.11 1.91737e-07 6.6 1.64 5.35 4.04C3.88023 4.19883 2.52101 4.89521 1.53349 5.99532C0.545971 7.09543 -0.000171702 8.52168 4.04928e-08 10C4.04928e-08 13.31 2.69 16 6 16H19C21.76 16 24 13.76 24 11C24 8.36 21.95 6.22 19.35 6.04ZM19 14H6C3.79 14 2 12.21 2 10C2 7.95 3.53 6.24 5.56 6.03L6.63 5.92L7.13 4.97C7.58988 4.07478 8.28787 3.32382 9.14712 2.79979C10.0064 2.27577 10.9936 1.99902 12 2C14.62 2 16.88 3.86 17.39 6.43L17.69 7.93L19.22 8.04C19.9717 8.09056 20.6764 8.42399 21.1922 8.97319C21.708 9.52238 21.9966 10.2466 22 11C22 12.65 20.65 14 19 14ZM13.45 6H10.55V9H8L12 13L16 9H13.45V6Z"
                                                                        fill="#1FBBEC"
                                                                    />
                                                                </svg>
                                                                <span className="text-blue-20 test-sm ml-2">
                                                                    {trans(
                                                                        'Download'
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </a>
                                                    ) : (
                                                        ''
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>
                            {resourceList.length !== 0 ? (
                                <div className="flex justify-center pt-10">
                                    <Link
                                        to="/resources"
                                        className="text-blue-20">
                                        View all resources --&gt;{' '}
                                    </Link>
                                </div>
                            ) : (
                                <p> There are no Resources Records</p>
                            )}
                        </div>
                    </section>
                </div>
            )}
        </Fragment>
    )
}

export default Library
