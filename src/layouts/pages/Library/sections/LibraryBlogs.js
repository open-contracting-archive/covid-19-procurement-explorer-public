import React, { useEffect, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { get } from 'lodash'
import CmsPageService from '../../../../services/CmsPageService'
import useTrans from '../../../../hooks/useTrans'
import { formatDate } from '../../../../helpers/date'
import Loader from '../../../../components/Loader/Loader'
import { API_URL } from '../../../../helpers/api'

const LibraryBlogs = () => {
    const [blogList, setBlogsData] = useState([])
    const [loading, setLoading] = useState(true)
    const { trans } = useTrans()

    useEffect(() => {
        CmsPageService.BlogList({ limit: 6 })
            .then((response) => {
                setBlogsData(response.items)
                setLoading(false)
            })

        return () => {
            setBlogsData([])
        }
    }, [])

    return (
        <section className="px-4 py-24 blog">
            <div className="container mx-auto">
                <div className="text-center">
                    <p className="text-xl blue-50 pb-10">
                        {trans('Blogs')}
                    </p>
                </div>
                {loading ? (<Loader />) : (blogList.length ? (
                    <Fragment>
                        <div className="grid grid-cols-12 gap-x-0 gap-y-10 sm:gap-10 ">
                            {blogList.map((blog) => {
                                return (
                                    <div
                                        key={blog.id}
                                        className="blogs-thumbnail">
                                        {get(blog, 'content_image.meta.download_url') && (
                                            <Link to={`/blogs/${blog.id}`}>
                                                <div className="img-wrapper">
                                                    <img
                                                        className="h-full object-cover"
                                                        src={`${API_URL}${get(blog, 'content_image.meta.download_url')}`}
                                                        alt="" />
                                                </div>
                                            </Link>
                                        )}
                                        <div>
                                            <Link to={`/blogs/${blog.id}`}>
                                                <h3 className="blogs-caption__title">
                                                    {blog.title}
                                                </h3>
                                            </Link>
                                            <p className="blogs-caption__date">
                                                {formatDate(blog.news_date, 'MMM DD, YYYY')}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex justify-center pt-10">
                            <Link to="/blogs" className="text-blue-20">
                                {trans('View all blogs')} --&gt;{' '}
                            </Link>
                        </div>
                    </Fragment>
                ) : (
                    <p>{trans('There are no blogs')}</p>
                ))}
            </div>
        </section>
    )
}

export default LibraryBlogs
