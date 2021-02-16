import React, { useState, useEffect, Fragment } from 'react'
import CmsPageService from "../../../services/CmsPageService"
import Loader from "../../../components/Loader/Loader"

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
        <section className="pt-4">
            <div className="container mx-auto px-4">
                {loading ? (
                    <Loader />
                ) : (
                    <Fragment>
                        <h2 className="text-lg md:text-xl leading-tight mb-6 md:mb-10 uppercase text-primary-dark">
                            {pageDetail.title}
                        </h2>
                        <div
                            style={{ minHeight: '40vh' }}
                            className="flex flex-wrap lg:flex-no-wrap justify-between mb-10">
                            <div
                                className="mb-10"
                                dangerouslySetInnerHTML={{
                                    __html: pageDetail.rendered_body
                                }} />
                        </div>
                    </Fragment>
                )}
            </div>
        </section>
    )
}
export default CmsPageContent
