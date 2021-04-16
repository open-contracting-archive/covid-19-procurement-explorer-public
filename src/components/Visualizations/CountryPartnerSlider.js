import React, { Fragment, useState, useEffect } from 'react'
import { API_URL } from '../../helpers/api'
import { Loader } from '../Utilities'
import VisualizationService from '../../services/VisualizationService'
import { t } from '@transifex/native'
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
    const [originalData, setOriginalData] = useState([])

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.CountryPartners(params)
            .then((response) => {
                if (!response.error) {
                    setOriginalData(response)
                }

                setLoading(false)
            })
            .catch(() => setLoading(false))

        return () => {
            setOriginalData([])
        }
    }, [params?.country])

    return (
        <div className="bg-white rounded p-4 md:pb-8 simple-tab text-primary-dark">
            <h3 className="uppercase font-bold mb-6">
                {t('Country partner organization')}
            </h3>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    {originalData.length ? (
                        <Swiper
                            spaceBetween={50}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}>
                            {originalData &&
                                originalData.map((index, key) => {
                                    return (
                                        <SwiperSlide key={key}>
                                            <div>
                                                <h2 className="text-lg md:text-xl mb-2 md:px-10">
                                                    {index.name}
                                                </h2>
                                                <div className="flex flex-wrap md:px-10">
                                                    <div className="w-full md:w-1/2 mb-4">
                                                        <p className="text-base md:pr-8 lg:pr-10 ">
                                                            {index.description}
                                                        </p>
                                                    </div>
                                                    <div className="w-full md:w-1/2">
                                                        <div className="flex flex-wrap">
                                                            <div className="w-full md:w-auto md:pr-4">
                                                                <div className="mb-6">
                                                                    <span className="block mb-2">
                                                                        {t(
                                                                            'Website'
                                                                        )}
                                                                    </span>
                                                                    <a
                                                                        href={
                                                                            index.website ||
                                                                            '-'
                                                                        }
                                                                        className="text-blue-20"
                                                                        target="_blank"
                                                                        rel="noreferrer"
                                                                        title={
                                                                            index.name
                                                                        }>
                                                                        {
                                                                            index.website
                                                                        }
                                                                    </a>
                                                                </div>
                                                                <div>
                                                                    <span className="block mb-2">
                                                                        {t(
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
                                                            <div className="w-full md:w-auto md:flex-1 md:text-center">
                                                                <img
                                                                    src={`${API_URL}/media/${index.logo.replaceAll(
                                                                        '"',
                                                                        ''
                                                                    )}`}
                                                                    alt={
                                                                        index.name
                                                                    }
                                                                    className="md:mx-auto h-16"
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
