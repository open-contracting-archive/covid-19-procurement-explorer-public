import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CmsPageService from '../../../../services/CmsPageService'
import { formatDate } from '../../../../helpers/date'
import Loader from '../../../../components/Loader/Loader'
import useTrans from '../../../../hooks/useTrans'

const LibrarySection = () => {
    const [loading, setLoading] = useState(true)
    const [insightList, setInsightList] = useState([])
    const { trans } = useTrans()

    useEffect(() => {
        CmsPageService.InsightList({
            fields: '_,title,id,slug,contents_type,published_date',
            limit: 6
        }).then((response) => {
            setInsightList(response.items)
            setLoading(false)
        })

        return () => {
            setInsightList([])
        }
    }, [])

    return (
        <section className="py-24 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-20">
                    <h3 className="uppercase text-3xl font-bold leading-none">
                        <span className="block text-base font-bold">
                            {trans('Explore')}
                        </span>
                        {trans('Library')}
                    </h3>
                    <p className="text-base text-opacity-50  text-primary-dark">
                        {trans('Find insights, analysis and best practices')}
                    </p>
                </div>
                {loading ? (
                    <Loader sm />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {insightList.length ? (
                            insightList.map((insightItem) => (
                                <Link
                                    key={insightItem.id}
                                    to={`/news/${insightItem.id}`}>
                                    <div>
                                        <div className="library__tag">
                                            <p className="uppercase">
                                                {insightItem.contents_type}
                                            </p>
                                        </div>
                                        <h4 className="library__heading ">
                                            {insightItem.title}
                                        </h4>
                                        <p className="library__date">
                                            {formatDate(
                                                insightItem.news_date
                                            )}
                                        </p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p>{trans('No records')}</p>
                        )}
                    </div>
                )}
            </div>
        </section>
    )
}
export default LibrarySection
