import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { get } from 'lodash'
import { t } from '@transifex/native'
import { T, useLocale } from '@transifex/react'
import { API_URL } from '../../../helpers/api'
import CmsPageService from '../../../services/CmsPageService'
import { formatDate } from '../../../helpers/date'
import {
    Loader,
    MetaInformation,
    Breadcrumb
} from '../../../components/Utilities'
import DefaultImage from '../../../assets/img/default_image.png'

const Blogs = () => {
    const [blogList, setBlogList] = useState([])
    const [loading, setLoading] = useState(true)
    const [metaInfo, setMetaInfo] = useState({ title: '', description: '' })
    const locale = useLocale()
    window.scrollTo(0, 0)

    useEffect(() => {
        CmsPageService.BlogList().then((response) => {
            setBlogList(response.items)
            setLoading(false)
        })

        return () => {
            setBlogList([])
        }
    }, [])

    useEffect(() => {
        setMetaInfo({
            title: t('Blogs'),
            description: t('Welcome Covid-19 Contract Explorer')
        })
    }, [locale])

    return loading ? (
        <Loader />
    ) : (
        <section className="py-24 px-4 blogs-list -mt-8">
            <MetaInformation
                title={metaInfo.title}
                description={metaInfo.description}
            />

            <div className="container mx-auto">
                <Breadcrumb />

                <p className="text-2xl mb-10">
                    <T _str="Blogs" />
                </p>
                {blogList &&
                    blogList.length !== 0 &&
                    blogList.map((blogs) => {
                        let data =
                            blogs.rendered_body &&
                            blogs.rendered_body
                                .split('\n')[0]
                                .replace(/(<([^>]+)>)/gi, '')

                        return (
                            <div
                                className="blogs-thumbnail grid md:grid-cols-2 grid-cols-1  gap-x-10 gap-y-6 mb-16"
                                key={blogs.id}
                            >
                                <Link to={`/blogs/${blogs.id}`} key={blogs.id}>
                                    {get(
                                        blogs,
                                        'content_image.meta.download_url'
                                    ) != null ? (
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
                                    ) : (
                                        <div className="img-wrapper">
                                            <img
                                                className="h-full w-full object-cover"
                                                src={DefaultImage}
                                                alt="No image"
                                            />
                                        </div>
                                    )}
                                </Link>
                                <div className="blog__caption">
                                    <Link
                                        to={`/blogs/${blogs.id}`}
                                        key={blogs.id}
                                    >
                                        <h3 className="hover:text-primary-blue focus:text-primary-blue blog-caption__title leading-tight text-lg md:text-xl">
                                            {blogs.title}
                                        </h3>
                                    </Link>
                                    <div className="blog-caption__date mt-2 text-sm opacity-50 flex">
                                        <p className="mr-4">
                                            <T _str="By" />{' '}
                                            <span className="text-blue-20 italic">
                                                {blogs.author}
                                            </span>
                                        </p>
                                        <p>{formatDate(blogs.news_date)}</p>
                                    </div>
                                    {/* <p className="blog-caption__details mt-4"> </p> */}
                                    {blogs.rendered_body && (
                                        <div className="blog-caption__details mt-4">
                                            {data || ''}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                {blogList.length === 0 ? (
                    <p>
                        <T _str="There are no Blogs Records" />
                    </p>
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
