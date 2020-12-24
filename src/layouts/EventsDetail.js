import React, { useEffect, useState } from 'react'
import { useHistory, Link, useParams } from 'react-router-dom'
import { get } from 'lodash'
import * as dayjs from 'dayjs'
import { API_URL } from '../helpers'
import socialIcons from '../assets/img/icons/social'
import InsightServices from '../services/insightServices'
import Loader from '../components/loader/Loader'

const EventsDetail = () => {
    const [eventsDetail, setEventsDetail] = useState({})
    const [eventsData, setEventsData] = useState([])
    const [loading, setLoading] = useState(true)
    let history = useHistory()
    let { id: eventsId } = useParams()
    window.scrollTo(0, 0)

    const previousPage = () => {
        history.goBack()
    }

    useEffect(() => {
        InsightServices.EventsDetailData(eventsId).then((response) => {
            // console.log(response)
            setEventsDetail(response)
            setLoading(false)
        })
        InsightServices.EventsData().then((response) => {
            setEventsData(response.items)
        })
    }, [eventsId])

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <section className="pt-8">
                    <div className="container mx-auto px-4 news-detail">
                        <div className="text-sm mb-4 text-blue-5">
                            <span
                                className="cursor-pointer text-primary-blue"
                                onClick={previousPage}>
                                Events
                            </span>{' '}
                            /
                        </div>
                        <h2 className="md:w-3/4 text-lg md:text-xl leading-tight mb-6 md:mb-10 uppercase text-primary-dark">
                            {eventsDetail.title}
                        </h2>
                        <div className="img-wrapper mb-6 md:mb-10">
                            <img
                                src={`${API_URL}${get(
                                    eventsDetail,
                                    'event_image.meta.download_url'
                                )}`}
                                alt={get(eventsDetail, 'event_image.title')}
                            />
                        </div>
                        <div className="flex flex-wrap lg:flex-no-wrap justify-between mb-10">
                            <div className="mb-4 events-detail__metadata">
                                <p className="inline-block lg:block font-bold opacity-40 mb-2">
                                    Published on
                                </p>
                                <p className="inline-block lg:block ml-3 lg:ml-0">
                                    {dayjs(
                                        eventsDetail.meta.first_published_at
                                    ).format('MMMM DD, YYYY')}
                                </p>
                                <div className="mt-8 hidden lg:block">
                                    <p className="inline-block lg:block font-bold opacity-40 mb-2">
                                        Tags
                                    </p>
                                    <div className="tags flex flex-wrap">
                                        <div className="tag">
                                            <p>Covid-19</p>
                                        </div>
                                        <div className="tag">
                                            <p>Corona</p>
                                        </div>
                                        <div className="tag">
                                            <p>Virus</p>
                                        </div>
                                        <div className="tag">
                                            <p>News</p>
                                        </div>
                                        <div className="tag">
                                            <p>Article</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div
                                    className="mb-10 news-detail__content"
                                    dangerouslySetInnerHTML={{
                                        __html: eventsDetail.description
                                    }}>
                                    {/* {eventsDetail.body} */}
                                </div>
                                <div className="flex flex-col md:flex-row justify-between mb-6 lg:mb-0">
                                    <div className="block lg:hidden mb-6 md:mb-0">
                                        <p className="inline-block lg:block font-bold opacity-40 mb-2">
                                            Tags
                                        </p>
                                        <div className="tags flex flex-wrap">
                                            <div className="tag">
                                                <p>Covid-19</p>
                                            </div>
                                            <div className="tag">
                                                <p>Corona</p>
                                            </div>
                                            <div className="tag">
                                                <p>Virus</p>
                                            </div>
                                            <div className="tag">
                                                <p>News</p>
                                            </div>
                                            <div className="tag">
                                                <p>Article</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <p className="font-bold opacity-40 mr-4">
                                            Share on
                                        </p>
                                        <div className="flex">
                                            <a href="" className="social-icon">
                                                <socialIcons.fbIcon />
                                            </a>
                                            <a href="" className="social-icon">
                                                <socialIcons.twitterIcon />
                                            </a>
                                            <a href="" className="social-icon">
                                                <socialIcons.linkedIcon />
                                            </a>
                                            <a href="" className="social-icon">
                                                <socialIcons.mailIcon />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden lg:block">
                                <p className="font-bold opacity-40 mb-2">
                                    Share on
                                </p>
                                <div className="flex">
                                    <a href="" className="social-icon">
                                        <socialIcons.fbIcon />
                                    </a>
                                    <a href="" className="social-icon">
                                        <socialIcons.twitterIcon />
                                    </a>
                                    <a href="" className="social-icon">
                                        <socialIcons.linkedIcon />
                                    </a>
                                    <a href="" className="social-icon">
                                        <socialIcons.mailIcon />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <hr className="mb-10 text-primary-gray" />
                        <div className="mb-20">
                            <h2 className="text-xl mb-6">Other Events</h2>
                            <div className="grid grid-cols-12 gap-x-0 gap-y-4 sm:gap-4 mb-10">
                                {eventsData &&
                                    eventsData
                                        .filter(
                                            (events) => events.id != eventsId
                                        )
                                        .slice(0, 3)
                                        .map((news) => {
                                            return (
                                                <>
                                                    <Link
                                                        className="events-thumbnail"
                                                        to={`/events-detail/${news.id}`}
                                                        key={news.id}>
                                                        <div className="img-wrapper">
                                                            <img
                                                                src={`${API_URL}${get(
                                                                    events,
                                                                    'content_image.meta.download_url'
                                                                )}`}
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div>
                                                            <h3 className="events-caption__title">
                                                                {events.title}
                                                            </h3>
                                                            <p className="events-caption__date">
                                                                {
                                                                    events.published_date
                                                                }
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </>
                                            )
                                        })}
                            </div>
                            <div className="flex justify-center items-center mt-12">
                                <hr className="text-primary-gray flex-1"/>
                                <Link to="/events" className="text-blue-20 px-4">
                                    View all events --&gt;{' '}
                                </Link>
                                <hr className="text-primary-gray flex-1"/>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}

export default EventsDetail
