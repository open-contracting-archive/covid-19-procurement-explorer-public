import React, { useEffect, useState, Fragment } from 'react'
import { Link, useParams } from 'react-router-dom'
import { get } from 'lodash'
import { API_URL } from '../../../helpers/api'
import CmsPageService from '../../../services/CmsPageService'
import Loader from '../../../components/Loader/Loader'
import { formatDate } from "../../../helpers/date"
import ShareButtons from "../../../components/Library/ShareButtons"
import TagList from "../../../components/website/Library/TagList"
import Breadcrumb from "../../../components/website/Library/Breadcrumb"

const NewsDetail = () => {
    const [newsDetail, setNewsDetail] = useState({})
    const [newsData, setNewsData] = useState([])
    const [loading, setLoading] = useState(true)
    let { id: newsId } = useParams()
    window.scrollTo(0, 0)

    useEffect(() => {
        setLoading(true)
        CmsPageService.NewsDetail(newsId)
            .then((response) => {
                setNewsDetail(response)
                setLoading(false)
            })
        CmsPageService.NewsList()
            .then((response) => {
                setNewsData(response.items)
            })
    }, [newsId])

    return (
        <section className="pt-8">
            <div className="container mx-auto px-4 news-detail">
                <Breadcrumb item={'news'} />
                {loading ? (<Loader />) : (
                    <Fragment>
                        <h2 className="md:w-3/4 text-lg md:text-xl leading-tight mb-6 md:mb-10 text-primary-dark">
                            {newsDetail.title}
                        </h2>
                        {get(newsDetail, 'content_image.meta.download_url') &&
                        <div className="img-wrapper mb-6 md:mb-10">
                            <img
                                src={`${API_URL}${get(newsDetail, 'content_image.meta.download_url')}`}
                                alt={get(newsDetail, 'content_image.title')} />
                        </div>
                        }
                        <div className="flex flex-wrap lg:flex-no-wrap justify-between mb-10">
                            <div className="mb-4 news-detail__metadata">
                                <p className="inline-block lg:block font-bold opacity-40 mb-2">
                                    Published on
                                </p>
                                <p className="inline-block lg:block ml-3 lg:ml-0">
                                    {formatDate(newsDetail.published_date, 'MMMM DD, YYYY')}
                                </p>
                                <div className="mt-8 hidden lg:block">
                                    <TagList item={newsDetail} />
                                </div>
                            </div>
                            <div>
                                <div className="mb-10 news-detail__content"
                                     dangerouslySetInnerHTML={{ __html: newsDetail.rendered_body }}>
                                </div>
                                <div className="flex flex-col md:flex-row justify-between mb-6 lg:mb-0">
                                    <div className="block lg:hidden mb-6 md:mb-0">
                                        <TagList item={newsDetail} />
                                    </div>
                                    <div className="flex">
                                        <p className="font-bold opacity-40 mr-4">
                                            Share on
                                        </p>
                                        <ShareButtons url={window.location.href} />
                                    </div>
                                </div>
                            </div>
                            <div className="hidden lg:block">
                                <p className="font-bold opacity-40 mb-2">
                                    Share on
                                </p>
                                <ShareButtons url={window.location.href} />
                            </div>
                        </div>
                        {newsData.length !== 1 ?
                            <>
                                <hr className="mb-10 text-primary-gray" />
                                <div className="mb-20">
                                    <h2 className="text-xl mb-6">Other News</h2>
                                    <div className="grid grid-cols-12  gap-x-0 gap-y-10 sm:gap-10  mb-10">
                                        {newsData &&
                                        newsData
                                            .filter((news) => news.id !== newsId)
                                            .slice(0, 3)
                                            .map((news) => {
                                                return (
                                                    <Link
                                                        className="news-thumbnail"
                                                        to={`/news/${news.id}`}
                                                        key={news.id}>
                                                        {get(
                                                            news,
                                                            'content_image.meta.download_url'
                                                        ) &&
                                                        <div className="img-wrapper">
                                                            <img
                                                                src={`${API_URL}${get(news, 'content_image.meta.download_url')}`}
                                                                alt="" />
                                                        </div>
                                                        }
                                                        <div>
                                                            <h3 className="news-caption__title">
                                                                {news.title}
                                                            </h3>
                                                            <p className="news-caption__date">
                                                                {formatDate(news.published_date, 'MMMM DD, YYYY')}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                )
                                            })}
                                    </div>
                                    <div className="flex justify-center items-center mt-12">
                                        <hr className="text-primary-gray flex-1" />
                                        <Link to="/news" className="text-blue-20 px-4">
                                            View all news --&gt;{' '}
                                        </Link>
                                        <hr className="text-primary-gray flex-1" />
                                    </div>
                                </div>
                            </> : ""
                        }
                    </Fragment>
                )}
            </div>
        </section>
    )
}

export default NewsDetail
