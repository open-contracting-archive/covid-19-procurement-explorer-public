import React, { Fragment } from 'react'
import { ReactComponent as HeroIcon } from '../assets/img/icons/covid.svg'
import { ReactComponent as MouseScroll } from '../assets/img/icons/mouse-scroll.svg'
import { ReactComponent as CircleIcon } from '../assets/img/icons/circle-ring.svg'
import { ReactComponent as BottomCurve } from '../assets/img/icons/circle_bottom.svg'
import useTrans from '../hooks/useTrans'
import Library from './home/library'
import geo_data from '../data/GeoChart.world.geo.json'
import GeoChart from '../components/charts/GeoChart/GeoChart'
import Map from '../components/charts/Map/Map'
import NewsSection from './home/newsSection'

const Home = () => {
    const { trans } = useTrans()
    return (
        <Fragment>
            <section className="hero-section relative [ mx-auto px-4 ] [ flex flex-col justify-center ]">
                <div className="outer-circle mt-40 mx-auto relative [ flex justify-center items-center ]">
                    <CircleIcon className="circle-ring absolute h-full w-full z-negative" />
                    <HeroIcon className="covid-icon" />
                    <div className="inner-circle rounded-full bg-yellow-20 overflow-hidden [ flex flex-col justify-center items-center ]">
                        <div className="[ flex-1 flex flex-col justify-end items-center ] pb-8">
                            <h1 className="[ text-3xl md:text-4xl font-bold uppercase leading-none ] text-center">
                                {trans('EMERGENCY PROCUREMENT')}
                            </h1>
                            <p className="uppercase mt-6">
                                {trans(
                                    'DATA, BEST PRACTICES AND RECOMMENDATIONS'
                                )}
                            </p>
                        </div>
                        <div
                            style={{
                                height: '200px'
                            }}
                            className="[ flex flex-wrap md:flex-no-wrap justify-center ] pt-12 w-full text-white bg-primary-dark">
                            <a
                                href=""
                                className="flex [ mr-12 mb-10 ] text-center">
                                <div>
                                    <p className="[ text-lg font-bold uppercase ] border-b-4 border-primary-blue">
                                        {trans('Explore data')}
                                    </p>
                                    <p className="text-sm opacity-50 mt-1">
                                        {trans('Stats from countries')}
                                    </p>
                                </div>
                            </a>
                            <a href="" className="flex text-center">
                                <div>
                                    <p className="[ text-lg font-bold uppercase ] border-b-4 border-primary-blue">
                                        {trans('Explore library')}
                                    </p>
                                    <p className="text-sm opacity-50 mt-1">
                                        {trans('Best practices and resources')}
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="text-white text-center mt-12 mb-40">
                    <MouseScroll className="m-auto" />
                    <p className="text-sm mt-3">Scroll down for more</p>
                </div>

                <BottomCurve className="absolute bottom-0 left-0 h-auto w-full" />
            </section>
            <section>
                <Map />
                {/* <GeoChart data={geo_data} /> */}
            </section>
            <NewsSection />
            <Library />
        </Fragment>
    )
}

export default Home
