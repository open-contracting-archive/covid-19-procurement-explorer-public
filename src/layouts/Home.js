import React, { Fragment } from 'react'
import { ReactComponent as HeroIcon } from '../assets/img/icons/covid.svg'
import { ReactComponent as MouseScroll } from '../assets/img/icons/mouse-scroll.svg'
import { ReactComponent as CircleIcon } from '../assets/img/icons/circle-ring.svg'
import useTrans from '../hooks/useTrans'
import Library from './home/library'

const Home = () => {
    const { trans } = useTrans()
    return (
        <Fragment>
            <main className="hero-section [ mx-auto px-4 ] [ flex flex-col justify-center ]">
                <div
                    // style={{
                    //     height: '667px',
                    //     width: '667px'
                    // }}
                    className="outer-circle mt-40 mx-auto relative [ flex justify-center items-center ]">
                    <CircleIcon className="circle-ring absolute h-full w-full" />
                    <HeroIcon className="covid-icon" />
                    <div
                        style={{
                            // height: '633px',
                            // width: '633px',
                            backgroundColor: '#C8D419'
                        }}
                        className="inner-circle rounded-full bg-orange-200 overflow-hidden [ flex flex-col justify-center items-center ]">
                        <div
                            style={{ color: '#293E45' }}
                            className="[ flex-1 flex flex-col justify-end items-center ] pb-8">
                            <h1 className="[ text-3xl md:text-6xl font-bold uppercase leading-none ] text-center">
                                {trans('EMERGENCY PROCUREMENT')}
                            </h1>
                            <p className="[ text-lg uppercase ] mt-8">
                                {trans(
                                    'DATA, BEST PRACTICES AND RECOMMENDATIONS'
                                )}
                            </p>
                        </div>
                        <div
                            style={{
                                height: '200px',
                                backgroundColor: '#293E45'
                            }}
                            className="[ flex flex-wrap md:flex-no-wrap justify-center ] pt-12 w-full text-white">
                            <a
                                href=""
                                className="flex [ mr-12 mb-10 ] text-center">
                                <div>
                                    <p
                                        style={{ borderColor: '#1FBBEC' }}
                                        className="[ text-lg font-bold uppercase ] border-b-4">
                                        {trans('Explore data')}
                                    </p>
                                    <p className="text-sm opacity-50">
                                        {trans('Stats from countries')}
                                    </p>
                                </div>
                            </a>
                            <a href="" className="flex text-center">
                                <div>
                                    <p
                                        style={{ borderColor: '#1FBBEC' }}
                                        className="[ text-lg font-bold uppercase ] border-b-4">
                                        {trans('Explore library')}
                                    </p>
                                    <p className="text-sm opacity-50">
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
            </main>
            <Library />
        </Fragment>
    )
}

export default Home
