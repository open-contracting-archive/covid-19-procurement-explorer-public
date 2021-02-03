import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { get } from 'lodash'
import { API_URL } from '../../../helpers/api'
import CmsPageService from '../../../services/CmsPageService'
import Loader from '../../../components/Loader/Loader'
import { formatDate } from "../../../helpers/date"
import Breadcrumb from "../../../components/website/Library/Breadcrumb"

const Blogs = () => {
    const [blogsData, setBlogsData] = useState([])
    const [loading, setLoading] = useState(true)
    window.scrollTo(0, 0)

    useEffect(() => {
        CmsPageService.BlogList().then((response) => {
            setBlogsData(response.items)
            setLoading(false)
        })
    }, [])

    return loading ? (
        <Loader />
    ) : (
        <section className="py-24 px-4 blogs-list -mt-8">
            <div className="container mx-auto">
                <Breadcrumb />

                <p className="text-2xl mb-10">Blogs</p>
                {blogsData &&
                    blogsData.length !== 0 &&
                    blogsData.map((blogs) => {
                        let data =
                            blogs.body &&
                            blogs.body.split('\n')[0].replace('<p>', '')

                        return (
                            <div
                                className="blogs-thumbnail grid md:grid-cols-2 grid-cols-1  gap-x-10 gap-y-6 mb-16"
                                key={blogs.id}>
                                <Link to={`/blogs/${blogs.id}`} key={blogs.id}>
                                    {get(
                                        blogs,
                                        'content_image.meta.download_url'
                                    ) && (
                                        <div className="img-wrapper">
                                            <img
                                                className="h-full w-full object-cover"
                                                src={`${API_URL}${get(
                                                    blogs,
                                                    'content_image.meta.download_url'
                                                )}`}
                                                alt=""
                                            />
                                        </div>
                                    )}
                                </Link>
                                <div className="blog__caption">
                                    <Link
                                        to={`/blogs/${blogs.id}`}
                                        key={blogs.id}>
                                        <h3 className="blog-caption__title text-xl">
                                            {blogs.title}
                                        </h3>
                                    </Link>
                                    <div className="blog-caption__date mt-2 text-sm opacity-50 flex">
                                        <p className="mr-4">
                                            By{' '}
                                            <span className="text-blue-20 italic">
                                                {blogs.author}
                                            </span>
                                        </p>
                                        <p>
                                            {formatDate(blogs.published_date)}
                                        </p>
                                    </div>
                                    {/* <p className="blog-caption__details mt-4"> </p> */}
                                    {blogs.body && (
                                        <div className="blog-caption__details mt-4">
                                            {data || ''}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                {blogsData.length === 0 ? (
                    <p>{trans('There are no Blogs Records')}</p>
                ) : (
                    ''
                )}

                {/* <div className="flex justify-center">
                    <Link
                        to="/blogs"
                        className="text-white bg-primary-blue px-32 py-4 rounded">
                        Load more
                    </Link>
                </div> */}
            </div>
        </section>
    )
}

export default Blogs
