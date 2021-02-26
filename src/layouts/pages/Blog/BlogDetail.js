import React, { useEffect, useState, Fragment } from 'react'
import { Link, useParams } from 'react-router-dom'
import { get } from 'lodash'
import { API_URL } from '../../../helpers/api'
import CmsPageService from '../../../services/CmsPageService'
import Loader from '../../../components/Loader/Loader'
import { formatDate } from '../../../helpers/date'
import ShareButtons from '../../../components/Library/ShareButtons'
import TagList from '../../../components/website/Library/TagList'
import Breadcrumb from '../../../components/website/Library/Breadcrumb'
import useTrans from '../../../hooks/useTrans'
import DefaultImage from '../../../assets/img/default_image.png'
import MetaInformation from '../../../components/MetaInformation/MetaInformation'
import { stripTags } from '../../../helpers/transformers'

const BlogDetail = () => {
    const [blogDetail, setBlogDetail] = useState({})
    const [blogList, setBlogList] = useState([])
    const [loading, setLoading] = useState(true)
    let { id: blogId } = useParams()
    let { trans } = useTrans()
    window.scrollTo(0, 0)

    useEffect(() => {
        setLoading(true)
        CmsPageService.BlogDetail(blogId).then((response) => {
            setBlogDetail(response)
            setLoading(false)
        })
        CmsPageService.BlogList().then((response) => {
            setBlogList(response.items)
        })

        return () => {
            setBlogDetail({})
            setBlogList([])
        }
    }, [blogId])

    return (
        <section className="pt-8 px-2">
            <MetaInformation
                title={blogDetail.title}
                imageURL={`${API_URL}${get(
                    blogDetail,
                    'content_image.meta.download_url'
                )}`}
                description={
                    blogDetail.rendered_body &&
                    stripTags(blogDetail.rendered_body)
                }
                canonicalLink={window.location.href}
            />
            <div className="container mx-auto news-detail">
                <Breadcrumb item={'blog'} />
                {loading ? (
                    <Loader />
                ) : (
                    <Fragment>
                        <h2 className="md:w-3/4 text-lg md:text-xl leading-tight mb-6 text-primary-dark">
                            {blogDetail.title}
                        </h2>
                        <span className="block italic mb-6 md:mb-10 text-sm text-blue-5">
                            {trans('By')}
                            <span className="ml-1 text-primary-blue">
                                {blogDetail.author}
                            </span>{' '}
                        </span>
                        {get(blogDetail, 'content_image.meta.download_url') && (
                            <div className="img-wrapper mb-6 md:mb-10">
                                <img
                                    src={`${API_URL}${get(
                                        blogDetail,
                                        'content_image.meta.download_url'
                                    )}`}
                                    alt={get(blogDetail, 'content_image.title')}
                                />
                            </div>
                        )}
                        <div className="flex flex-wrap lg:flex-no-wrap justify-between mb-10">
                            <div className="w-full lg:w-2/12 mb-4 news-detail__metadata">
                                <p className="inline-block lg:block font-bold opacity-40 mb-2">
                                    {trans('Published on')}
                                </p>
                                <p className="inline-block lg:block ml-3 lg:ml-0">
                                    {formatDate(blogDetail.news_date)}
                                </p>
                                <div className="mt-8 hidden lg:block">
                                    <TagList item={blogDetail} />
                                </div>
                            </div>
                            <div className="md:px-2 lg:pr-16">
                                <div
                                    className="mb-10 blogs-detail__content"
                                    dangerouslySetInnerHTML={{
                                        __html: blogDetail.rendered_body
                                    }}
                                />
                                <div className="flex flex-col md:flex-row justify-between mb-6 lg:mb-0">
                                    <div className="block lg:hidden mb-6 md:mb-0">
                                        <TagList item={blogDetail} />
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
                        {blogList.length !== 1 ? (
                            <>
                                <hr className="mb-10 text-primary-gray" />
                                <div className="mb-20">
                                    <h2 className="text-xl mb-6">
                                        {trans('Related Blogs')}
                                    </h2>
                                    <div className="grid grid-cols-12 gap-x-0 gap-y-10 sm:gap-10  mb-10">
                                        {blogList &&
                                            blogList
                                                .filter(
                                                    (blogs) =>
                                                        blogs.id !== blogId
                                                )
                                                .slice(0, 3)
                                                .map((blogs) => {
                                                    return (
                                                        <>
                                                            <div
                                                                className="blogs-thumbnail"
                                                                key={blogs.id}>
                                                                <Link
                                                                    to={`/blogs/${blogs.id}`}>
                                                                    <div className="img-wrapper">
                                                                        {get(
                                                                            blogs,
                                                                            'content_image.meta.download_url'
                                                                        ) !=
                                                                        null ? (
                                                                            <img
                                                                                src={`${API_URL}${get(
                                                                                    blogs,
                                                                                    'content_image.meta.download_url'
                                                                                )}`}
                                                                                alt=""
                                                                            />
                                                                        ) : (
                                                                            <img
                                                                                src={
                                                                                    DefaultImage
                                                                                }
                                                                                alt=""
                                                                            />
                                                                        )}
                                                                    </div>
                                                                </Link>
                                                                <div>
                                                                    <Link
                                                                        to={`/blogs/${blogs.id}`}>
                                                                        <h3 className="blogs-caption__title">
                                                                            {
                                                                                blogs.title
                                                                            }
                                                                        </h3>
                                                                    </Link>
                                                                    <p className="blogs-caption__date">
                                                                        {formatDate(
                                                                            blogs.news_date
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                })}
                                    </div>
                                    <div className="flex justify-center items-center mt-12">
                                        <hr className="text-primary-gray flex-1" />
                                        <Link
                                            to="/blogs"
                                            className="text-blue-20 px-4">
                                            {trans('View all blogs')} --&gt;{' '}
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

export default BlogDetail
