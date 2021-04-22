import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { get } from 'lodash'
import CmsPageService from '../../../../services/CmsPageService'
import { Loader } from '../../../../components/Utilities'
import { transformNews } from '../../../../helpers/transformers'
import { t } from '@transifex/native'
import DefaultImage from '../../../../assets/img/default_image.png'

const OtherNewsList = () => {
    const [otherNewsList, setOtherNewsList] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [pagination, setPagination] = useState(() => {
        return { limit: 6, total: 0, offset: 0 }
    })
    const [search] = useState(null)

    useEffect(() => {
        loadNews()

        return () => {
            setOtherNewsList([])
        }
    }, [search])

    function loadMoreNews() {
        setLoadingMore(true)
        loadNews()
    }

    function loadNews() {
        const queryParams = {
            featured: false,
            limit: pagination.limit,
            offset: otherNewsList.length
        }

        if (search) {
            queryParams['search'] = search
        }

        CmsPageService.NewsList(queryParams)
            .then((response) => {
                setOtherNewsList((previous) => {
                    return [
                        ...previous,
                        ...response.items.map((item) => transformNews(item))
                    ]
                })
                setPagination((previous) => {
                    return {
                        ...previous,
                        total: get(response, 'meta.total_count', 0)
                    }
                })
                setLoading(false)
                setLoadingMore(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <section className="px-4 py-24">
            <div className="container mx-auto">
                <div className="flex md: flex-nowrap flex-wrap justify-between pb-10">
                    <p className="text-xl blue-50">{t('Other News')}</p>
                </div>

                {loading ? (
                    <Loader />
                ) : otherNewsList.length ? (
                    <Fragment>
                        <div className="grid grid-cols-12 gap-x-0 gap-y-6 sm:gap-6 mb-10">
                            {otherNewsList.map((news) => (
                                <Link
                                    className="news-thumbnail"
                                    to={news.detailUrl}
                                    key={news.id}>
                                    {news.image != null ? (
                                        <div className="img-wrapper ">
                                            <img
                                                className="h-full w-full object-cover"
                                                src={news.image}
                                                alt={news.title}
                                            />
                                        </div>
                                    ) : (
                                        <div className="img-wrapper ">
                                            <img
                                                className="h-full w-full object-cover"
                                                src={DefaultImage}
                                                alt="No image"
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="news-caption__title hover:text-primary-blue focus:text-primary-blue">
                                            {news.title}
                                        </h3>
                                        <p className="news-caption__date">
                                            {news.formattedPublishDate}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        {otherNewsList.length < pagination.total &&
                            (loadingMore ? (
                                <Loader sm />
                            ) : (
                                <div className="flex justify-center pt-10">
                                    <span
                                        className="text-white bg-primary-blue px-32 py-4 rounded"
                                        onClick={() => {
                                            loadMoreNews()
                                        }}>
                                        {t('Load more')}
                                    </span>
                                </div>
                            ))}
                    </Fragment>
                ) : (
                    <p>{t('No other news found')}</p>
                )}
            </div>
        </section>
    )
}
export default OtherNewsList
