import React, { useEffect, useState } from 'react'
import { useHistory, Link, useParams } from 'react-router-dom'
import { get } from 'lodash'
import * as dayjs from 'dayjs'
import { API_URL } from '../../../helpers/api'
import socialIcons from '../../../assets/img/icons/social'
import InsightServices from '../../../services/insightServices'
import Loader from '../../../components/Loader/Loader'
import newsImage from '../../../assets/img/news.jpg'

const ResourcesDetail = () => {
    const [newsDetail, setNewsDetail] = useState({})
    const [newsData, setNewsData] = useState([])
    const [loading, setLoading] = useState(true)
    let history = useHistory()
    let { id: newsId } = useParams()
    window.scrollTo(0, 0)

    const previousPage = () => {
        history.goBack()
    }

    const handleClick = () => {
        history.push("/tags");
    }


    useEffect(() => {
        InsightServices.NewsDetailData(newsId).then((response) => {
            // console.log(response)
            setNewsDetail(response)
            setLoading(false)
        })
        InsightServices.NewsData().then((response) => {
            setNewsData(response.items)
        })
    }, [newsId])

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
                            <Link to="/news"
                                className="cursor-pointer text-primary-blue"
                                >
                                Resources
                            </Link>{' '}
                        </div>

                        <div className="flex flex-wrap lg:flex-no-wrap justify-between mb-10">
                            <div className="mb-4 detail__metadata text-center">
                                <img src={newsImage} alt="" className="mb-6"/>
                                <div className="download flex mb-6 justify-center">
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
                            <div className="details md:mx-10 mx-0 b-24">
                                <h2 className="md:w-3/4 text-lg md:text-xl leading-tight mb-10 md:mb-10 uppercase text-primary-dark">
                                    Health sector emergency response plan
                                </h2>
                                <div className="mb-10 news-detail__content">
                                    <p>This is the dummy text</p>
                                    <ul>
                                        <li className="relative mb-4 pl-6 list-none">This plan intends to prepare and strengthen the health system response that is capable to minimise the adverse impact of COVID-19 pandemic.</li>
                                        <li className="relative mb-4 pl-6 list-none">This plan intends to prepare and strengthen the health system response that is capable to minimise the adverse impact of COVID-19 pandemic.</li>
                                        <li className="relative mb-4 pl-6 list-none">This plan intends to prepare and strengthen the health system response that is capable to minimise the adverse impact of COVID-19 pandemic.</li>
                                        <li className="relative mb-4 pl-6 list-none">This plan intends to prepare and strengthen the health system response that is capable to minimise the adverse impact of COVID-19 pandemic.</li>
                                    </ul>
                                </div>
                                <hr className="mb-6 text-primary-gray" />
                                <a
                                    className="text-blue-20 test-base"
                                    href="#">
                                    {' '}
                                    View more{' '}
                                </a>
                                <table className="my-10">
                                    <tr>
                                        <th className="px-6 py-6 font-bold opacity-50">Published on</th>
                                        <td className="px-6 py-6">August 06, 2020</td>
                                    </tr>
                                    <tr>
                                        <th className="px-6 py-6 font-bold opacity-50">Country</th>
                                        <td className="px-6 py-6">Mexico</td>
                                    </tr>
                                    <tr>
                                        <th className="px-6 py-6 font-bold opacity-50">Type</th>
                                        <td className="px-6 py-6">Open</td>
                                    </tr>
                                    <tr>
                                        <th className="px-6 py-6 font-bold opacity-50">Topic</th>
                                        <td className="px-6 py-6">Health</td>
                                    </tr>
                                    <tr>
                                        <th className="px-6 py-6 font-bold opacity-50">Language</th>
                                        <td className="px-6 py-6">English</td>
                                    </tr>

                                </table>

                            </div>
                            <div className="related-section">
                                <p className="font-bold opacity-40 mb-2">
                                    Share on
                                </p>
                                <div className="flex">
                                    <a href="" className="social-icon">
                                        <socialIcons.fbIcon />
                                    </a>
                                    <a href="" className="social-icon">
                                        <socialIcons.twitterIcon />
                                    </a>
                                    <a href="" className="social-icon">
                                        <socialIcons.linkedIcon />
                                    </a>
                                    <a href="" className="social-icon">
                                        <socialIcons.mailIcon />
                                    </a>
                                </div>
                                <div className="related mt-10 mb-4">
                                    <div className="related__list flex mb-6 pb-6">
                                        <img src={newsImage} alt="" className="w-1/3 mr-4 object-cover"/>
                                        <h3 className="text-sm">A Procurement Path to Equity: Strategies for Government and the Business Ecosystem</h3>
                                    </div>
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
