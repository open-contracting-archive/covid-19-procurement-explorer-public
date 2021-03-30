import React, { useEffect, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { get } from 'lodash'
import CmsPageService from '../../../services/CmsPageService'
import { formatDate } from '../../../helpers/date'
import { useQuery } from '../../../helpers/general'
import Breadcrumb from '../../../components/website/Library/Breadcrumb'
import Loader from '../../../components/Loader/Loader'
import { API_URL } from '../../../helpers/api'

const Tags = () => {
    window.scrollTo(0, 0)
    const query = useQuery()
    const tag = query.get('tag')
    const type = query.get('type')
    const [insightList, setInsightList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        CmsPageService.InsightList({ tags: tag, contents_type: type })
            .then((response) => {
                setInsightList(response.items)
                setLoading(false)
            })
            .catch((error) => console.log(error))

        return () => {
            setInsightList([])
        }
    }, [tag, type])

    return (
        <div className="">
            <section className="px-4 py-24 tags -mt-8">
                <div className="container mx-auto">
                    <Breadcrumb item={type && type.toLowerCase()} />

                    <p className="text-2xl mb-10">
                        Tags: <span className="capitalize">{tag}</span>
                    </p>
                    {loading ? (
                        <Loader />
                    ) : (
                        <Fragment>
                            <p className="mb-8">
                                {insightList.length}{' '}
                                <span className="opacity-50">
                                    results found
                                </span>
                            </p>
                            {insightList.length ? (
                                <div className="grid grid-cols-3 gap-x-10 gap-y-10 card">
                                    {insightList.map((insight) => {
                                        return (
                                            <Link
                                                className="card__item"
                                                to={`/${insight.contents_type.toLowerCase()}/${
                                                    insight.id
                                                }`}
                                                key={insight.id}>
                                                {get(
                                                    insight,
                                                    'content_image.meta.download_url'
                                                ) && (
                                                    <div
                                                        className="img-wrapper "
                                                        style={{
                                                            height: '240px'
                                                        }}>
                                                        <img
                                                            className="h-full w-full object-cover"
                                                            src={`${API_URL}${get(
                                                                insight,
                                                                'content_image.meta.download_url'
                                                            )}`}
                                                            alt=""
                                                        />
                                                    </div>
                                                )}
                                                <div className="card__caption  text-blue-50  mt-4">
                                                    <label className="text-sm bg-primary-gray px-3 py-1 rounded-xl">
                                                        {tag}
                                                    </label>
                                                    <h3 className="card__title mt-1 mb-2 text-lg">
                                                        {insight.title}
                                                    </h3>
                                                    <p className="card__date opacity-50 text-sm">
                                                        {formatDate(
                                                            insight.news_date,
                                                            'MMMM DD, YYYY'
                                                        )}
                                                    </p>
                                                </div>
                                            </Link>
                                        )
                                    })}
                                </div>
                            ) : (
                                ''
                            )}
                        </Fragment>
                    )}
                </div>
            </section>
        </div>
    )
}

export default Tags
