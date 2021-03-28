import React, { useState, useEffect, Fragment } from 'react'
import { isEmpty } from 'lodash'
import CmsPageService from '../../../../services/CmsPageService'
import Loader from '../../../../components/Loader/Loader'

const CountryMethodology = (props) => {
    const { countryId } = props
    const [loading, setLoading] = useState(true)
    const [pageDetail, setPageDetail] = useState({})

    useEffect(() => {
        const params = {
            country: countryId,
            static_content_type: 'methodology'
        }
        CmsPageService.MethodologyContent(params)
            .then((result) => {
                setPageDetail(result)
                setLoading(false)
            })
            .catch((error) => console.log(error))

        return () => {
            setPageDetail({})
        }
    }, [countryId])

    return (
        <section className="world-map-chart-container p-4 bg-white rounded rounded-b-none relative">
            <div className="container mx-auto px-4">
                {loading ? (
                    <Loader />
                ) : !isEmpty(pageDetail) ? (
                    <Fragment>
                        <h2 className="text-lg md:text-xl leading-tight mb-6 uppercase text-primary-dark">
                            {pageDetail.title}
                        </h2>
                        <div
                            style={{ minHeight: '40vh' }}
                            className="flex flex-wrap lg:flex-no-wrap justify-between news-detail__content">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: pageDetail.rendered_body
                                }}
                            />
                        </div>
                    </Fragment>
                ) : (
                    <p>No content found.</p>
                )}
            </div>
        </section>
    )
}

export default CountryMethodology
