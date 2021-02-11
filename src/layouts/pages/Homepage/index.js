import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import useTrans from '../../../hooks/useTrans'
import WorldMapRace from './sections/WorldMapRace'
import NewsSection from './sections/NewsSection'
import LibrarySection from './sections/LibrarySection'
import { ReactComponent as HeroIcon } from '../../../assets/img/icons/covid.svg'
import { ReactComponent as MouseScroll } from '../../../assets/img/icons/mouse-scroll.svg'
import { ReactComponent as CircleIcon } from '../../../assets/img/icons/circle-ring.svg'
import { ReactComponent as BottomCurve } from '../../../assets/img/icons/circle_bottom.svg'
import LibraryUpcomingEvents from '../Library/sections/LibraryUpcomingEvents'

const Home = () => {
    const { trans } = useTrans()

    return (
        <Fragment>
            <section className="hero-section relative mx-auto px-4 flex flex-col justify-center">
                <div className="outer-circle mt-40 mx-auto relative flex justify-center items-center">
                    <CircleIcon className="hidden md:block circle-ring absolute h-full w-full z-negative" />
                    <HeroIcon className="covid-icon hidden md:block" />
                    <div className="inner-circle rounded md:rounded-full bg-yellow-20 overflow-hidden flex flex-col justify-center items-center">
                        <div className="flex-1 text-center pt-16 md:pt-0 pb-6 md:pb-8 px-2 md:flex md:flex-col md:justify-end">
                            <h1 className="text-xl md:text-4xl font-bold uppercase leading-none text-center">
                                {trans('EMERGENCY PROCUREMENT')}
                            </h1>
                            <p className="text-xs md:text-base uppercase mt-2 md:mt-6">
                                {trans(
                                    'DATA, BEST PRACTICES AND RECOMMENDATIONS'
                                )}
                            </p>
                        </div>
                        <div className="flex md:flex-no-wrap justify-center pt-12 w-full text-white bg-primary-dark pb-6 md:pb-16">
                            <Link
                                to="/global-overview/data"
                                className="px-2 md:px-0 md:flex md:mr-12 md:mb-10 text-center">
                                <div>
                                    <p className="text-sm md:text-lg md:font-bold uppercase border-b-2 md:border-b-4 border-primary-blue">
                                        {trans('Explore data')}
                                    </p>
                                    <p className="text-xxs md:text-sm opacity-50 mt-1">
                                        {trans('Stats from countries')}
                                    </p>
                                </div>
                            </Link>
                            <Link
                                to="/library"
                                className="px-2 md:px-0 md:flex text-center">
                                <div>
                                    <p className="text-sm md:text-lg md:font-bold uppercase border-b-2 md:border-b-4 border-primary-blue">
                                        {trans('Explore library')}
                                    </p>
                                    <p className="text-xxs md:text-sm opacity-50 mt-1">
                                        {trans('Best practices and resources')}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="text-white text-center mt-12 mb-20 md:mb-40">
                    <MouseScroll className="m-auto" />
                    <p className="text-sm mt-3">
                        {trans('Scroll down for more')}
                    </p>
                </div>
                <BottomCurve className="absolute bottom-0 left-0 h-auto w-full" />
            </section>

            <WorldMapRace />

            <NewsSection />
            <LibraryUpcomingEvents />
            <LibrarySection />
        </Fragment>
    )
}

export default Home
