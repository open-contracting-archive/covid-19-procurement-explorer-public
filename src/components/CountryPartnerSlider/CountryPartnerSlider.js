import React, { Fragment, useState, useEffect } from 'react'
import { API_URL } from '../../helpers/api'
import Loader from '../../components/Loader/Loader'
import VisualizationServices from '../../services/visualizationServices'
import useTrans from '../../hooks/useTrans'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import 'swiper/components/scrollbar/scrollbar.scss'

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

const CountryPartnerSlider = ({ params }) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const [loading, setLoading] = useState(true)
    const [countryPartner, setCountryPartner] = useState([])
    const { trans } = useTrans()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationServices.CountryPartners(params)
            .then((response) => {
                if (!response.error) {
                    setCountryPartner(response)
                }

                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [params?.country])

    return (
        <div className="bg-white rounded p-4 pb-8 simple-tab text-primary-dark">
            <h3 className="uppercase font-bold mb-6">
                {trans('Country partner organization')}
            </h3>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    {countryPartner.length ? (
                        <Swiper
                            spaceBetween={50}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}>
                            {countryPartner &&
                            countryPartner.map((index, key) => {
                                return (
                                    <SwiperSlide key={key}>
                                        <div>
                                            <h2 className="text-xl mb-2 md:px-10">
                                                {index.name}
                                            </h2>
                                            <div className="flex flex-wrap px-10">
                                                <div className="w-full md:w-1/2 mb-4">
                                                    <p className="text-base pr-8 lg:pr-10 ">
                                                        {index.description}
                                                    </p>
                                                </div>
                                                <div className="w-full md:w-1/2">
                                                    <div className="flex">
                                                        <div className="pr-4">
                                                            <div className="mb-6">
                                                                    <span className="block mb-2">
                                                                        {trans(
                                                                            'Website'
                                                                        )}
                                                                    </span>
                                                                <a
                                                                    href=""
                                                                    className="text-blue-20"
                                                                    target="_blank">
                                                                    {
                                                                        index.website
                                                                    }
                                                                </a>
                                                            </div>
                                                            <div>
                                                                    <span className="block mb-2">
                                                                        {trans(
                                                                            'Email'
                                                                        )}
                                                                    </span>
                                                                <a
                                                                    href={`maitlo:${index.email}`}
                                                                    className="text-blue-20">
                                                                    {
                                                                        index.email
                                                                    }
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 text-center">
                                                            <img
                                                                src={`${API_URL}/media/${index.logo.replaceAll(
                                                                    '"',
                                                                    ''
                                                                )}`}
                                                                alt={
                                                                    index.name
                                                                }
                                                                className="mx-auto h-16"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    ) : (
                        <p className="text-primary-dark text-opacity-75 text-center py-16">
                            No country partner organizations data available.
                        </p>
                    )}
                </Fragment>
            )}
        </div>
    )
}
export default CountryPartnerSlider
