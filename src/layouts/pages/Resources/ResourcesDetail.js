import React, {useEffect, useState} from 'react'
import {useHistory, Link, useParams} from 'react-router-dom'
import {get} from 'lodash'
import {API_URL} from '../../../helpers/api'
import socialIcons from '../../../assets/img/icons/social'
import CmsPageService from '../../../services/CmsPageService'
import Loader from '../../../components/Loader/Loader'
import {formatDate} from "../../../helpers/date";
import ShareButtons from "../share"
import pdfImage from '../../../assets/img/ic_pdf.svg'

const ResourcesDetail = () => {
    const [resourcesDetail, setResourcesDetail] = useState({})
    const [resourcesData, setResourcesData] = useState([])
    const [loading, setLoading] = useState(true)
    let history = useHistory()
    let { id: resourcesId } = useParams()
    window.scrollTo(0, 0)

    // const previousPage = () => {
    //     history.goBack()
    // }

    const handleClick = () => {
        history.push("/tags");
    }

    const url = () => {
        window.location.href;
    }

    const twitterHandle = "covid19";

    useEffect(() => {
        CmsPageService.ResourceDetail(resourcesId).then((response) => {
            // console.log(response)
            setResourcesDetail(response)
            setLoading(false)
        })
        CmsPageService.ResourceList().then((response) => {
            setResourcesData(response.items)
        })
    }, [resourcesId])

    

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <section className="pt-8">
                    <div className="container mx-auto px-4 news-detail">
                        <div className="text-sm mb-4 text-blue-5">
                            <Link to="/library"
                                className="cursor-pointer text-primary-blue">
                                Library
                            </Link>{' '}
                            /
                            <Link to="/resources"
                                className="cursor-pointer text-primary-blue"
                                >
                                Resources
                            </Link>{' '}
                        </div>

                        <div className="flex flex-wrap lg:flex-no-wrap justify-between mb-10">
                            <div className="mb-4 detail__metadata ">
                                <div className="resource-download flex flex-wrap justify-center px-6 py-10 rounded mb-6">
                                    <img src={pdfImage} alt="" className="mb-6"/>
                                    <div className="download flex  justify-center">
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
                                        <a
                                            className="text-blue-20 test-sm ml-1"
                                            href="#">
                                            {' '}
                                            Download{' '}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="details md:mx-10 mx-0 b-24">
                                <h2 className="md:w-3/4 text-lg md:text-xl leading-tight mb-10 md:mb-10 uppercase text-primary-dark">
                                    {resourcesDetail.title}
                                </h2>
                                {/* <div className="mb-10 resources-detail__content">
                                    <p>This is the dummy text</p>
                                    <ul>
                                        <li className="relative mb-4 pl-6 list-none">This plan intends to prepare and strengthen the health system response that is capable to minimise the adverse impact of COVID-19 pandemic.</li>
                                        <li className="relative mb-4 pl-6 list-none">This plan intends to prepare and strengthen the health system response that is capable to minimise the adverse impact of COVID-19 pandemic.</li>
                                        <li className="relative mb-4 pl-6 list-none">This plan intends to prepare and strengthen the health system response that is capable to minimise the adverse impact of COVID-19 pandemic.</li>
                                        <li className="relative mb-4 pl-6 list-none">This plan intends to prepare and strengthen the health system response that is capable to minimise the adverse impact of COVID-19 pandemic.</li>
                                    </ul>
                                </div> */}
                                <div
                                    className="mb-10 resources-detail__content"
                                    dangerouslySetInnerHTML={{
                                        __html: resourcesDetail.rendered_description
                                    }}>
                                    {/* {eventsDetail.body} */}
                                </div>
                                <hr className="mb-6 text-primary-gray" />
                                <a
                                    className="text-blue-20 test-base"
                                    href="#">
                                    {' '}
                                    View more{' '}
                                </a>
                                <table className="my-10 text-left">
                                    <tr>
                                        <th className="px-6 py-6 font-bold opacity-50">Published on</th>
                                        <td className="px-6 py-6">{formatDate(resourcesDetail.meta.first_published_at, 'MMMM DD, YYYY')}</td>
                                    </tr>
                                    <tr>
                                        <th className="px-6 py-6 font-bold opacity-50">Country</th>
                                        <td className="px-6 py-6">{resourcesDetail.country.id}</td>
                                    </tr>
                                    <tr>
                                        <th className="px-6 py-6 font-bold opacity-50">Type</th>
                                        <td className="px-6 py-6">{resourcesDetail.resource_type}</td>
                                    </tr>
                                    <tr>
                                        <th className="px-6 py-6 font-bold opacity-50">Topic</th>
                                        <td className="px-6 py-6"></td>
                                    </tr>
                                    <tr>
                                        <th className="px-6 py-6 font-bold opacity-50">Language</th>
                                        <td className="px-6 py-6"></td>
                                    </tr>

                                </table>

                            </div>
                            <div className="related-section">
                                <p className="font-bold opacity-40 mb-2">
                                    Share on
                                </p>
                                <div className="flex">
                                    <ShareButtons  url={url} twitterHandle={twitterHandle}/>
                                </div>
                                <div className="related mb-4 mt-10">
                                    <p className="font-bold opacity-40 mb-4">
                                        Related Resources
                                    </p>
                                {resourcesData &&
                                    resourcesData
                                        .filter(
                                            (resources) => resources.id != resourcesId
                                        )
                                        .slice(0, 3)
                                        .map((resources) => {
                                            return (
                                                <div className="related__list flex mb-4 pb-4" key={resources.id}>
                                                    <Link
                                                        to={`/resources/${resources.id}`}>
                                                        <h3 className="text-sm">{resources.title}</h3>
                                                    </Link>
                                                </div>
                                            )
                                        })}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}

export default ResourcesDetail
