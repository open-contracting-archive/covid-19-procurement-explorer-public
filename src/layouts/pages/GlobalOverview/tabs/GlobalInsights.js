import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { get } from 'lodash'
import CmsPageService from '../../../../services/CmsPageService'
import Loader from '../../../../components/Loader/Loader'
import { formatDate } from "../../../../helpers/date"
import { API_URL } from '../../../../helpers/api'
import InsightTable from "../../../../components/Tables/InsightTable"
import useTrans from "../../../../hooks/useTrans"

const GlobalInsights = () => {
    const [insightsData, setInsightsData] = useState([])
    const [loading, setLoading] = useState(true)
    const { trans } = useTrans()
    let { id: insightsId } = useParams()

    useEffect(() => {
        CmsPageService.InsightList().then((response) => {
            setInsightsData(response.items)
            setLoading(false)
        })
    }, [])

    return (
        <div>
            <h2 className="font-normal text-lg mb-6">
                {trans('Library')}
            </h2>
            {loading ? (<Loader />) : (
                <div className="grid grid-cols-12 grid-rows-3 gap-x-16 gap-y-10 main-news mb-12">
                    {insightsData &&
                    insightsData.slice(0, 4).map((insights) => {
                        return (
                            <Link
                                className="main-news__item relative"
                                to={insights.type === 'News' ? `/news/${insights.id}` : `/blogs/${insights.id}`}
                                key={insights.id}>
                                {get(
                                    insights,
                                    'content_image.meta.download_url'
                                ) && (
                                    <div className="img-wrapper img-gradient">
                                        <img
                                            src={`${API_URL}${get(
                                                insights,
                                                'content_image.meta.download_url'
                                            )}`}
                                            alt=""
                                        />
                                    </div>
                                )}
                                <div className="main-news__caption">
                                    <h3 className="news-caption__title">
                                        {insights.title}
                                    </h3>
                                    <p className="news-caption__date">
                                        {formatDate(insights.published_date)}
                                    </p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            )}

            <h2 className="font-normal text-lg mb-6">
                Best practices and solutions from our database
            </h2>

            <InsightTable />
        </div>
    )
}

export default GlobalInsights
