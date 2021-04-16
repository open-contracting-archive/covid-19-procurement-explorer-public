import React, { useEffect, useState, Fragment } from 'react'
import { Link, useParams } from 'react-router-dom'
import { get } from 'lodash'
import { API_URL } from '../../../helpers/api'
import CmsPageService from '../../../services/CmsPageService'
import { formatDate } from '../../../helpers/date'
import useTrans from '../../../hooks/useTrans'
import DefaultImage from '../../../assets/img/default_image.png'
import { stripTags } from '../../../helpers/transformers'
import {
    Loader,
    MetaInformation,
    Breadcrumb,
    ShareButtons,
    TagList
} from '../../../components/Utilities'

const NewsDetail = () => {
    const [newsDetail, setNewsDetail] = useState({})
    const [newsList, setNewsList] = useState([])
    const [loading, setLoading] = useState(true)
    let { id: newsId } = useParams()
    const { trans } = useTrans()
    window.scrollTo(0, 0)

    useEffect(() => {
        setLoading(true)
        CmsPageService.NewsDetail(newsId).then((response) => {
            setNewsDetail(response)
            setLoading(false)
        })
        CmsPageService.NewsList().then((response) => {
            setNewsList(response.items)
        })

        return () => {
            setNewsDetail({})
            setNewsList([])
        }
    }, [newsId])

    return (
        <section className="p-4 md:pt-8">
            <MetaInformation
                title={newsDetail.title}
                imageURL={`${API_URL}${get(
                    newsDetail,
                    'content_image.meta.download_url'
                )}`}
                description={
                    newsDetail.rendered_body &&
                    stripTags(newsDetail.rendered_body)
                }
                canonicalLink={window.location.href}
            />
            <div className="container mx-auto px-4 news-detail">
                <Breadcrumb item={'news'} />
                {loading ? (
                    <Loader />
                ) : (
                    <Fragment>
                        <h2 className="md:w-3/4 text-lg md:text-xl leading-tight mb-6 md:mb-10 text-primary-dark">
                            {newsDetail.title}
                        </h2>
                        {get(newsDetail, 'content_image.meta.download_url') && (
                            <div className="img-wrapper mb-6 md:mb-10">
                                <img
                                    src={`${API_URL}${get(
                                        newsDetail,
                                        'content_image.meta.download_url'
                                    )}`}
                                    alt={get(newsDetail, 'content_image.title')}
                                />
                            </div>
                        )}
                        <div className="flex flex-wrap lg:flex-no-wrap justify-between mb-10">
                            <div className="mb-4 news-detail__metadata md:pr-6">
                                <p className="inline-block lg:block font-bold opacity-40 mb-2">
                                    {trans('Published on')}
                                </p>
                                <p className="inline-block lg:block ml-3 lg:ml-0">
                                    {formatDate(
                                        newsDetail.news_date,
                                        'MMMM DD, YYYY'
                                    )}
                                </p>
                                <div className="mt-8 hidden lg:block">
                                    <TagList item={newsDetail} />
                                </div>
                            </div>
                            <div className="md:pr-6">
                                <div
                                    className="mb-10 news-detail__content"
                                    dangerouslySetInnerHTML={{
                                        __html: newsDetail.rendered_body
                                    }}
                                />
                                <div className="flex flex-col md:flex-row justify-between">
                                    <div className="block lg:hidden mb-6 md:mb-0">
                                        <TagList item={newsDetail} />
                                    </div>
                                    <div className="block lg:hidden mb-6 md:mb-0">
                                        <ShareButtons />
                                    </div>
                                </div>
                            </div>
                            <div className="hidden lg:block">
                                <ShareButtons />
                            </div>
                        </div>
                        {newsList.length !== 1 ? (
                            <>
                                <hr className="mb-10 text-primary-gray" />
                                <div className="mb-20">
                                    <h2 className="text-xl mb-6">
                                        {trans('Other News')}
                                    </h2>
                                    <div className="grid grid-cols-12  gap-x-0 gap-y-10 sm:gap-10  mb-10">
                                        {newsList &&
                                            newsList
                                                .filter(
                                                    (news) => news.id !== newsId
                                                )
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
                                                            ) != null ? (
                                                                <div className="img-wrapper">
                                                                    <img
                                                                        src={`${API_URL}${get(
                                                                            news,
                                                                            'content_image.meta.download_url'
                                                                        )}`}
                                                                        alt=""
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <div className="img-wrapper">
                                                                    <img
                                                                        src={
                                                                            DefaultImage
                                                                        }
                                                                        alt="No image"
                                                                    />
                                                                </div>
                                                            )}
                                                            <div>
                                                                <h3 className="hover:text-primary-blue focus:text-primary-blue news-caption__title">
                                                                    {news.title}
                                                                </h3>
                                                                <p className="news-caption__date">
                                                                    {formatDate(
                                                                        news.news_date,
                                                                        'MMMM DD, YYYY'
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </Link>
                                                    )
                                                })}
                                    </div>
                                    <div className="flex justify-center items-center mt-12">
                                        <hr className="text-primary-gray flex-1" />
                                        <Link
                                            to="/news"
                                            className="text-blue-20 px-4">
                                            {trans('View all news')} --&gt;{' '}
                                        </Link>
                                        <hr className="text-primary-gray flex-1" />
                                    </div>
                                </div>
                            </>
                        ) : (
                            ''
                        )}
                    </Fragment>
                )}
            </div>
        </section>
    )
}

export default NewsDetail
