import React, { useEffect, useState } from 'react'
import { useHistory, Link, useParams } from 'react-router-dom'
import { get } from 'lodash'
import * as dayjs from 'dayjs'
import { API_URL } from '../helpers'
import socialIcons from '../assets/img/icons/social'
import InsightServices from '../services/insightServices'
import Loader from '../components/Loader/Loader'
import {formatDate} from "../helpers/date";

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

    const handleClick = () => {
        history.push("/tags");
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
                            <Link to="/library"
                                className="cursor-pointer text-primary-blue">
                                Library
                            </Link>{' '}
                            /
                            <Link to="/events"
                                className="cursor-pointer text-primary-blue"
                                onClick={previousPage}>
                                Events
                            </Link>{' '}
                        </div>
                        <h2 className="md:w-3/4 text-lg md:text-xl leading-tight mb-6 md:mb-10 uppercase text-primary-dark">
                            {eventsDetail.title}
                        </h2>
                        {/* {get(
                            eventsDetail,
                            'event_image.meta.download_url'
                        ) &&
                            <div className="img-wrapper mb-6 md:mb-10">
                                <img
                                    src={`${API_URL}${get(
                                        eventsDetail,
                                        'event_image.meta.download_url'
                                    )}`}
                                    alt={get(eventsDetail, 'event_image.title')}
                                />
                            </div>
                        } */}
                        <div className="flex flex-wrap lg:flex-no-wrap justify-between mb-10">
                            <div className="mb-4 events-detail__metadata">
                                <div className="time mb-8">
                                    <div className="card__day text-4xl mb-2 leading-normal">
                                        {formatDate(eventsDetail.event_date, 'DD')}
                                    </div>
                                    <div className="card__month text-base uppercase">
                                        {formatDate(eventsDetail.event_date, 'MMMM')}
                                    </div>
                                    <p className="from mr-1 inline-block">
                                        {eventsDetail.time_from}
                                    </p>
                                    {eventsDetail.time_to &&
                                        <>
                                            /
                                            <p className="to ml-1 inline-block">
                                                {eventsDetail.time_to}
                                            </p>
                                        </>
                                    }
                                </div>
                                <div className="organization mb-8">
                                    <p className="block font-bold opacity-40 mb-2">
                                        Organization
                                    </p>
                                    <p className="block ml-3 lg:ml-0">
                                        {eventsDetail.organization}
                                    </p>
                                </div>
                                <div className="location mb-8">
                                    <p className="block font-bold opacity-40 mb-2">
                                        Location
                                    </p>
                                    <p className="block ml-3 lg:ml-0">
                                        {eventsDetail.location}
                                    </p>
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
                        {eventsData.length !== 1 ?
                        <>
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
                                            .map((events) => {
                                                return (
                                                    <>
                                                        <Link
                                                            className="events-thumbnail bg-blue-0 "
                                                            to={`/events-detail/${events.id}`}
                                                            key={events.id}>
                                                                    <div className="card__item h-full px-8 py-8">
                                                                            <div className="card__day text-4xl leading-none">
                                                                                {formatDate(events.event_date, 'DD')}
                                                                            </div>
                                                                            <div className="card__month text-base uppercase">
                                                                                {formatDate(events.event_date, 'MMMM')}
                                                                            </div>
                                                                            <div className="card__caption">
                                                                                <h3 className="card__title mt-8 mb-4 text-lg">
                                                                                    {events.title}
                                                                                </h3>
                                                                                <div className="card__time opacity-50 text-base mb-4 uppercase flex">
                                                                                    <p className="from mr-1">
                                                                                        {events.time_from}
                                                                                    </p>

                                                                                    {events.time_to &&
                                                                                        <>
                                                                                            -
                                                                                            <p className="to ml-1">
                                                                                                {events.time_to}
                                                                                            </p>
                                                                                        </>
                                                                                    }
                                                                                </div>

                                                                                <p className="card__venue text-base">
                                                                                    {events.location}
                                                                                </p>
                                                                            </div>
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
                        </>: ""
                        }

                    </div>
                </section>
            )}
        </>
    )
}

export default EventsDetail
