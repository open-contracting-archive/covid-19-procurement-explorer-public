import React, { useEffect, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { get } from 'lodash'
import CmsPageService from '../../../../services/CmsPageService'
import useTrans from '../../../../hooks/useTrans'
import Loader from '../../../../components/Loader/Loader'

const LibraryResources = () => {
    const [resourceList, setResourceList] = useState([])
    const [loading, setLoading] = useState(true)
    const { trans } = useTrans()

    useEffect(() => {
        CmsPageService.ResourceList().then((response) => {
            setResourceList(response.items)
            setLoading(false)
        })

        return () => {
            setResourceList([])
        }
    }, [])

    const getDocumentUrl = (resourceItem) => {
        if (resourceItem) {
            const documentUrl = get(resourceItem, 'document.meta.download_url', null)
            const link = get(resourceItem, 'link', null)

            return documentUrl ? documentUrl : (link ? link : null)
        }
        return null
    }

    return (
        <section className="px-4 resources py-8 md:py-24">
            <div className="container mx-auto">
                <div className="text-center">
                    <p className="text-xl blue-50 pb-10">
                        {trans('Resources')}
                    </p>
                </div>
                {loading ? (
                    <Loader />
                ) : (
                    <Fragment>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-6 card">
                            {resourceList &&
                            resourceList.slice(0, 8).map((resource) => {
                                return (
                                    <div
                                        className="card__item rounded px-6 py-6"
                                        key={resource.id}>
                                        <div className="card__caption">
                                            <Link
                                                to={`/resources/${resource.id}`}>
                                                <h3 className="hover:text-primary-blue focus:text-primary-blue card__title text-lg">
                                                    {resource.title}
                                                </h3>
                                            </Link>
                                            {getDocumentUrl(resource) && (
                                                <a
                                                    href={getDocumentUrl(resource)}
                                                    target="_blank"
                                                    rel="noreferrer">
                                                    <div className="download mt-4 flex">
                                                        <svg
                                                            width="24"
                                                            height="16"
                                                            viewBox="0 0 24 16"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M19.35 6.04C19.0141 4.33772 18.0976 2.80486 16.7571 1.70325C15.4165 0.601633 13.7351 -0.000392242 12 1.91737e-07C9.11 1.91737e-07 6.6 1.64 5.35 4.04C3.88023 4.19883 2.52101 4.89521 1.53349 5.99532C0.545971 7.09543 -0.000171702 8.52168 4.04928e-08 10C4.04928e-08 13.31 2.69 16 6 16H19C21.76 16 24 13.76 24 11C24 8.36 21.95 6.22 19.35 6.04ZM19 14H6C3.79 14 2 12.21 2 10C2 7.95 3.53 6.24 5.56 6.03L6.63 5.92L7.13 4.97C7.58988 4.07478 8.28787 3.32382 9.14712 2.79979C10.0064 2.27577 10.9936 1.99902 12 2C14.62 2 16.88 3.86 17.39 6.43L17.69 7.93L19.22 8.04C19.9717 8.09056 20.6764 8.42399 21.1922 8.97319C21.708 9.52238 21.9966 10.2466 22 11C22 12.65 20.65 14 19 14ZM13.45 6H10.55V9H8L12 13L16 9H13.45V6Z"
                                                                fill="#1FBBEC"
                                                            />
                                                        </svg>
                                                        <span className="text-blue-20 test-sm ml-2">
                                                                {trans(
                                                                    'Download'
                                                                )}
                                                            </span>
                                                    </div>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        {resourceList.length !== 0 ? (
                            <div className="flex justify-center pt-10">
                                <Link to="/resources" className="text-blue-20">
                                    {trans('View all resources')} --&gt;{' '}
                                </Link>
                            </div>
                        ) : (
                            <p className="text-center">{trans('There are no resources')}</p>
                        )}
                    </Fragment>
                )}
            </div>
        </section>
    )
}

export default LibraryResources
