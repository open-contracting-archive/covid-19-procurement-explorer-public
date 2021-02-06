import React, { useEffect, useState } from 'react'
import { useHistory, Link, useParams } from 'react-router-dom'
import CmsPageService from '../../../services/CmsPageService'
import Loader from '../../../components/Loader/Loader'
import { formatDate, formatTime } from '../../../helpers/date'
import useTrans from '../../../hooks/useTrans'

function Events() {
    const [eventList, setEventList] = useState([])
    const [loading, setLoading] = useState(true)
    let history = useHistory()
    const { trans } = useTrans()
    window.scrollTo(0, 0)
    const previousPage = () => {
        history.goBack()
    }

    useEffect(() => {
        CmsPageService.EventList().then((response) => {
            setEventList(response.items)
            setLoading(false)
        })

        return () => {
            setEventList([])
        }
    }, [])

    return loading ? (<Loader />) : (
        <div className="">
            <section className="px-4 events events__upcoming pt-24 pb-16 -mt-8">
                <div className="container mx-auto">
                    <div className="text-sm mb-4 text-blue-5">
                        <span
                            className="cursor-pointer text-primary-blue"
                            onClick={previousPage}>
                            Library
                        </span>{' '}
                        /
                    </div>
                    <h2 className="text-2xl mb-10">Events</h2>
                    <div className="text-left">
                        <p className="text-xl blue-50 pb-10">
                            {trans('Upcoming Events')}
                        </p>
                    </div>
                    <div className="grid grid-cols-12 grid-rows-1 gap-x-0 gap-y-4 sm:gap-4 card">
                        {eventList.slice(0, 3).map((events) => (
                            <Link
                                className="events-thumbnail"
                                to={`/events/${events.id}`}
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
                                                {formatTime(events.time_from)}
                                            </p>
                                            {events.time_to && (
                                                <p className="to ml-1">
                                                    - {formatTime(events.time_to)}
                                                </p>
                                            )}
                                        </div>

                                        <p className="card__venue text-base">
                                            {events.location}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-4 events events__past  pb-24">
                <div className="container mx-auto">
                    <div className="text-left">
                        <p className="text-xl blue-50 pb-6">
                            {trans('Past Events')}
                        </p>
                    </div>
                    <div className="grid grid-cols-12 grid-rows-1 gap-x-0 gap-y-4 sm:gap-4  card">
                        {eventList &&
                        eventList.slice(3, 9).map((events) => {
                            return (
                                <Link
                                    key={events.id}
                                    className="events-thumbnail"
                                    to={`/events/${events.id}`}>
                                    <div className="card__item h-full px-8 py-8">
                                        <div className="card__day text-4xl">
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
                                                    {formatTime(events.time_from)}
                                                </p>
                                                {events.time_to && (
                                                    <p className="to ml-1">
                                                        - {formatTime(events.time_to)}
                                                    </p>
                                                )}
                                            </div>
                                            <p className="card__venue text-base">
                                                {events.location}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                    {eventList.length === 0 ? (
                        <p>{trans('There are no Past Events Records')}</p>
                    ) : (
                        ''
                    )}
                    {/* <div className="flex justify-center pt-10">
                                <Link
                                    to="/events"
                                    className="text-white bg-primary-blue px-32 py-4 rounded">
                                    Load more
                                </Link>
                            </div> */}
                </div>
            </section>
        </div>
    )
}

export default Events
