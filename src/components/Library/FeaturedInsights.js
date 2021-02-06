import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { identity, pickBy, get } from 'lodash'
import CmsPageService from "../../services/CmsPageService"
import Loader from "../Loader/Loader"
import useTrans from "../../hooks/useTrans"
import { formatDate } from "../../helpers/date"
import { API_URL } from "../../helpers/api"

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
                setInsightList(result)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })

        return () => {
            setInsightList([])
        }
    }, [params])

    return loading ? (<Loader />) : (insightList.items.length ? (
            <div className="grid grid-cols-12 grid-rows-3 gap-x-16 gap-y-10 main-news mb-12">
                {insightList.items.map((item) => {
                    return (
                        <Link
                            className="main-news__item relative"
                            to={item.type === 'News' ? `/news/${item.id}` : `/blogs/${item.id}`}
                            key={item.id}>
                            {get(
                                item,
                                'content_image.meta.download_url'
                            ) && (
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
                                <h3 className="news-caption__title">
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
        ) : (
            <div className="mb-20">
                <p>{trans('No featured insights found')}</p>
            </div>
        )
    )
}

export default FeaturedInsights
