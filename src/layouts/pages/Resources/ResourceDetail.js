import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { get } from 'lodash'
import { T } from '@transifex/react'
import CmsPageService from '../../../services/CmsPageService'
import { formatDate } from '../../../helpers/date'
import pdfImage from '../../../assets/img/ic_pdf.svg'
import useCountries from '../../../hooks/useCountries'
import { stripTags } from '../../../helpers/transformers'
import {
    Loader,
    MetaInformation,
    ShareButtons,
    Breadcrumb
} from '../../../components/Utilities'

const ResourceDetail = () => {
    const [resourceDetail, setResourceDetail] = useState({})
    const [resourceList, setResourceList] = useState([])
    const [loading, setLoading] = useState(true)
    const { countryNameById, languageById } = useCountries()
    let { id: resourcesId } = useParams()
    window.scrollTo(0, 0)

    useEffect(() => {
        setLoading(true)
        CmsPageService.ResourceDetail(resourcesId).then((response) => {
            setResourceDetail(response)
            setLoading(false)
        })
        CmsPageService.ResourceList().then((response) => {
            setResourceList(response.items)
        })

        return () => {
            setResourceDetail({})
            setResourceList([])
        }
    }, [resourcesId])

    const getDocumentUrl = () => {
        if (resourceDetail) {
            const documentUrl = get(
                resourceDetail,
                'document.meta.download_url',
                null
            )
            const link = get(resourceDetail, 'link', null)

            return documentUrl ? documentUrl : link ? link : null
        }
        return null
    }

    return (
        <section className="pt-8">
            <MetaInformation
                title={resourceDetail.title}
                description={
                    resourceDetail.rendered_description &&
                    stripTags(resourceDetail.rendered_description)
                }
                canonicalLink={window.location.href}
            />
            <div className="container mx-auto px-4 news-detail">
                <Breadcrumb item={'resources'} />
                {loading ? (
                    <Loader />
                ) : (
                    <div className="flex flex-wrap lg:flex-no-wrap justify-between mb-10">
                        {getDocumentUrl() && (
                            <div className="mb-4 mr-10 detail__metadata ">
                                <div className="resource-download flex flex-wrap justify-center px-6 py-10 rounded mb-6">
                                    <img
                                        src={pdfImage}
                                        alt=""
                                        className="mb-6"
                                    />
                                    <div className="download flex justify-center">
                                        <svg
                                            width="24"
                                            height="16"
                                            viewBox="0 0 24 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M19.35 6.04C19.0141 4.33772 18.0976 2.80486 16.7571 1.70325C15.4165 0.601633 13.7351 -0.000392242 12 1.91737e-07C9.11 1.91737e-07 6.6 1.64 5.35 4.04C3.88023 4.19883 2.52101 4.89521 1.53349 5.99532C0.545971 7.09543 -0.000171702 8.52168 4.04928e-08 10C4.04928e-08 13.31 2.69 16 6 16H19C21.76 16 24 13.76 24 11C24 8.36 21.95 6.22 19.35 6.04ZM19 14H6C3.79 14 2 12.21 2 10C2 7.95 3.53 6.24 5.56 6.03L6.63 5.92L7.13 4.97C7.58988 4.07478 8.28787 3.32382 9.14712 2.79979C10.0064 2.27577 10.9936 1.99902 12 2C14.62 2 16.88 3.86 17.39 6.43L17.69 7.93L19.22 8.04C19.9717 8.09056 20.6764 8.42399 21.1922 8.97319C21.708 9.52238 21.9966 10.2466 22 11C22 12.65 20.65 14 19 14ZM13.45 6H10.55V9H8L12 13L16 9H13.45V6Z"
                                                fill="#1FBBEC"
                                            />
                                        </svg>
                                        <a
                                            className="text-blue-20 test-sm ml-1"
                                            href={getDocumentUrl()}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {' '}
                                            <T _str="Download" />{' '}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="details md:mr-10 mx-0 b-24">
                            <h2 className="text-lg md:text-xl leading-tight mb-5 text-primary-dark">
                                {resourceDetail.title}
                            </h2>
                            <div
                                className="mb-10 resources-detail__content"
                                dangerouslySetInnerHTML={{
                                    __html: resourceDetail.rendered_description
                                }}
                            ></div>
                            <hr className="mb-6 text-primary-gray" />
                            <table className="my-10 text-left">
                                <tr>
                                    <th className="px-6 py-6 font-bold opacity-50">
                                        <T _str="Published on" />
                                    </th>
                                    <td className="px-6 py-6">
                                        {formatDate(
                                            resourceDetail.meta
                                                .first_published_at,
                                            'MMMM DD, YYYY'
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <th className="px-6 py-6 font-bold opacity-50">
                                        <T _str="Country" />
                                    </th>
                                    <td className="px-6 py-6">
                                        {countryNameById(
                                            get(
                                                resourceDetail,
                                                'country.id',
                                                null
                                            )
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <th className="px-6 py-6 font-bold opacity-50">
                                        <T _str="Type" />
                                    </th>
                                    <td className="px-6 py-6">
                                        {resourceDetail.resource_type}
                                    </td>
                                </tr>
                                <tr>
                                    <th className="px-6 py-6 font-bold opacity-50">
                                        <T _str="Topic" />
                                    </th>
                                    <td className="px-6 py-6">
                                        {resourceDetail.topic}
                                    </td>
                                </tr>
                                <tr>
                                    <th className="px-6 py-6 font-bold opacity-50">
                                        <T _str="Language" />
                                    </th>
                                    <td className="px-6 py-6">
                                        {languageById(
                                            get(resourceDetail, 'lang.id', null)
                                        )}
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div className="related-section">
                            <ShareButtons />

                            <div className="related mb-4 mt-10">
                                <p className="font-bold opacity-40 mb-4">
                                    <T _str="Related Resources" />
                                </p>
                                {resourceList &&
                                    resourceList
                                        .filter(
                                            (resources) =>
                                                resources.id !== resourcesId
                                        )
                                        .slice(0, 3)
                                        .map((resources) => {
                                            return (
                                                <div
                                                    className="related__list flex mb-4 pb-4"
                                                    key={resources.id}
                                                >
                                                    <Link
                                                        to={`/resources/${resources.id}`}
                                                        className="hover:text-primary-blue focus:text-primary-blue"
                                                    >
                                                        <h3 className="text-sm">
                                                            {resources.title}
                                                        </h3>
                                                    </Link>
                                                </div>
                                            )
                                        })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default ResourceDetail
