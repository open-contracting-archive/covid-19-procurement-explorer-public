import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { identity, pickBy, get } from 'lodash'
import CmsPageService from '../../services/CmsPageService'
import Loader from '../Loader/Loader'
import useTrans from '../../hooks/useTrans'
import { formatDate } from '../../helpers/date'
import { API_URL } from '../../helpers/api'

const FeaturedInsights = ({ params }) => {
    const [insightList, setInsightList] = useState([])
    const [loading, setLoading] = useState(true)
    const { trans } = useTrans()

    useEffect(() => {
        let queryParameters = {
            ...identity(pickBy(params)),
            featured: true,
            limit: 4
        }
        CmsPageService.InsightList(queryParameters)
            .then((result) => {
                if (result.items) {
                    setInsightList(result.items)
                }
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })

        return () => {
            setInsightList([])
        }
    }, [params?.country])

    return loading ? (
        <Loader />
    ) : insightList.length > 0 && (
        <Fragment>
            <h2 className="font-normal text-lg mb-6">
                {trans('Library')}
            </h2>
            <div className="grid grid-cols-12 md:grid-rows-3 md:gap-x-10 gap-y-6 main-news mb-12">
                {insightList.map((item) => {
                    return (
                        <Link
                            className="main-news__item relative"
                            to={
                                item.type === 'News'
                                    ? `/news/${item.id}`
                                    : `/blogs/${item.id}`
                            }
                            key={item.id}>
                            {get(item, 'content_image.meta.download_url') && (
                                <div className="img-wrapper img-gradient">
                                    <img
                                        src={`${API_URL}${get(
                                            item,
                                            'content_image.meta.download_url'
                                        )}`}
                                        alt=""
                                    />
                                </div>
                            )}
                            <div className="main-news__caption">
                                <h3 className="news-caption__title hover:text-primary-blue focus:text-primary-blue">
                                    {item.title}
                                </h3>
                                <p className="news-caption__date">
                                    {formatDate(item.news_date)}
                                </p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </Fragment>
    )
}

export default FeaturedInsights
