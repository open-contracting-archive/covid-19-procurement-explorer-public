import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import CmsPageService from '../../../services/CmsPageService'
import { Loader } from '../../../components/Utilities'

const CmsPageContent = (props) => {
    const { slug } = props
    const [loading, setLoading] = useState(true)
    const [pageDetail, setPageDetail] = useState({})

    useEffect(() => {
        CmsPageService.StaticPageDetailBySlug(slug).then((response) => {
            setPageDetail(response)
            setLoading(false)
        })

        return () => {
            setPageDetail({})
        }
    }, [slug])

    return (
        <section className="world-map-chart-container p-4 bg-white rounded rounded-b-none relative">
            <div className="container mx-auto px-4">
                {loading ? (
                    <Loader />
                ) : (
                    <Fragment>
                        <h2 className="text-lg md:text-xl leading-tight mb-6 uppercase text-primary-dark">
                            {pageDetail.title}
                        </h2>
                        <div
                            style={{ minHeight: '40vh' }}
                            className="flex flex-wrap lg:flex-no-wrap justify-between news-detail__content"
                        >
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: pageDetail.rendered_body
                                }}
                            />
                        </div>
                    </Fragment>
                )}
            </div>
        </section>
    )
}

CmsPageContent.propTypes = {
    slug: PropTypes.string
}
export default CmsPageContent
