import React, { useState, useEffect, Fragment } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import CmsPageService from '../../../services/CmsPageService'
import Loader from '../../../components/Loader/Loader'

const StaticPage = () => {
    let { slug } = useParams()
    const [pageDetail, setPageDetail] = useState({})
    const [loading, setLoading] = useState(true)
    window.scrollTo(0, 0)

    useEffect(() => {
        CmsPageService.StaticPageDetailBySlug(slug).then((response) => {
            setPageDetail(response)
            setLoading(false)
        })

        return () => {
            setPageDetail({})
        }
    }, [slug])

    if (
        !loading &&
        (pageDetail.title === undefined || pageDetail.title === null)
    ) {
        return <Redirect to={'/' + slug} />
    }

    return (
        <section className="pt-8">
            <div className="container mx-auto px-4 news-detail">
                {loading ? (
                    <Loader />
                ) : (
                    <Fragment>
                        <h2 className="md:w-3/4 text-lg md:text-xl leading-tight mb-6 md:mb-10 uppercase text-primary-dark">
                            {pageDetail.title}
                        </h2>
                        <div
                            style={{ minHeight: '40vh' }}
                            className="flex flex-wrap lg:flex-no-wrap justify-between mb-10">
                            <div
                                className="mb-10 news-detail__content"
                                dangerouslySetInnerHTML={{
                                    __html: pageDetail.rendered_body
                                }}></div>
                        </div>
                    </Fragment>
                )}
            </div>
        </section>
    )
}

export default StaticPage
